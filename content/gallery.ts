/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH GALLERY
 *  To add real photos:
 *   1. Drop images into /public/gallery/ (JPG/WebP, ~1600px wide works well)
 *   2. Add an entry below with src "/gallery/your-file.jpg"
 *  Placeholders (src: null) render as branded placeholder tiles until then.
 *
 *  HOW TO SHOOT A BEFORE/AFTER PAIR (owner guide)
 *  The slider only works when both photos share the SAME framing, so:
 *   1. Shoot the "before" BEFORE touching the car (interior front, interior
 *      rear, trunk, and the dirtiest spot).
 *   2. Note where you stood: use a fixed reference (open door frame, B-pillar).
 *      Tip: open the "before" photo on your phone right before shooting the
 *      "after" so you can match it.
 *   3. Same height, same distance, same side.
 *   4. Same light: same parking spot, avoid sun on one and shade on the other.
 *   5. Nothing in frame on the "after": no towels, brushes or trash.
 *   6. Landscape orientation whenever possible: it fits the site better.
 *
 *  Then drop both files in /public/gallery/ and add an entry to `beforeAfter`.
 *  TODO(owner): replace placeholders with real before/after photos.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type GalleryCategory = "interior" | "exterior" | "odor";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  /** Path under /public, or null to render a branded placeholder tile */
  src: string | null;
  /** Descriptive alt text important for SEO. Pattern: "[result] [vehicle], [service], Melrose Park IL" */
  alt: string;
  label: string;
}

export const galleryCategories: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "odor", label: "Odor Treatment" },
];

/** Drag-to-compare pairs, shown above the grid. Both photos must be the
 *  same shot of the same car, before and after. */
export interface BeforeAfterPair {
  id: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  service: string;
}

export const beforeAfter: BeforeAfterPair[] = [
  {
    id: "interior-sedan",
    before: "/gallery/interior-before.jpg",
    after: "/gallery/interior-after.jpg",
    beforeAlt:
      "Rear seats and carpets covered in crumbs and dust before an interior detail in Melrose Park IL",
    afterAlt:
      "The same rear seats and carpets spotless after a full interior detail in Melrose Park IL",
    title: "Rear cabin, brought back",
    service: "Interior Detail",
  },
];

export const gallery: GalleryItem[] = [
  // ── Placeholders: swap src for a real photo as work comes in ─────────
  { id: "ext-1", category: "exterior", src: null, alt: "Glossy black paint after a signature exterior detail on a sedan in Melrose Park IL", label: "Signature Exterior · Sedan" },
  { id: "odo-1", category: "odor", src: null, alt: "Fresh, sanitized cabin after a full odor treatment on a coupe in Melrose Park IL", label: "Odor Treatment · Coupe" },
  { id: "ext-2", category: "exterior", src: null, alt: "Wheels and tires deep-cleaned and dressed after a signature exterior detail on an SUV in Melrose Park IL", label: "Signature Exterior · SUV" },
  { id: "odo-2", category: "odor", src: null, alt: "Steam-sanitized seats and carpets after smoke odor removal on a sedan in Chicago IL", label: "Smoke Odor Removal · Sedan" },
  { id: "int-3", category: "interior", src: null, alt: "Spotless dashboard and vents after interior detailing on a coupe in Melrose Park IL", label: "Interior Detail · Coupe" },
  { id: "ext-3", category: "exterior", src: null, alt: "Paint decontaminated and sealed after a wash, clay and seal on a truck in Franklin Park IL", label: "Wash, Clay & Seal · Truck" },
  { id: "odo-3", category: "odor", src: null, alt: "Ozone treatment in progress inside an SUV cabin, pet odor removal in the Chicago suburbs", label: "Pet Odor Removal · SUV" },
];
