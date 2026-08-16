"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  <IntroAnimation /> — MOUNT POINT for the custom logo entrance animation.
 *
 *  A bespoke animation will replace this later. For now: a simple full-screen
 *  fade — logo scales/fades in on a black backdrop, then the overlay fades
 *  out and unmounts. Runs once per session (sessionStorage flag) and is
 *  skipped entirely for prefers-reduced-motion users.
 *
 *  To implement the final animation, replace the inner markup of this
 *  component only — it is already mounted at the app root (app/layout.tsx).
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // In dev the intro always plays (easier to iterate on the animation).
    // In production it runs once per session and respects reduced motion.
    const isDev = process.env.NODE_ENV === "development";
    const seen = sessionStorage.getItem("aulon-intro-seen");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDev && (seen || reduced)) return;
    sessionStorage.setItem("aulon-intro-seen", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink animate-intro-fade"
    >
      <div className="animate-intro-logo">
        <Image
          src="/logo/aulon.svg"
          alt=""
          width={320}
          height={103}
          priority
          className="h-auto w-56 sm:w-72"
        />
      </div>
    </div>
  );
}
