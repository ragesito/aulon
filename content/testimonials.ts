/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — TESTIMONIALS
 *  TODO(owner): replace with real Google reviews as they come in.
 *  Keep them short and specific. Stars: 1–5.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface Testimonial {
  name: string;
  location: string;
  stars: number;
  text: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marcus R.",
    location: "Melrose Park, IL",
    stars: 5,
    text: "My 5-year-old SUV looks better than the day I bought it. The interior smells brand new and the attention to detail is unreal.",
    service: "Full Detail",
  },
  {
    name: "Daniela V.",
    location: "Oak Park, IL",
    stars: 5,
    text: "They came to my driveway, worked for hours, and left my car looking like it rolled off a showroom floor. Worth every dollar.",
    service: "Mobile Full Detail",
  },
  {
    name: "James T.",
    location: "Elmwood Park, IL",
    stars: 5,
    text: "Bought a used car that reeked of cigarettes. After their odor treatment it smells factory-new. I honestly didn't think it was possible.",
    service: "Odor Treatment",
  },
];
