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
    q: "How do you remove smoke or pet odor from a car?",
    a: "Masking sprays don't work; the smell lives in the carpets, headliner and HVAC system. Our odor treatment uses a chemical oxidation treatment that reaches inside the vents and every fabric, and it's always performed together with an Interior Detail so the source gets removed, not covered. The add-on is a flat $55 for any vehicle and takes 1 to 2 hours. It is one of our two special services, along with Trim Restoration, which can be added to any package or booked on its own.",
  },
  {
    q: "Do you offer mobile detailing near Melrose Park?",
    a: "Yes. We offer mobile detailing throughout Melrose Park, Maywood, Franklin Park, Elmwood Park, Oak Park, River Grove and the surrounding areas. We bring water, power and professional products to your driveway. Just choose mobile service when booking.",
  },
  {
    q: "How long does a full detail take?",
    a: "A full detail takes 3–5 hours depending on vehicle size and condition. A signature exterior detail is done in about an hour and a half, the odor treatment add-on takes 1 to 2 hours, and a wash, clay and seal is typically done in 2 to 3 hours.",
  },
  {
    q: "How often should I get my car detailed?",
    a: "For most daily drivers in the Chicago area we recommend a full detail every 4–6 months, with maintenance washes in between. Winter road salt is hard on paint and carpets, so a post-winter detail in spring is the single most valuable appointment of the year.",
  },
  {
    q: "What is a clay bar treatment and does my car need it?",
    a: "Clay bar treatment pulls embedded contamination out of your paint: rail dust, industrial fallout, tar and overspray that washing can't remove. If the paint feels rough or gritty after a wash, it needs clay. We follow it with a sealant so the freshly cleaned paint stays protected for months.",
  },
  {
    q: "Do I need to pay online to book?",
    a: "A $10 deposit reserves your slot, paid securely through Stripe when you book. It's not an extra charge: the full $10 goes toward your final price. The deposit is non-refundable if you cancel, but you can reschedule once free with 24 hours notice. The remaining balance is due after the work is done and you've inspected it. We accept cash and all major cards.",
  },
];
