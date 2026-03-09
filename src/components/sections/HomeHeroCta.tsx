"use client";

import { useSectionConfig } from "@/hooks/useSectionVariant";
import { REORDERABLE_SECTION_IDS } from "@/config/section-registry";
import SectionRenderer from "./SectionRenderer";

export default function HomeHeroCta() {
  const { variants, order } = useSectionConfig();

  return (
    <div className="flex flex-col">
      {/* Hero — always first */}
      <div id="section-hero">
        <SectionRenderer sectionId="hero" variantId={variants.hero ?? "v1"} />
      </div>

      {/* Reorderable middle sections */}
      {order.map((id) => {
        if (!REORDERABLE_SECTION_IDS.includes(id)) return null;
        return (
          <div key={id} id={`section-${id}`}>
            <SectionRenderer sectionId={id} variantId={variants[id] ?? "v1"} />
          </div>
        );
      })}

      {/* CTA — always last */}
      <div id="section-cta">
        <SectionRenderer sectionId="cta" variantId={variants.cta ?? "v1"} />
      </div>
    </div>
  );
}
