"use client";

import { useRef, useState } from "react";
import type { BeforeAfterClipPair } from "@/content/gallery";

/**
 * Before/after walkthrough videos of the same car, side by side. Both clips
 * are muted loops so they can autoplay on mobile; one control pauses both.
 * Badges and caption styling mirror <BeforeAfter /> and <ResultClip /> so
 * the gallery reads as one composition.
 */
export default function BeforeAfterClips({
  pair,
  className = "",
}: {
  pair: BeforeAfterClipPair;
  className?: string;
}) {
  const beforeRef = useRef<HTMLVideoElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function toggle() {
    const vids = [beforeRef.current, afterRef.current];
    if (playing) {
      vids.forEach((v) => v?.pause());
    } else {
      vids.forEach((v) => v?.play());
    }
    setPlaying(!playing);
  }

  return (
    <figure className={`w-full ${className}`}>
      <div className="relative grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden border border-ink-line bg-ink">
          <video
            ref={beforeRef}
            className="block h-auto w-full"
            src={pair.before}
            poster={pair.beforePoster}
            aria-label={pair.beforeAlt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className="pointer-events-none absolute left-4 top-4 border border-gold/60 bg-ink/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-gold backdrop-blur-sm">
            Before
          </span>
        </div>

        <div className="relative overflow-hidden border border-ink-line bg-ink">
          <video
            ref={afterRef}
            className="block h-auto w-full"
            src={pair.after}
            poster={pair.afterPoster}
            aria-label={pair.afterAlt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className="pointer-events-none absolute right-4 top-4 border border-gold bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-ink">
            After
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause videos" : "Play videos"}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-gold/60 bg-ink/80 text-gold backdrop-blur-sm transition-colors hover:border-gold hover:bg-ink"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <figcaption className="mt-5 text-center">
        <p className="text-lg font-bold text-ivory">{pair.title}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest2 text-gold">
          {pair.service}
        </p>
        <p className="mt-2 text-xs text-ivory-dim/70">{pair.caption}</p>
      </figcaption>
    </figure>
  );
}
