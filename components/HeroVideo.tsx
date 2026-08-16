"use client";

import { useEffect, useState } from "react";

/**
 * Hero background video (/public/media/hero.mp4).
 * - Desktop: full-bleed 16:9.
 * - Mobile: the same file center-cropped to the tall hero (9:16-style crop
 *   via object-cover) — pure CSS crop, zero quality loss, no re-encoding.
 * Skipped entirely for prefers-reduced-motion users.
 * Static overlays keep text readable; nothing here is scroll-linked.
 */
export default function HeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow(!reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  if (!show) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <video
        className="h-full w-full object-cover object-center opacity-0 transition-opacity duration-700 [&.loaded]:opacity-100"
        src="/media/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={(e) => e.currentTarget.classList.add("loaded")}
      />
      {/* Static readability overlays — never animated by scroll */}
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/30 to-ink" />
      {/* Mobile: center vignette. Desktop: left-biased gradient behind the copy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,12,0.7)_100%)] lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/25 to-transparent lg:block" />
    </div>
  );
}
