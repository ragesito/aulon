import Link from "next/link";
import Reveal from "@/components/Reveal";
import { bookHref, type ServicePackage } from "@/content/services";

export default function ServiceCard({
  service,
  delay = 0,
}: {
  service: ServicePackage;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`group relative flex flex-col border bg-ink-soft p-8 transition-all duration-300 hover:-translate-y-1 ${
        service.featured
          ? "border-gold/60"
          : "border-ink-line hover:border-gold/40"
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-ivory">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory-dim">{service.short}</p>
      <p className="mt-6 text-sm text-ivory-dim">
        from{" "}
        <span className="text-3xl font-bold text-gold">${service.fromPrice}</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-ivory-dim/60">
        {service.duration}
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href={bookHref(service.slug)}
          className="btn-gold flex-1 !px-4 !py-3 !text-xs"
        >
          Book
        </Link>
        <Link
          href={`/services#${service.slug}`}
          className="btn-outline flex-1 !px-4 !py-3 !text-xs"
        >
          Details
        </Link>
      </div>
    </Reveal>
  );
}
