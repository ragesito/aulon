"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/content/gallery";

/**
 * Drag-to-compare before/after viewer.
 * The "after" photo sits underneath; the "before" photo is clipped to the
 * slider position, so dragging wipes between them. Works with mouse, touch
 * and keyboard (arrow keys on the handle).
 */
export default function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <figure className="w-full">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-ink-line bg-ink"
      >
        {/* AFTER — full frame underneath */}
        <Image
          src={pair.after}
          alt={pair.afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          priority
          draggable={false}
        />

        {/* BEFORE — clipped to the slider position */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={pair.beforeAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            priority
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 border border-gold/60 bg-ink/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-gold backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 border border-gold bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-ink">
          After
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-gold shadow-[0_0_12px_rgba(218,165,32,0.6)]"
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-gold bg-ink/90 text-gold backdrop-blur-sm transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M9.5 7 5.5 12l4 5M14.5 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <figcaption className="mt-5 text-center">
        <p className="text-lg font-bold text-ivory">{pair.title}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest2 text-gold">
          {pair.service}
        </p>
        <p className="mt-2 text-xs text-ivory-dim/70">
          Drag the handle to compare
        </p>
      </figcaption>
    </figure>
  );
}
