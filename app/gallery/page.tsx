import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import BeforeAfter from "@/components/BeforeAfter";
import ResultClip from "@/components/ResultClip";
import BeforeAfterClips from "@/components/BeforeAfterClips";
import { beforeAfter, beforeAfterClips, resultClips } from "@/content/gallery";
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
          {/* Showcase: photo slider on top, then a row of three aligned
              portrait clips (before | after | finished) sharing its edges */}
          {beforeAfter.length > 0 && (
            <Reveal className="mt-14">
              <div className="mx-auto w-full max-w-4xl">
                <BeforeAfter pair={beforeAfter[0]} />
              </div>
            </Reveal>
          )}

          {(beforeAfterClips.length > 0 || resultClips.length > 0) && (
            <Reveal className="mt-16">
              <div className="mx-auto grid w-full max-w-4xl items-start gap-x-4 gap-y-12 sm:grid-cols-3">
                {beforeAfterClips.length > 0 && (
                  <BeforeAfterClips
                    pair={beforeAfterClips[0]}
                    className="sm:col-span-2"
                  />
                )}
                {resultClips.length > 0 && (
                  <div className="mx-auto w-full max-w-[320px] sm:max-w-none">
                    <ResultClip clip={resultClips[0]} />
                  </div>
                )}
              </div>
            </Reveal>
          )}

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
