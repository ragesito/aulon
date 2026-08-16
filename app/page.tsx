import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import GalleryGrid from "@/components/GalleryGrid";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Premium Car Detailing in Melrose Park, IL",
  description:
    "Your car, showroom new. Premium auto detailing in Melrose Park, IL: interior & exterior details, odor treatment and mobile detailing across the Chicago West suburbs. Book online.",
  alternates: { canonical: "/" },
};

const trust = [
  {
    title: "Mobile Service",
    text: "We come to your driveway across Melrose Park and the West suburbs, water and power included.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 stroke-gold" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h8.2a2 2 0 0 1 1.9 1.5L18 13m-15 0h18v4a1 1 0 0 1-1 1h-1a2 2 0 1 1-4 0H8a2 2 0 1 1-4 0H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fully Insured",
    text: "Your vehicle is covered from the moment we touch it. Professional, careful, accountable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 stroke-gold" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Premium Products",
    text: "pH-neutral soaps, professional-grade coatings and dedicated tools for every surface.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 stroke-gold" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l2.4 6.2L21 9l-5 4.4L17.5 20 12 16.5 6.5 20 8 13.4 3 9l6.6-.8L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "By Appointment",
    text: "One car at a time. Your appointment gets our full attention, never rushed.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 stroke-gold" fill="none" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section aria-label="Hero" className="relative overflow-hidden bg-ink">
        {/* Background video with static overlays */}
        <HeroVideo />

        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-start px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:min-h-[92vh] lg:justify-center lg:px-8 lg:py-28">
          {/* Hero entrance animates with pure CSS (no JS wait, no blank flash) */}
          <div className="max-w-4xl text-center lg:text-left">
            {/* Kicker */}
            <p className="flex animate-rise items-center justify-center gap-4 lg:justify-start">
              <span className="hidden h-px w-12 bg-gold sm:block" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest2 text-gold">
                Premium Auto Detailing · Melrose Park, IL
              </span>
            </p>

            {/* Headline */}
            <h1
              className="text-fat mt-6 animate-rise font-display text-[13vw] uppercase leading-[1.02] tracking-tight text-ivory sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "120ms" }}
            >
              Your car,
              <span className="text-outline block italic">
                showroom
                <svg
                  viewBox="0 0 24 24"
                  className="mb-2 ml-3 hidden h-[0.45em] w-[0.45em] fill-gold sm:inline-block"
                  aria-hidden="true"
                >
                  <path d="M12 1l2.4 7.2L22 10l-7.6 1.8L12 19l-2.4-7.2L2 10l7.6-1.8L12 1z" />
                </svg>
              </span>
              <span className="text-gold-sheen text-fat-gold block">new.</span>
            </h1>

            {/* Value line */}
            <p
              className="mx-auto mt-7 max-w-xl animate-rise text-base leading-relaxed text-ivory/90 sm:text-lg lg:mx-0"
              style={{ animationDelay: "240ms" }}
            >
              Hand-finished details, odor treatment and lasting paint protection.
              At our studio or <span className="font-semibold text-ivory">right in your driveway</span>.
              By appointment only.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex animate-rise flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "360ms" }}
            >
              <Link href="/book" className="btn-gold group w-full sm:w-auto">
                Book Your Detail
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/services" className="btn-outline w-full sm:w-auto">
                Services &amp; Pricing
              </Link>
            </div>

            {/* Trust markers */}
            <ul
              className="mt-12 flex animate-rise flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 lg:justify-start"
              style={{ animationDelay: "480ms" }}
            >
              {["Fully insured", "We come to you", "Premium products only"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-ivory-dim"
                  >
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-gold" aria-hidden="true">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.8l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 animate-scroll-cue stroke-gold"
            fill="none"
            strokeWidth="1.5"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="gold-line" />
      </section>

      {/* ── Services overview ────────────────────────────────── */}
      <section aria-label="Services" className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Services"
            title="Detailing, done properly"
            sub="Five packages. Zero shortcuts. Every appointment finished to the same standard: ours."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={i * 100} />
            ))}
            <Reveal
              delay={services.length * 100}
              className="flex flex-col items-center justify-center border border-dashed border-gold/30 p-8 text-center"
            >
              <p className="text-lg font-bold text-ivory">Not sure what your car needs?</p>
              <p className="mt-2 text-sm text-ivory-dim">
                Send us a photo and we&apos;ll recommend the right package.
              </p>
              <Link href="/contact" className="btn-outline mt-6 !px-6 !py-3 !text-xs">
                Ask Us
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Before / After gallery preview ───────────────────── */}
      <section aria-label="Recent work" className="border-y border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Before / After"
            title="The work speaks"
            sub="Real transformations from recent appointments. Full gallery updated weekly."
          />
          <Reveal className="mt-14">
            <GalleryGrid showFilters={false} limit={6} />
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Link href="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Why Aulon ────────────────────────────────────────── */}
      <section aria-label="Why choose Aulon" className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Why Aulon"
            title="Small operation. Obsessive standards."
            sub="We're not a car wash. We're detailers, and the difference shows in every panel."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 100} className="border border-ink-line bg-ink-soft p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                {t.icon}
                <h3 className="mt-5 font-bold text-ivory">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{t.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <Testimonials />

      {/* ── Final CTA ────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}
