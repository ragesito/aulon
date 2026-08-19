import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us for a Quote",
  description:
    "Contact Aulon Detailing in Melrose Park, IL. Call, email or message us for quotes, availability and mobile detailing across the surrounding areas.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <SectionHeading
            as="h1"
            kicker="Contact"
            title="Talk to us"
            sub="Quotes, questions, weird stains: send it all. We answer within one business day."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {/* Info */}
            <Reveal className="space-y-8">
              <div className="border border-ink-line bg-ink-soft p-8">
                <h2 className="kicker">Direct</h2>
                <ul className="mt-4 space-y-4">
                  <li>
                    {/* TODO(owner): confirm phone in content/site.ts */}
                    <a href={site.phoneHref} className="group flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center border border-ink-line text-gold group-hover:border-gold">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-widest text-ivory-dim">Phone</span>
                        <span className="font-semibold text-ivory group-hover:text-gold">{site.phone}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    {/* TODO(owner): confirm email in content/site.ts */}
                    <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center border border-ink-line text-gold group-hover:border-gold">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-widest text-ivory-dim">Email</span>
                        <span className="font-semibold text-ivory group-hover:text-gold">{site.email}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center border border-ink-line text-gold">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-ivory-dim">Hours</span>
                      <span className="font-semibold text-ivory">
                        {site.hours.days} · {site.hours.open}–{site.hours.close}
                      </span>
                      <span className="block text-xs text-ivory-dim">Closed {site.hours.closed}</span>
                    </span>
                  </li>
                </ul>
                <div className="mt-6 border-t border-ink-line pt-6">
                  <h3 className="kicker mb-4">Follow the work</h3>
                  <SocialLinks />
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden border border-ink-line">
                <iframe
                  title={`Google map of ${site.city}, ${site.state}`}
                  src="https://www.google.com/maps?q=Melrose+Park,+IL&output=embed"
                  width="600"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full grayscale-[40%] contrast-[1.05]"
                  allowFullScreen
                />
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150} className="border border-ink-line bg-ink-soft p-8">
              <h2 className="kicker mb-6">Send a message</h2>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
