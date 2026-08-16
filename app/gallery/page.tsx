import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Before & After Detailing Gallery",
  description:
    "Before and after photos from Aulon Detailing: interior details, exterior details and ceramic coatings on sedans, SUVs and trucks across Melrose Park and the Chicago West suburbs.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            as="h1"
            kicker="Gallery"
            title="Proof, not promises"
            sub="Filter by service to see the transformations. New work added after every appointment."
          />
          <Reveal className="mt-14">
            <GalleryGrid />
          </Reveal>
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
    </>
  );
}
