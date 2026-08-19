import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Booking Terms",
  description:
    "Booking and deposit terms for Aulon Detailing in Melrose Park, IL: how the deposit works, cancellations, rescheduling and payment.",
  alternates: { canonical: "/terms" },
};

/* TODO(owner): review these terms and adjust to how you actually want to
   operate (especially rescheduling notice and weather policy). */

const terms = [
  {
    title: "Deposit",
    body: `A $${site.booking.depositUsd} deposit is required to reserve your appointment. It is not an extra charge: the full deposit is applied to the final price of your service.`,
  },
  {
    title: "Cancellations",
    body: `The deposit is non-refundable if you cancel your appointment. This keeps our schedule fair for everyone: a reserved slot turns away other customers.`,
  },
  {
    title: "Rescheduling",
    body: `Need a different day? No problem. You can reschedule once at no cost with at least 24 hours notice, and your deposit moves with your appointment.`,
  },
  {
    title: "Weather",
    body: `If weather makes an exterior service impossible, we will contact you to reschedule. Your deposit is never lost to weather.`,
  },
  {
    title: "Payment",
    body: `The remaining balance is due after the service is completed and you have inspected the result. We accept cash and all major cards. Final pricing may adjust for vehicle size and condition, and any adjustment is agreed with you before we start.`,
  },
  {
    title: "Your data",
    body: `We only use your contact details to manage your appointment. Card payments are processed by Stripe; your card number never touches our systems.`,
  },
];

export default function TermsPage() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <SectionHeading
          as="h1"
          kicker="The Fine Print, Unfined"
          title="Booking terms"
          sub="Short, honest and in plain English. This is how booking with us works."
        />
        <div className="mt-12 space-y-8">
          {terms.map((t) => (
            <div key={t.title} className="border-l-2 border-gold/60 pl-6">
              <h2 className="font-bold text-ivory">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-ivory-dim">
          Questions about any of this?{" "}
          <Link href="/contact" className="font-semibold text-gold hover:text-gold-light">
            Ask us
          </Link>{" "}
          before you book. We&apos;d rather explain than surprise.
        </p>
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Booking Terms", path: "/terms" },
        ])}
      />
    </section>
  );
}
