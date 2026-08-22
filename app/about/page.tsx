import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Our Detailing Studio",
  description:
    "Aulon Detailing is a Melrose Park, IL detailing studio serving Maywood, Franklin Park, Elmwood Park, Oak Park, River Grove and the surrounding areas. One car at a time, done properly.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                as="h1"
                align="left"
                kicker="About Aulon"
                title="Built on one belief: details matter."
              />
              {/* TODO(owner): personalize this story — names, year started, what got you into detailing */}
              <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory-dim">
                <p>
                  Aulon Detailing started in Melrose Park with a simple frustration:
                  around here, a &ldquo;detail&rdquo; too often means a quick vacuum
                  and a spray of dressing. We knew cars deserved better, and so did
                  their owners.
                </p>
                <p>
                  So we built the studio we wanted to take our own cars to. Premium
                  products, dedicated tools for every surface, and a hard rule:{" "}
                  <strong className="text-ivory">one car at a time</strong>. No
                  production line, no shortcuts, no &ldquo;good enough.&rdquo;
                </p>
                <p>
                  Every appointment ends the same way: with us walking the car,
                  panel by panel, before you see it. If it&apos;s not a finish
                  we&apos;d proudly drive away with, it&apos;s not done.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="flex items-center justify-center border border-ink-line bg-ink-soft p-14">
              <Image
                src="/logo/aulon.svg"
                alt="Aulon Detailing"
                width={420}
                height={136}
                className="h-auto w-full max-w-sm"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Service area ─────────────────────────────────────── */}
      <section aria-label="Service area" className="border-y border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Service Area"
            title="We come to you"
            sub={`Mobile detailing across the surrounding areas, or drop your car with us in ${site.city}.`}
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <ul className="flex flex-wrap justify-center gap-3">
              {site.serviceArea.map((town) => (
                <li
                  key={town}
                  className="border border-ink-line bg-ink px-5 py-2.5 text-sm text-ivory transition-colors hover:border-gold/50"
                >
                  {town}, IL
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-sm text-ivory-dim">
              Outside the list? <a href={`mailto:${site.email}`} className="font-semibold text-gold hover:text-gold-light">Ask us</a>. We
              regularly travel further for full details and coatings.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
