/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — BUSINESS INFO
 *  Edit this file to change contact details, hours, service area, socials.
 *  No code changes needed anywhere else.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Aulon Detailing",
  legalName: "Aulon Detailing",
  tagline: "Premium Auto Detailing in Melrose Park, IL",
  heroLine: "Your car, showroom new.",
  heroSub: "Premium detailing in Melrose Park, by appointment only.",

  // TODO(owner): confirm real phone number
  phone: "(708) 555-0134",
  phoneHref: "tel:+17085550134",
  // TODO(owner): confirm real business email
  email: "aulondetailing@gmail.com",

  city: "Melrose Park",
  state: "IL",
  zip: "60160",
  // TODO(owner): confirm street address if you want it public (or keep city-only for mobile service)
  addressLine: "Melrose Park, IL 60160",

  geo: { lat: 41.9006, lng: -87.8567 }, // Melrose Park, IL

  hours: {
    days: "Monday – Saturday",
    open: "8:00 AM",
    close: "6:00 PM",
    closed: "Sunday",
  },

  serviceArea: [
    "Melrose Park",
    "Maywood",
    "Franklin Park",
    "Elmwood Park",
    "Oak Park",
    "River Grove",
    "Stone Park",
    "Bellwood",
    "Northlake",
    "River Forest",
  ],
  serviceAreaBlurb: "Serving Melrose Park and the greater Chicago West suburbs.",

  social: {
    instagram: "https://www.instagram.com/aulondetailing/",
    facebook: "https://www.facebook.com/profile.php?id=61589836165506",
    tiktok: "https://www.tiktok.com/@aulon.detailing",
  },

  // Mobile service offered — we come to you within the service area.
  mobileService: true,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type Site = typeof site;
