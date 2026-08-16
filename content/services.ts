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
      "A complete interior reset. Every surface vacuumed, steamed, brushed and protected: carpets, seats, headliner, vents and trim.",
    duration: "2–3 hours",
    pricing: { sedan: 105, coupe: 105, suv: 129, truck: 149 },
    fromPrice: 105,
    included: [
      "Full interior vacuum incl. trunk",
      "Steam cleaning of carpets & upholstery",
      "Leather cleaned & conditioned",
      "Dash, console & trim detailed",
      "Interior glass crystal-clear",
      "Air vents & crevices brushed out",
      "Odor-neutralizing treatment",
    ],
  },
  {
    slug: "exterior-detail",
    name: "Exterior Detail",
    short: "Hand wash, decontamination and gloss-boosting protection.",
    description:
      "Meticulous two-bucket hand wash, iron and tar decontamination, wheels and tires dressed, finished with a premium spray sealant.",
    duration: "1.5–2.5 hours",
    pricing: { sedan: 85, coupe: 85, suv: 105, truck: 125 },
    fromPrice: 85,
    included: [
      "Foam pre-wash & two-bucket hand wash",
      "Iron & tar chemical decontamination",
      "Clay bar treatment",
      "Wheels, barrels & tires deep-cleaned",
      "Tire dressing & trim restored",
      "Exterior glass polished",
      "6-month spray sealant protection",
    ],
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    short: "The complete Aulon treatment, inside and out.",
    description:
      "Our signature package. The full interior and exterior details combined in a single appointment. The closest thing to a brand-new car.",
    duration: "4–6 hours",
    pricing: { sedan: 165, coupe: 165, suv: 199, truck: 239 },
    fromPrice: 165,
    included: [
      "Everything in Interior Detail",
      "Everything in Exterior Detail",
      "Engine bay wipe-down",
      "Door jambs & seals detailed",
      "Premium interior protectant",
      "Priority scheduling",
    ],
    featured: true,
  },
  {
    slug: "odor-treatment",
    name: "Odor Treatment",
    short: "Smoke, pets, spills: neutralized at the source, not masked.",
    description:
      "A full-cabin decontamination that eliminates odors instead of covering them. Steam sanitation, enzyme treatment and an ozone cycle reach the vents, carpets and every surface the smell lives in.",
    duration: "2–4 hours",
    pricing: { sedan: 89, coupe: 89, suv: 109, truck: 129 },
    fromPrice: 89,
    included: [
      "Odor source inspection",
      "Full interior vacuum & steam sanitation",
      "Enzyme treatment on carpets & upholstery",
      "Ozone generator treatment",
      "HVAC system & vent fogging",
      "Cabin air filter check",
      "Final odor-neutralizing finish",
    ],
  },
  {
    slug: "wash-clay-seal",
    name: "Wash, Clay & Seal",
    short: "Deep-cleaned paint, decontaminated and sealed for months.",
    description:
      "The right reset for your paint. A meticulous hand wash, a full clay bar decontamination that pulls out embedded grime, and a durable sealant that locks in gloss and protection for months.",
    duration: "2–3 hours",
    pricing: { sedan: 69, coupe: 69, suv: 85, truck: 99 },
    fromPrice: 69,
    included: [
      "Foam pre-wash & two-bucket hand wash",
      "Full clay bar decontamination",
      "Embedded grime & overspray removal",
      "Paint prepped & wiped down",
      "6-month paint sealant applied",
      "Exterior glass cleaned & sealed",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
