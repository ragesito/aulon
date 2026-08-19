"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  regularServices,
  vehicleTypes,
  bookHref,
  type ServicePackage,
} from "@/content/services";

type View = "grid" | "list";
const STORAGE_KEY = "aulon-services-view";

/** Compact card: everything you need to compare packages at a glance. */
function GridCard({
  s,
  onDetails,
  delay,
}: {
  s: ServicePackage;
  onDetails: () => void;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`relative flex flex-col border bg-ink-soft p-8 transition-all duration-300 hover:-translate-y-1 ${
        s.featured ? "border-gold/60" : "border-ink-line hover:border-gold/40"
      }`}
    >
      {s.featured && (
        <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-ivory">{s.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{s.short}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-ivory-dim/60">
        {s.duration}
      </p>

      <dl className="mt-6 space-y-1.5 border-t border-ink-line pt-4 text-sm">
        {vehicleTypes.map((v) => (
          <div key={v.value} className="flex justify-between">
            <dt className="text-ivory-dim">{v.label}</dt>
            <dd className="font-semibold text-gold">${s.pricing[v.value]}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-1 items-end gap-3">
        <Link href={bookHref(s.slug)} className="btn-gold flex-1 !px-4 !py-3 !text-xs">
          Book
        </Link>
        <button
          type="button"
          onClick={onDetails}
          className="btn-outline flex-1 !px-4 !py-3 !text-xs"
        >
          Details
        </button>
      </div>
    </Reveal>
  );
}

/** Full detail row: inclusions + pricing table. */
function ListRow({ s, idx }: { s: ServicePackage; idx: number }) {
  return (
    <Reveal as="article" className="scroll-mt-28 border border-ink-line bg-ink-soft">
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
                  <dd className="text-lg font-bold text-gold">${s.pricing[v.value]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ivory-dim/60">
              Final quote confirmed at booking.
            </p>
            {s.note && <p className="mt-2 text-xs text-ivory-dim/60">{s.note}</p>}
          </div>
          <Link href={bookHref(s.slug)} className="btn-gold mt-8 w-full">
            Book {s.name}
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesView() {
  const list = regularServices();
  const [view, setView] = useState<View>("grid");

  // Remember the visitor's preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  function choose(next: View) {
    setView(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /** Jump from a grid card straight to that package's full detail */
  function openDetails(slug: string) {
    choose("list");
    requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="mt-12">
      {/* View switcher */}
      <div className="flex items-center justify-end gap-2">
        <span className="mr-1 text-xs uppercase tracking-widest text-ivory-dim/60">
          View
        </span>
        {(
          [
            {
              key: "grid" as const,
              label: "Grid",
              icon: (
                <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
              ),
            },
            {
              key: "list" as const,
              label: "List",
              icon: <path d="M4 5h16v3H4zM4 10.5h16v3H4zM4 16h16v3H4z" />,
            },
          ]
        ).map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => choose(opt.key)}
            aria-pressed={view === opt.key}
            title={`${opt.label} view`}
            className={`flex items-center gap-2 border px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              view === opt.key
                ? "border-gold bg-gold text-ink"
                : "border-ink-line text-ivory-dim hover:border-gold/50 hover:text-gold"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              {opt.icon}
            </svg>
            {opt.label}
          </button>
        ))}
      </div>

      {view === "grid" ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {list.map((s, i) => (
            <GridCard
              key={s.slug}
              s={s}
              delay={i * 80}
              onDetails={() => openDetails(s.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-16">
          {list.map((s, i) => (
            <ListRow key={s.slug} s={s} idx={i} />
          ))}
        </div>
      )}
    </div>
  );
}
