import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/content/testimonials";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${i < count ? "fill-gold" : "fill-ink-line"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.8l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section aria-label="Customer reviews" className="bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Reviews"
          title="What drivers are saying"
          sub="Real results from real cars across the West suburbs."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 120} className="flex flex-col border border-ink-line bg-ink-soft p-8">
              <Stars count={t.stars} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ivory">
                “{t.text}”
              </blockquote>
              <footer className="mt-6 border-t border-ink-line pt-4">
                <p className="text-sm font-semibold text-gold">{t.name}</p>
                <p className="mt-0.5 text-xs text-ivory-dim">
                  {t.location} · {t.service}
                </p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
