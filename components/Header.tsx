"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import SocialLinks from "@/components/SocialLinks";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 animate-header-in border-b border-ink-line/80 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${site.name} home`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo/aulon.svg"
              alt={`${site.name} logo`}
              width={186}
              height={60}
              priority
              className="h-7 w-auto lg:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/book" className="btn-gold !px-6 !py-2.5 !text-xs">
              Book Now
            </Link>
          </nav>

          {/* Mobile toggle — animated hamburger/X morph */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] text-ivory transition-colors hover:text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[2px] w-6 bg-current transition-all duration-300 ease-out ${
                open ? "translate-y-[4.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-current transition-all duration-300 ease-out ${
                open ? "-translate-y-[4.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile menu: full-screen premium panel ───────────────────
          Rendered OUTSIDE <header> — its backdrop-filter would otherwise
          become the containing block for this fixed panel. */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "visible" : "invisible"
        } transition-[visibility] duration-500`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel — solid background, slides in from the right */}
        <nav
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-ink-line bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Links — scrollable middle area */}
          <ul className="flex-1 overflow-y-auto px-8 pt-24">
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={`border-b border-ink-line/60 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline gap-4 py-4 ${
                    pathname === item.href ? "text-gold" : "text-ivory"
                  }`}
                >
                  <span className="text-[10px] font-semibold tracking-widest text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold group-active:text-gold">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom block — pinned to the bottom of the panel */}
          <div
            style={{ transitionDelay: open ? `${120 + nav.length * 55 + 60}ms` : "0ms" }}
            className={`space-y-5 border-t border-ink-line bg-ink-soft px-8 pb-8 pt-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <Link href="/book" onClick={() => setOpen(false)} className="btn-gold w-full">
              Book Now
            </Link>
            <div className="flex items-center justify-between">
              <a
                href={site.phoneHref}
                className="text-sm font-semibold text-ivory-dim transition-colors hover:text-gold"
              >
                {site.phone}
              </a>
              <SocialLinks />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
