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
  const isSpecial = !!service.special;

  return (
    <Reveal
      delay={delay}
      className={`group relative flex flex-col border p-8 transition-all duration-300 hover:-translate-y-1 ${
        isSpecial
          ? "border-dashed border-gold/50 bg-gold/[0.04] hover:border-gold"
          : service.featured
            ? "border-gold/60 bg-ink-soft"
            : "border-ink-line bg-ink-soft hover:border-gold/40"
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
          Most Popular
        </span>
      )}
      {isSpecial && (
        <span className="absolute -top-3 left-8 border border-gold bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
          Special · Add-on
        </span>
      )}

      <h3 className="text-xl font-bold text-ivory">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory-dim">
        {service.short}
      </p>

      <p className="mt-6 text-sm text-ivory-dim">
        {isSpecial ? "add" : "from"}{" "}
        <span className="text-3xl font-bold text-gold">
          {isSpecial ? "+" : ""}${service.fromPrice}
        </span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-ivory-dim/60">
        {service.duration}
        {isSpecial && " · with any package"}
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href={bookHref(service.slug)}
          className={`flex-1 !px-4 !py-3 !text-xs ${isSpecial ? "btn-outline" : "btn-gold"}`}
        >
          {isSpecial ? "Add it" : "Book"}
        </Link>
        <Link
          href={`/services#${service.slug}`}
          className={`flex-1 !px-4 !py-3 !text-xs ${isSpecial ? "btn-gold" : "btn-outline"}`}
        >
          Details
        </Link>
      </div>
    </Reveal>
  );
}
