import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export default function CtaBand() {
  return (
    <section aria-label="Book an appointment" className="border-y border-gold/20 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker">By Appointment Only</p>
          <p className="mt-4 text-3xl font-bold leading-tight text-ivory sm:text-4xl">
            Ready for that <span className="text-gold-sheen">showroom finish</span>?
          </p>
          <p className="mt-4 text-ivory-dim">
            Slots fill fast. Lock in your appointment today. We come to you across
            the surrounding areas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/book" className="btn-gold w-full sm:w-auto">
              Book Now
            </Link>
            <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
              Call {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
