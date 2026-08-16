/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — SERVICES & PRICING
 *  Edit prices/inclusions here. Everything (services page, booking form,
 *  structured data, sitemap) reads from this file.
 *
 *  TODO(owner): ALL PRICES BELOW ARE REALISTIC PLACEHOLDERS.
 *  Confirm every number before launch.
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
    slug: "interior-detail",
    name: "Interior Detail",
    short: "Deep-cleaned cabin, restored to delivery-day condition.",
    description:
      "A complete interior reset. Every surface vacuumed, steamed, brushed and protected: carpets, seats, headliner, vents and trim.",
    duration: "2–3 hours",
    pricing: { sedan: 149, coupe: 149, suv: 189, truck: 209 },
    fromPrice: 149,
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
    pricing: { sedan: 119, coupe: 119, suv: 149, truck: 169 },
    fromPrice: 119,
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
    pricing: { sedan: 239, coupe: 239, suv: 299, truck: 339 },
    fromPrice: 239,
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
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    short: "Years of gloss and protection, professionally installed.",
    description:
      "Professional-grade ceramic coating bonded to your paint after a full decontamination and single-stage polish. Extreme gloss, hydrophobic behavior and chemical resistance for 2–5 years.",
    duration: "1–2 days",
    pricing: { sedan: 699, coupe: 699, suv: 849, truck: 949 },
    fromPrice: 699,
    included: [
      "Full exterior decontamination",
      "Single-stage machine polish",
      "Panel wipe & surface prep",
      "Professional ceramic coating (2–5 yr)",
      "Wheels faces coated",
      "Glass water-repellent treatment",
      "Aftercare kit & maintenance guide",
    ],
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
    short: "Swirls and scratches machine-polished out of the paint.",
    description:
      "Multi-stage machine polishing that removes swirl marks, light scratches, oxidation and water spots, restoring true depth and mirror clarity to your paintwork.",
    duration: "1–2 days",
    pricing: { sedan: 449, coupe: 449, suv: 549, truck: 649 },
    fromPrice: 449,
    included: [
      "Paint depth inspection & test spot",
      "Full decontamination & clay bar",
      "Multi-stage machine polish",
      "Swirl & light-scratch removal",
      "Panel wipe & finish inspection",
      "Sealant protection applied",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
