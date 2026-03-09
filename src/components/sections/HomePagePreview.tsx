"use client";

import { useState, useEffect, useCallback } from "react";
import SectionRenderer from "./SectionRenderer";
import type { SectionId, VariantId } from "@/config/section-registry";
import { REORDERABLE_SECTION_IDS } from "@/config/section-registry";
import {
  SECTION_CONFIG_STORAGE_KEY,
  getEffectiveSectionConfig,
} from "@/config/template-presets";
import {
  SITE_TEMPLATE_STORAGE_KEY,
  DEFAULT_SITE_TEMPLATE,
} from "@/config/site-templates";

const DEFAULT_VARIANTS: Record<SectionId, VariantId> = {
  hero: "v1",
  stats: "v1",
  "why-thailand": "v1",
  services: "v1",
  news: "v1",
  cta: "v1",
};

export default function HomePagePreview() {
  const [variants, setVariants] = useState<Record<SectionId, VariantId>>(DEFAULT_VARIANTS);
  const [order, setOrder] = useState<SectionId[]>([...REORDERABLE_SECTION_IDS]);

  const refresh = useCallback(() => {
    try {
      const templateId =
        localStorage.getItem(SITE_TEMPLATE_STORAGE_KEY) ?? DEFAULT_SITE_TEMPLATE;
      const raw = localStorage.getItem(SECTION_CONFIG_STORAGE_KEY);
      const custom = raw ? JSON.parse(raw) : null;
      const config = getEffectiveSectionConfig(templateId, custom);
      setVariants(config.variants);
      setOrder(config.order);
    } catch {
      // fallback to defaults
    }
  }, []);

  useEffect(() => {
    refresh();

    // Cross-document storage events (from admin parent window)
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === SECTION_CONFIG_STORAGE_KEY ||
        e.key === SITE_TEMPLATE_STORAGE_KEY ||
        e.key === null // clear all
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);

    // postMessage from admin parent (instant feedback)
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "boi-preview-update") {
        if (e.data.variants) setVariants(e.data.variants);
        if (e.data.order) setOrder(e.data.order);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, [refresh]);

  return (
    <div className="flex flex-col">
      <div id="section-hero">
        <SectionRenderer sectionId="hero" variantId={variants.hero} />
      </div>

      {order.map((sectionId) => {
        if (!REORDERABLE_SECTION_IDS.includes(sectionId)) return null;
        return (
          <div key={sectionId} id={`section-${sectionId}`}>
            <SectionRenderer
              sectionId={sectionId}
              variantId={variants[sectionId] ?? "v1"}
            />
          </div>
        );
      })}

      <div id="section-cta">
        <SectionRenderer sectionId="cta" variantId={variants.cta} />
      </div>
    </div>
  );
}
