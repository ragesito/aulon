import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import BeforeAfter from "@/components/BeforeAfter";
import ResultClip from "@/components/ResultClip";
import { beforeAfter, resultClips } from "@/content/gallery";
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
          {/* Showcase: comparison slider and finished-result clip, side by side */}
          <Reveal className="mt-14">
            <div className="grid items-start gap-10 lg:grid-cols-[2.37fr_1fr] lg:gap-12">
              {beforeAfter.length > 0 && (
                <BeforeAfter pair={beforeAfter[0]} />
              )}
              {resultClips.length > 0 && (
                <div className="mx-auto w-full max-w-[320px] lg:max-w-none">
                  <ResultClip clip={resultClips[0]} />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal className="mt-20">
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
