import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { services } from "@/content/services";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/logo/aulon.svg"
              alt={site.name}
              width={217}
              height={70}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-dim">
              {site.serviceAreaBlurb} By appointment only.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="kicker">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-ivory-dim transition-colors hover:text-gold"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="kicker">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/about", label: "About" },
                { href: "/gallery", label: "Gallery" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/book", label: "Book Now" },
                { href: "/terms", label: "Booking Terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory-dim transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="kicker">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory-dim">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>{site.addressLine}</li>
              <li>
                {site.hours.days}: {site.hours.open} – {site.hours.close}
              </li>
              <li>Closed {site.hours.closed}</li>
            </ul>
          </div>
        </div>

        <div className="gold-line mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-ivory-dim/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.{" "}
            · Site by{" "}
            <a
              href="https://fentriq.app"
              target="_blank"
              rel="noopener"
              className="font-semibold text-ivory-dim transition-colors hover:text-gold"
            >
              Fentriq
            </a>
          </p>
          <p>
            {site.city}, {site.state} · Premium Auto Detailing
          </p>
        </div>
      </div>
    </footer>
  );
}
