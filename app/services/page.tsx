import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import ServicesView from "@/components/ServicesView";
import { specialServices, addOnHref } from "@/content/services";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "Detailing Services & Pricing in Melrose Park, IL",
  description:
    "Car detailing packages in Melrose Park, IL: signature exterior details, interior detailing, full details, odor treatment and wash, clay & seal. Transparent pricing for sedans, SUVs and trucks in the Chicago suburbs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <SectionHeading
            as="h1"
            kicker="Services & Pricing"
            title="Pick your finish"
            sub="Every package includes premium products and our no-shortcuts standard. Prices vary by vehicle size. Final quote confirmed at booking."
          />

          <ServicesView />
        </div>
      </section>

      {/* ── Special services ─────────────────────────────────── */}
      <section aria-label="Special services" className="border-t border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Special Services"
            title="Add-ons that fix the hard stuff"
            sub="Add them to any package above. Trim Restoration can also be booked on its own."
          />
          <Reveal className="mt-14">
            <div className="grid divide-y divide-ink-line border border-gold/30 bg-ink md:grid-cols-2 md:divide-x md:divide-y-0">
              {specialServices().map((s) => (
                <div key={s.slug} id={s.slug} className="scroll-mt-28 flex flex-col p-8 sm:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-bold text-ivory sm:text-2xl">{s.name}</h3>
                    <span className="whitespace-nowrap text-2xl font-bold text-gold">
                      +${s.fromPrice}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                    {s.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-ivory-dim/60">
                    Duration: {s.duration}
                  </p>

                  <h4 className="kicker mt-6">What&apos;s included</h4>
                  <ul className="mt-3 flex-1 space-y-2">
                    {s.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ivory">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-gold" aria-hidden="true">
                          <path d="M7.6 13.2L4.4 10l-1.3 1.3 4.5 4.5 9.3-9.3-1.3-1.3z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {s.note && (
                    <p className="mt-4 text-xs text-ivory-dim/60">{s.note}</p>
                  )}
                  <Link href={addOnHref(s)} className="btn-outline mt-6 w-full">
                    Add {s.name}
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section aria-label="Frequently asked questions" className="border-t border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="FAQ"
            title="Good questions, straight answers"
          />
          <div className="mt-12 space-y-4">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="group border border-ink-line bg-ink p-6 open:border-gold/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ivory [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-gold transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-dim">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
