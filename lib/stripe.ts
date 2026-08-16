import Stripe from "stripe";
import { site } from "@/content/site";

/**
 * Stripe integration for the booking deposit.
 * If STRIPE_SECRET_KEY is not configured, payments are disabled and bookings
 * fall back to the no-payment flow (deposit marked "waived"). This keeps
 * local dev and previews working without a Stripe account.
 */

export function paymentsEnabled(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      // SDK-pinned API version; fetch client works in Node and on Cloudflare Workers
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return _stripe;
}

export interface DepositSessionInput {
  bookingId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  customerEmail: string;
}

/** Create a Stripe Checkout session for the booking deposit.
 *  The amount is fixed server-side; the client can never alter it. */
export async function createDepositSession(
  input: DepositSessionInput
): Promise<{ id: string; url: string }> {
  const stripe = getStripe();
  const deposit = site.booking.depositUsd;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: input.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: deposit * 100,
          product_data: {
            name: `Booking deposit: ${input.serviceName}`,
            description: `${input.date} at ${input.timeSlot}. Applied to your final price. Non-refundable on cancellation.`,
          },
        },
      },
    ],
    metadata: { bookingId: input.bookingId },
    success_url: `${site.url}/book/success?sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site.url}/book?canceled=1`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min to pay
  });

  if (!session.url) throw new Error("Stripe session has no URL");
  return { id: session.id, url: session.url };
}
