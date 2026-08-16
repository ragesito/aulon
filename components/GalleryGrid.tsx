"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/content/gallery";

/** Branded placeholder tile shown until real photos are added in content/gallery.ts */
function PlaceholderTile({ item }: { item: GalleryItem }) {
  return (
    <div
      role="img"
      aria-label={item.alt}
      className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden border border-ink-line bg-ink-soft transition-all duration-300 group-hover:border-gold/40"
    >
      <svg viewBox="0 0 48 24" className="h-8 w-16 fill-none stroke-gold/60" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 18 C8 10, 14 7, 24 7 C34 7, 40 10, 44 18" />
        <circle cx="14" cy="18" r="3" />
        <circle cx="34" cy="18" r="3" />
      </svg>
      <span className="px-4 text-center text-xs uppercase tracking-widest text-ivory-dim">
        {item.label}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-gold/50">
        Photo coming soon
      </span>
    </div>
  );
}

export default function GalleryGrid({
  showFilters = true,
  limit,
}: {
  showFilters?: boolean;
  limit?: number;
}) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = gallery
    .filter((g) => filter === "all" || g.category === filter)
    .slice(0, limit ?? gallery.length);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close]);

  return (
    <div>
      {showFilters && (
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className="flex flex-wrap justify-center gap-2"
        >
          {galleryCategories.map((c) => (
            <button
              key={c.value}
              role="tab"
              aria-selected={filter === c.value}
              onClick={() => setFilter(c.value)}
              className={`border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                filter === c.value
                  ? "border-gold bg-gold text-ink"
                  : "border-ink-line text-ivory-dim hover:border-gold/50 hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-10" : ""}`}>
        {items.map((item) => (
          <li key={item.id} className="group">
            {item.src ? (
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                aria-label={`Open larger view: ${item.label}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink-line">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-2 block text-left text-xs uppercase tracking-widest text-ivory-dim">
                  {item.label}
                </span>
              </button>
            ) : (
              <PlaceholderTile item={item} />
            )}
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {lightbox?.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 animate-fade-in"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-ink-line text-ivory hover:border-gold hover:text-gold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ivory-dim">
              {lightbox.label}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
