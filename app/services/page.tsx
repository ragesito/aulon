import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { services, vehicleTypes, bookHref } from "@/content/services";
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            as="h1"
            kicker="Services & Pricing"
            title="Pick your finish"
            sub="Every package includes premium products and our no-shortcuts standard. Prices vary by vehicle size. Final quote confirmed at booking."
          />

          {/* TODO(owner): all prices are placeholders — confirm in content/services.ts */}
          <div className="mt-16 space-y-16">
            {services.map((s, idx) => (
              <Reveal
                as="article"
                key={s.slug}
                className="scroll-mt-28 border border-ink-line bg-ink-soft"
              >
                <div id={s.slug} className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold text-gold/60">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl font-bold text-ivory sm:text-3xl">{s.name}</h2>
                      {s.featured && (
                        <span className="bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-4 leading-relaxed text-ivory-dim">{s.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-widest text-ivory-dim/60">
                      Duration: {s.duration}
                    </p>

                    <h3 className="kicker mt-8">What&apos;s included</h3>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {s.included.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ivory">
                          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-gold" aria-hidden="true">
                            <path d="M7.6 13.2L4.4 10l-1.3 1.3 4.5 4.5 9.3-9.3-1.3-1.3z" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between border-t border-ink-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <div>
                      <h3 className="kicker">Pricing by vehicle</h3>
                      <dl className="mt-4 space-y-3">
                        {vehicleTypes.map((v) => (
                          <div
                            key={v.value}
                            className="flex items-baseline justify-between border-b border-ink-line pb-2.5"
                          >
                            <dt className="text-sm text-ivory-dim">{v.label}</dt>
                            <dd className="text-lg font-bold text-gold">
                              ${s.pricing[v.value]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-3 text-xs text-ivory-dim/60">
                        Final quote confirmed at booking.
                      </p>
                      {s.note && (
                        <p className="mt-2 text-xs text-ivory-dim/60">{s.note}</p>
                      )}
                    </div>
                    <Link href={bookHref(s.slug)} className="btn-gold mt-8 w-full">
                      Book {s.name}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
