/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — SERVICES & PRICING
 *  Edit prices/inclusions here. Everything (services page, booking form,
 *  structured data, sitemap) reads from this file.
 *
 *  PRICING NOTES:
 *  - Basic Detail prices ($45/$55/$65) are the owner's confirmed prices.
 *  - All other packages were scaled to the same price level using the
 *    owner's vehicle-size ratios (SUV +22%, truck +44%).
 *  - TODO(owner): confirm the derived prices (everything except Basic).
 * ─────────────────────────────────────────────────────────────────────────
 */

export type VehicleType = "sedan" | "coupe" | "suv" | "truck";

export const vehicleTypes: { value: VehicleType; label: string }[] = [
  { value: "sedan", label: "Sedan" },
  { value: "coupe", label: "Coupe" },
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
}

export const services: ServicePackage[] = [
  {
    slug: "basic-detail",
    name: "Basic Detail",
    short: "The essential hand wash, finished like a detail.",
    description:
      "Our entry service, done the Aulon way. A careful pH-balanced hand wash inside a full routine: wheels, jambs, glass and a final inspection so nothing leaves half-done.",
    duration: "1–1.5 hours",
    pricing: { sedan: 45, coupe: 45, suv: 55, truck: 65 },
    fromPrice: 45,
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
      "A complete interior reset. Every surface vacuumed, brushed and protected: carpets, seats, headliner, vents and trim.",
    duration: "2–3 hours",
    pricing: { sedan: 60, coupe: 60, suv: 75, truck: 90 },
    fromPrice: 60,
    included: [
      "Full interior vacuum incl. trunk",
      "Leather cleaned & conditioned",
      "Dash, console & trim detailed",
      "Interior glass streak-free",
      "Air vents & crevices brushed out",
    ],
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    short: "The complete Aulon treatment, inside and out.",
    description:
      "Our signature package. The Basic Detail and the Interior Detail combined in a single appointment. The closest thing to a brand-new car.",
    duration: "3–5 hours",
    // Price = Basic Detail + Interior Detail
    pricing: { sedan: 105, coupe: 105, suv: 130, truck: 155 },
    fromPrice: 105,
    included: [
      "Everything in Basic Detail",
      "Everything in Interior Detail",
    ],
    featured: true,
  },
  {
    slug: "odor-treatment",
    name: "Odor Treatment",
    short: "Add-on to the Interior Detail: smells neutralized at the source.",
    description:
      "A full-cabin decontamination that eliminates odors instead of covering them. A chemical oxidation treatment reaches the vents, carpets and every surface the smell lives in. Always performed together with an Interior Detail service.",
    duration: "1–2 hours",
    pricing: { sedan: 89, coupe: 89, suv: 109, truck: 129 },
    fromPrice: 89,
    included: [
      "Chemical oxidation treatment",
      "Air freshener bars",
    ],
  },
  {
    slug: "wash-clay-seal",
    name: "Wash, Clay & Seal",
    short: "Deep-cleaned paint, decontaminated and sealed for months.",
    description:
      "The right reset for your paint. A meticulous hand wash, a full clay bar decontamination that pulls out embedded grime, and a durable spray sealant that locks in gloss and protection for months.",
    duration: "2–3 hours",
    pricing: { sedan: 69, coupe: 69, suv: 85, truck: 99 },
    fromPrice: 69,
    included: [
      "Foam pre-wash & two-bucket hand wash",
      "Full clay bar decontamination",
      "Exterior glass cleaned & sealed",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
