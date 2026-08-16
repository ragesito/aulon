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

export type GalleryCategory = "interior" | "exterior" | "ceramic";

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
  { value: "ceramic", label: "Ceramic" },
];

export const gallery: GalleryItem[] = [
  { id: "int-1", category: "interior", src: null, alt: "Deep-cleaned leather interior after a full interior detail on an SUV in Melrose Park IL", label: "Interior Detail · SUV" },
  { id: "ext-1", category: "exterior", src: null, alt: "Glossy black paint after an exterior detail and sealant on a sedan in Melrose Park IL", label: "Exterior Detail · Sedan" },
  { id: "cer-1", category: "ceramic", src: null, alt: "Water beading on the ceramic coated hood of a coupe, ceramic coating in Melrose Park IL", label: "Ceramic Coating · Coupe" },
  { id: "int-2", category: "interior", src: null, alt: "Steam-cleaned carpets and restored console after an interior detail on a truck, Chicago West suburbs", label: "Interior Detail · Truck" },
  { id: "ext-2", category: "exterior", src: null, alt: "Wheels and tires deep-cleaned and dressed after an exterior detail on an SUV in Melrose Park IL", label: "Exterior Detail · SUV" },
  { id: "cer-2", category: "ceramic", src: null, alt: "Mirror-finish paint after paint correction and ceramic coating on a sedan in Chicago IL", label: "Ceramic + Correction · Sedan" },
  { id: "int-3", category: "interior", src: null, alt: "Spotless dashboard and vents after interior detailing on a coupe in Melrose Park IL", label: "Interior Detail · Coupe" },
  { id: "ext-3", category: "exterior", src: null, alt: "Paint decontaminated and sealed after an exterior detail on a truck in Franklin Park IL", label: "Exterior Detail · Truck" },
  { id: "cer-3", category: "ceramic", src: null, alt: "High-gloss ceramic coated finish in sunlight on an SUV, ceramic coating in the Chicago suburbs", label: "Ceramic Coating · SUV" },
];
