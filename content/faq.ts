/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — FAQ
 *  Written for local/voice search ("how much does ceramic coating cost in
 *  Chicago"). Rendered on /services and /faq + emitted as FAQPage JSON-LD.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How much does ceramic coating cost in Chicago?",
    a: "Professional ceramic coating in the Chicago area typically runs $600–$1,500 depending on vehicle size and paint condition. At Aulon Detailing in Melrose Park, ceramic coating starts at $699 for sedans and includes full decontamination and a single-stage polish before the coating is applied.",
  },
  {
    q: "Do you offer mobile detailing near Melrose Park?",
    a: "Yes. We offer mobile detailing throughout Melrose Park, Maywood, Franklin Park, Elmwood Park, Oak Park, River Grove and the greater Chicago West suburbs. We bring water, power and professional products to your driveway. Just choose mobile service when booking.",
  },
  {
    q: "How long does a full detail take?",
    a: "A full interior and exterior detail takes 4–6 hours depending on vehicle size and condition. Ceramic coating and paint correction are typically 1–2 day services because the paint needs to be corrected and cured properly.",
  },
  {
    q: "How often should I get my car detailed?",
    a: "For most daily drivers in the Chicago area we recommend a full detail every 4–6 months, with maintenance washes in between. Winter road salt is hard on paint and carpets, so a post-winter detail in spring is the single most valuable appointment of the year.",
  },
  {
    q: "What's the difference between paint correction and ceramic coating?",
    a: "Paint correction removes defects like swirl marks, light scratches and oxidation by machine-polishing the clear coat. Ceramic coating protects the finish afterward with a hard, hydrophobic layer that lasts years. For the best result they're done together: correct first, then coat.",
  },
  {
    q: "Do I need to pay online to book?",
    a: "No. Booking is free: you pick a service, date and time, and we confirm your appointment by phone or email. Payment is due after the work is done and you've inspected it. We accept cash and all major cards.",
  },
];
