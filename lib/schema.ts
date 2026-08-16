/**
 * JSON-LD builders — all data flows from content/*.ts (trusted).
 */
import { site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faq";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: `${site.heroLine} ${site.heroSub}`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/og.png`,
    logo: `${site.url}/logo/aulon.svg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.serviceArea.map((town) => ({
      "@type": "City",
      name: `${town}, IL`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Detailing Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: s.fromPrice,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
          serviceType: "Auto detailing",
          provider: { "@id": `${site.url}/#business` },
          areaServed: `${site.city}, ${site.state}`,
        },
      })),
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
