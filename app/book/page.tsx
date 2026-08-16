import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book Your Detail Online",
  description:
    "Book car detailing in Melrose Park, IL online. Choose your package, vehicle and time slot. Mobile detailing available across the Chicago West suburbs. No payment required to book.",
  alternates: { canonical: "/book" },
};

export default function BookPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="kicker">Booking</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ivory sm:text-4xl">
            Reserve your appointment
          </h1>
          <p className="mt-4 text-ivory-dim">
            Four quick steps. No payment now: we confirm every slot personally.
          </p>
          <div className="gold-line mx-auto mt-8 max-w-[200px]" />
        </div>

        <div className="mt-12">
          <BookingForm initialService={searchParams.service} />
        </div>

        <p className="mt-10 text-center text-sm text-ivory-dim">
          Prefer to book by phone?{" "}
          <a href={site.phoneHref} className="font-semibold text-gold hover:text-gold-light">
            {site.phone}
          </a>
        </p>
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ])}
      />
    </section>
  );
}
