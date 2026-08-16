/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH GALLERY
 *  To add real photos:
 *   1. Drop images into /public/gallery/ (JPG/WebP, ~1600px wide works well)
 *   2. Add an entry below with src "/gallery/your-file.jpg"
 *  Placeholders (src: null) render as branded placeholder tiles until then.
 *
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

export const gallery: GalleryItem[] = [
  { id: "int-1", category: "interior", src: null, alt: "Deep-cleaned leather interior after a full interior detail on an SUV in Melrose Park IL", label: "Interior Detail · SUV" },
  { id: "ext-1", category: "exterior", src: null, alt: "Glossy black paint after a signature exterior detail on a sedan in Melrose Park IL", label: "Signature Exterior · Sedan" },
  { id: "odo-1", category: "odor", src: null, alt: "Fresh, sanitized cabin after a full odor treatment on a coupe in Melrose Park IL", label: "Odor Treatment · Coupe" },
  { id: "int-2", category: "interior", src: null, alt: "Steam-cleaned carpets and restored console after an interior detail on a truck in the surrounding areas", label: "Interior Detail · Truck" },
  { id: "ext-2", category: "exterior", src: null, alt: "Wheels and tires deep-cleaned and dressed after a signature exterior detail on an SUV in Melrose Park IL", label: "Signature Exterior · SUV" },
  { id: "odo-2", category: "odor", src: null, alt: "Steam-sanitized seats and carpets after smoke odor removal on a sedan in Chicago IL", label: "Smoke Odor Removal · Sedan" },
  { id: "int-3", category: "interior", src: null, alt: "Spotless dashboard and vents after interior detailing on a coupe in Melrose Park IL", label: "Interior Detail · Coupe" },
  { id: "ext-3", category: "exterior", src: null, alt: "Paint decontaminated and sealed after a wash, clay and seal on a truck in Franklin Park IL", label: "Wash, Clay & Seal · Truck" },
  { id: "odo-3", category: "odor", src: null, alt: "Ozone treatment in progress inside an SUV cabin, pet odor removal in the Chicago suburbs", label: "Pet Odor Removal · SUV" },
];
