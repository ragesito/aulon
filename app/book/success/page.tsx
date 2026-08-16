import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Booking Received",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { sid?: string };
}) {
  // Look up the booking by Stripe session (display only; the webhook is
  // the source of truth for payment status)
  const booking = searchParams.sid
    ? await prisma.booking.findUnique({
        where: { stripeSessionId: searchParams.sid },
      })
    : null;

  const paid = booking?.paymentStatus === "paid";

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <svg viewBox="0 0 24 24" className="mx-auto h-16 w-16 fill-none stroke-gold" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-ivory sm:text-4xl">
          {paid ? "Deposit received. You're booked!" : "Payment received. Finalizing…"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ivory-dim">
          {booking ? (
            <>
              {booking.serviceName} on {booking.date} at {booking.timeSlot}.
              We&apos;ll confirm your appointment shortly by phone or email.
            </>
          ) : (
            <>We&apos;ll confirm your appointment shortly by phone or email.</>
          )}{" "}
          A receipt from Stripe is on its way to your inbox.
        </p>
        {booking && (
          <p className="mx-auto mt-3 max-w-md text-sm text-ivory-dim/70">
            Your ${booking.depositUsd} deposit is applied to your total. Balance
            of ${Math.max(0, booking.priceQuoted - booking.depositUsd)} is due
            after the service.
          </p>
        )}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
          <a href={site.phoneHref} className="btn-gold">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
