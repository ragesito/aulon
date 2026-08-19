import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "Detailing & Odor Removal FAQ",
  description:
    "How do you remove smoke smell from a car? How long does a full detail take? Do you offer mobile detailing near Melrose Park? Straight answers from Aulon Detailing.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <SectionHeading
            as="h1"
            kicker="FAQ"
            title="Everything you're wondering"
            sub="The questions we get most from drivers around Melrose Park and the surrounding areas."
          />
          <div className="mt-12 space-y-4">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="group border border-ink-line bg-ink-soft p-6 open:border-gold/40">
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
          { name: "FAQ", path: "/faq" },
        ])}
      />
    </>
  );
}
