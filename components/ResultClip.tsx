"use client";

import { useRef, useState } from "react";
import type { ResultClipItem } from "@/content/gallery";

/**
 * Short looping walkthrough of a finished car. Muted and inline so it can
 * autoplay on mobile; the poster carries the first frame so nothing flashes
 * black while it loads. Caption styling mirrors <BeforeAfter /> so the two
 * sit side by side as one composition.
 */
export default function ResultClip({ clip }: { clip: ResultClipItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className="w-full">
      <div className="relative mx-auto w-full overflow-hidden border border-ink-line bg-ink">
        <video
          ref={videoRef}
          className="block h-auto w-full"
          src={clip.src}
          poster={clip.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className="pointer-events-none absolute left-4 top-4 border border-gold bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-ink">
          Finished
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
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

      <figcaption className="mt-5 text-center">
        <p className="text-lg font-bold text-ivory">{clip.title}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest2 text-gold">
          {clip.service}
        </p>
        <p className="mt-2 text-xs text-ivory-dim/70">{clip.caption}</p>
      </figcaption>
    </figure>
  );
}
