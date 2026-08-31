import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import BeforeAfter from "@/components/BeforeAfter";
import { beforeAfter } from "@/content/gallery";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Before & After Detailing Gallery",
  description:
    "Before and after photos from Aulon Detailing: interior details, exterior details and odor treatments on sedans, SUVs and trucks across Melrose Park and the surrounding areas.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <SectionHeading
            as="h1"
            kicker="Gallery"
            title="Proof, not promises"
            sub="Filter by service to see the transformations. New work added after every appointment."
          />
          {beforeAfter.length > 0 && (
            <Reveal className="mx-auto mt-14 max-w-3xl">
              {beforeAfter.map((pair) => (
                <BeforeAfter key={pair.id} pair={pair} />
              ))}
            </Reveal>
          )}

          <Reveal className="mt-16">
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
