/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — SERVICES & PRICING
 *  Edit prices/inclusions here. Everything (services page, booking form,
 *  structured data, sitemap) reads from this file.
 *
 *  PRICING: confirmed by the owner. Sedan and coupe share a price, so they
 *  are offered as a single "Sedan / Coupe" choice.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type VehicleType = "sedan" | "coupe" | "suv" | "truck";

/** Sedan and coupe always cost the same, so they are offered as one choice.
 *  "coupe" stays in the type/pricing for backwards compatibility with
 *  bookings taken before they were merged. */
export const vehicleTypes: { value: VehicleType; label: string }[] = [
  { value: "sedan", label: "Sedan / Coupe" },
  { value: "suv", label: "SUV / Crossover" },
  { value: "truck", label: "Truck / Van" },
];


export interface ServicePackage {
  slug: string;
  name: string;
  short: string; // one-liner for cards
  description: string;
  duration: string;
  /** Price per vehicle type, USD. TODO(owner): confirm all pricing. */
  pricing: Record<VehicleType, number>;
  fromPrice: number; // lowest price, for "from $X" display
  included: string[];
  featured?: boolean;
  /** Small caveat shown with the package (e.g. condition surcharges) */
  note?: string;
  /** Shown in the "Special Services" section instead of the main list */
  special?: boolean;
  /** Base service slugs this can be added to (special services only) */
  addOnFor?: string[];
  /** A special service that can ALSO be booked on its own */
  standalone?: boolean;
}

/** Packages shown in the main services list (add-ons appear here too when
 *  they can be booked on their own) */
export function regularServices(): ServicePackage[] {
  return services.filter((s) => !s.special || s.standalone);
}

/** Add-on services, shown in the "Special Services" section */
export function specialServices(): ServicePackage[] {
  return services.filter((s) => s.special);
}

/** Add-ons that can be attached to a given base service */
export function addOnsFor(baseSlug: string): ServicePackage[] {
  return specialServices().filter((s) => s.addOnFor?.includes(baseSlug));
}

/** Book link. Add-ons that cannot stand alone are routed through a base
 *  service with the add-on preselected. */
export function bookHref(slug: string): string {
  const svc = getService(slug);
  if (svc?.special && !svc.standalone && svc.addOnFor?.length) {
    return `/book?service=${svc.addOnFor[0]}&addon=${svc.slug}`;
  }
  return `/book?service=${slug}`;
}

/** Link that books a special service AS an add-on of its first base service */
export function addOnHref(svc: ServicePackage): string {
  const base = svc.addOnFor?.[0];
  return base ? `/book?service=${base}&addon=${svc.slug}` : `/book?service=${svc.slug}`;
}

export const services: ServicePackage[] = [
  {
    slug: "signature-exterior-detail",
    name: "Signature Exterior Detail",
    short: "The signature hand wash, finished like a detail.",
    description:
      "The signature hand wash, finished like a detail. A careful pH-balanced hand wash inside a full routine: wheels, jambs, glass and a final inspection so nothing leaves half-done.",
    duration: "1–1.5 hours",
    pricing: { sedan: 55, coupe: 55, suv: 65, truck: 75 },
    fromPrice: 55,
    included: [
      "Pre-wash & premium hand wash (pH-balanced shampoo)",
      "Wheels, tires & wheel wells cleaned and protected",
      "Bug & road grime removal",
      "Exterior & interior windows, streak-free",
      "Door jambs cleaned and wiped down",
      "Towel & air dry",
      "Final inspection for a flawless finish",
    ],
  },
  {
    slug: "interior-detail",
    name: "Interior Detail",
    short: "Deep-cleaned cabin, restored to delivery-day condition.",
    description:
      "A complete interior reset. Every surface vacuumed, brushed and protected.",
    duration: "1–2 hours",
    pricing: { sedan: 65, coupe: 65, suv: 75, truck: 85 },
    fromPrice: 65,
    included: [
      "Full interior vacuum incl. trunk",
      "Dash, console & trim detailed",
      "Exterior & interior windows, streak-free",
      "Air vents & crevices brushed out",
    ],
    note: "Heavily soiled interiors may carry a $15 surcharge, at the detailer's discretion. We always confirm it with you before starting.",
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    short: "The complete Aulon treatment, inside and out.",
    description:
      "The complete package. The Signature Exterior Detail and the Interior Detail combined in a single appointment. The closest thing to a brand-new car.",
    duration: "2–4 hours",
    pricing: { sedan: 120, coupe: 120, suv: 140, truck: 160 },
    fromPrice: 120,
    included: [
      "Everything in Signature Exterior Detail",
      "Everything in Interior Detail",
    ],
    featured: true,
  },
  {
    slug: "wash-clay-seal",
    name: "Wash, Clay & Seal",
    short: "Deep-cleaned paint, decontaminated and sealed for months.",
    description:
      "The right reset for your paint. A meticulous hand wash, a full clay bar decontamination that pulls out embedded grime, and a durable spray sealant that locks in gloss and protection for months.",
    duration: "2–3 hours",
    pricing: { sedan: 90, coupe: 90, suv: 105, truck: 120 },
    fromPrice: 90,
    included: [
      "Foam pre-wash & two-bucket hand wash",
      "Full clay bar decontamination",
      "Exterior glass cleaned & sealed",
    ],
  },
  // ── Special services (add-ons) ──────────────────────────────────────
  {
    slug: "odor-treatment",
    name: "Odor Treatment",
    short: "Smoke, pets, spills: neutralized at the source, not masked.",
    description:
      "A full-cabin decontamination that eliminates odors instead of covering them. A chemical oxidation treatment reaches the vents, carpets and every surface the smell lives in.",
    duration: "1–2 hours",
    pricing: { sedan: 55, coupe: 55, suv: 55, truck: 55 },
    fromPrice: 55,
    included: ["Chemical oxidation treatment", "Air freshener bars"],
    special: true,
    addOnFor: ["interior-detail", "full-detail"],
    note: "Added to an Interior Detail or Full Detail. It cannot be booked on its own.",
  },
  {
    slug: "trim-restoration",
    name: "Trim Restoration",
    short: "Faded plastic trim brought back to deep, even black.",
    description:
      "Sun-bleached bumpers, mirror caps and wheel arches restored instead of dressed. We clean the trim down to bare plastic and bond a restorer that brings back the original color, then seal it against UV so it lasts.",
    duration: "1–2 hours",
    pricing: { sedan: 55, coupe: 55, suv: 55, truck: 55 },
    fromPrice: 55,
    included: [
      "Faded trim assessment",
      "Deep clean & degrease of all plastic trim",
      "Trim restorer bonded and cured",
      "UV protectant for a lasting finish",
      "Bumpers, mirror caps & wheel arches included",
    ],
    special: true,
    standalone: true,
    addOnFor: [
      "signature-exterior-detail",
      "interior-detail",
      "full-detail",
      "wash-clay-seal",
    ],
    note: "Book it on its own, or add it to any detailing package.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
