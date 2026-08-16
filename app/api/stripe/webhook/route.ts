import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe, paymentsEnabled } from "@/lib/stripe";
import { vehicleTypes } from "@/content/services";
import {
  sendOwnerBookingNotification,
  sendCustomerConfirmation,
} from "@/lib/email";

/**
 * Stripe webhook: the only trusted source of "the deposit was paid".
 * The signature is verified against STRIPE_WEBHOOK_SECRET, so nobody can
 * forge a paid status by POSTing here.
 */
export async function POST(req: NextRequest) {
  if (!paymentsEnabled() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return NextResponse.json({ received: true });

    // Idempotent: only transition unpaid → paid once
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.paymentStatus === "paid") {
      return NextResponse.json({ received: true });
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: "paid" },
    });

    const vehicleLabel =
      vehicleTypes.find((v) => v.value === booking.vehicleType)?.label ??
      booking.vehicleType;

    // Emails fire only after the deposit is confirmed
    await Promise.allSettled([
      sendOwnerBookingNotification({
        serviceName: booking.serviceName,
        vehicleType: vehicleLabel,
        date: booking.date,
        timeSlot: booking.timeSlot,
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        address: booking.address ?? undefined,
        isMobile: booking.isMobile,
        notes: booking.notes ?? undefined,
        priceQuoted: booking.priceQuoted,
        depositPaid: true,
        depositUsd: booking.depositUsd,
      }),
      sendCustomerConfirmation({
        serviceName: booking.serviceName,
        vehicleType: vehicleLabel,
        date: booking.date,
        timeSlot: booking.timeSlot,
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        address: booking.address ?? undefined,
        isMobile: booking.isMobile,
        notes: booking.notes ?? undefined,
        priceQuoted: booking.priceQuoted,
        depositPaid: true,
        depositUsd: booking.depositUsd,
      }),
    ]);
  }

  return NextResponse.json({ received: true });
}
