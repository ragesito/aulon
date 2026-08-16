"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { bookingSchema, filledTooFast } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getService, vehicleTypes, type VehicleType } from "@/content/services";
import { paymentsEnabled, createDepositSession } from "@/lib/stripe";
import {
  sendOwnerBookingNotification,
  sendCustomerConfirmation,
  type BookingEmailData,
} from "@/lib/email";

export interface BookingResult {
  ok: boolean;
  /** When set, the client must redirect here to pay the deposit */
  redirectUrl?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function createBooking(
  _prev: BookingResult | null,
  formData: FormData
): Promise<BookingResult> {
  // ── Rate limit ──────────────────────────────────────────────────────
  const ip = clientIp(headers());
  const rl = rateLimit(`booking:${ip}`);
  if (!rl.ok) {
    return {
      ok: false,
      error: `Too many requests. Please try again in ${rl.retryAfterSec}s.`,
    };
  }

  // ── Validate ────────────────────────────────────────────────────────
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please review the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // ── Anti-spam: honeypot handled by schema; check minimum fill time ──
  if (filledTooFast(data.startedAt)) {
    // Pretend success so bots learn nothing
    return { ok: true };
  }

  const service = getService(data.serviceSlug);
  if (!service) return { ok: false, error: "Unknown service selected." };
  const vehicle = data.vehicleType as VehicleType;
  const vehicleLabel =
    vehicleTypes.find((v) => v.value === vehicle)?.label ?? vehicle;
  const priceQuoted = service.pricing[vehicle];

  // ── Idempotency: same email + date + service = same booking ─────────
  const existing = await prisma.booking.findFirst({
    where: {
      email: data.email,
      date: data.date,
      serviceSlug: data.serviceSlug,
      status: { not: "cancelled" },
    },
  });

  if (existing && existing.paymentStatus !== "unpaid") {
    // Already booked and settled: double-submit protection
    return { ok: true };
  }

  let bookingId: string;
  try {
    if (existing) {
      // Unpaid retry: reuse the row, refresh the details
      const updated = await prisma.booking.update({
        where: { id: existing.id },
        data: {
          vehicleType: vehicle,
          priceQuoted,
          timeSlot: data.timeSlot,
          name: data.name,
          phone: data.phone,
          address: data.address,
          notes: data.notes || null,
        },
      });
      bookingId = updated.id;
    } else {
      const created = await prisma.booking.create({
        data: {
          serviceSlug: service.slug,
          serviceName: service.name,
          vehicleType: vehicle,
          priceQuoted,
          date: data.date,
          timeSlot: data.timeSlot,
          name: data.name,
          phone: data.phone,
          email: data.email,
          isMobile: true, // all appointments are at the customer's address
          address: data.address,
          notes: data.notes || null,
          status: "pending",
          paymentStatus: paymentsEnabled() ? "unpaid" : "waived",
        },
      });
      bookingId = created.id;
    }
  } catch (err) {
    console.error("[booking] db error:", err);
    return { ok: false, error: "Something went wrong saving your booking. Please call us instead." };
  }

  const emailData: BookingEmailData = {
    serviceName: service.name,
    vehicleType: vehicleLabel,
    date: data.date,
    timeSlot: data.timeSlot,
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    isMobile: true,
    notes: data.notes || undefined,
    priceQuoted,
    depositPaid: false,
  };

  // ── Payments ON: redirect to Stripe Checkout for the $10 deposit ────
  // Emails are sent by the webhook once the deposit is actually paid.
  if (paymentsEnabled()) {
    try {
      const session = await createDepositSession({
        bookingId,
        serviceName: service.name,
        date: data.date,
        timeSlot: data.timeSlot,
        customerEmail: data.email,
      });
      await prisma.booking.update({
        where: { id: bookingId },
        data: { stripeSessionId: session.id },
      });
      return { ok: true, redirectUrl: session.url };
    } catch (err) {
      console.error("[booking] stripe error:", err);
      return {
        ok: false,
        error: "We could not start the payment. Please try again or call us.",
      };
    }
  }

  // ── Payments OFF (no Stripe key configured): book directly ──────────
  await Promise.allSettled([
    sendOwnerBookingNotification(emailData),
    sendCustomerConfirmation(emailData),
  ]);

  return { ok: true };
}
