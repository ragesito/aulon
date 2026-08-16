"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { bookingSchema, filledTooFast } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getService, vehicleTypes, type VehicleType } from "@/content/services";
import {
  sendOwnerBookingNotification,
  sendCustomerConfirmation,
} from "@/lib/email";

export interface BookingResult {
  ok: boolean;
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

  // ── Idempotency: same email + date + service = same booking ─────────
  const existing = await prisma.booking.findFirst({
    where: {
      email: data.email,
      date: data.date,
      serviceSlug: data.serviceSlug,
      status: { not: "cancelled" },
    },
  });
  if (existing) {
    // Already booked — treat as success (double-submit protection)
    return { ok: true };
  }

  const priceQuoted = service.pricing[vehicle];

  try {
    await prisma.booking.create({
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
        isMobile: data.isMobile,
        address: data.isMobile ? data.address || null : null,
        notes: data.notes || null,
        status: "pending",
      },
    });
  } catch (err) {
    console.error("[booking] db error:", err);
    return { ok: false, error: "Something went wrong saving your booking. Please call us instead." };
  }

  // Emails are best-effort — booking is already saved
  const emailData = {
    serviceName: service.name,
    vehicleType: vehicleLabel,
    date: data.date,
    timeSlot: data.timeSlot,
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address || undefined,
    isMobile: data.isMobile,
    notes: data.notes || undefined,
    priceQuoted,
  };
  await Promise.allSettled([
    sendOwnerBookingNotification(emailData),
    sendCustomerConfirmation(emailData),
  ]);

  return { ok: true };
}
