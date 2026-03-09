"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const scrollAndHighlight = useCallback((sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Clear previous highlight
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      setHighlightId(sectionId);
      highlightTimer.current = setTimeout(() => setHighlightId(null), 2500);
    }
  }, []);

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
        e.key === null
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);

    // postMessage from admin parent
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "boi-preview-update") {
        if (e.data.variants) setVariants(e.data.variants);
        if (e.data.order) setOrder(e.data.order);
        // Scroll to changed section after a tiny delay (let re-render happen)
        if (e.data.scrollTo) {
          setTimeout(() => scrollAndHighlight(e.data.scrollTo), 150);
        }
      }
      if (e.data?.type === "boi-preview-scroll") {
        scrollAndHighlight(e.data.sectionId);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, [refresh, scrollAndHighlight]);

  return (
    <div className="flex flex-col">
      {/* Highlight CSS */}
      <style>{`
        .boi-highlight {
          position: relative;
        }
        .boi-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          border: 3px solid #22c55e;
          border-radius: 12px;
          z-index: 50;
          pointer-events: none;
          animation: boi-pulse 2.5s ease-out forwards;
        }
        @keyframes boi-pulse {
          0% { opacity: 0; transform: scale(0.98); }
          10% { opacity: 1; transform: scale(1); }
          60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div id="section-hero" className={highlightId === "hero" ? "boi-highlight" : ""}>
        <SectionRenderer sectionId="hero" variantId={variants.hero} />
      </div>

      {order.map((sectionId) => {
        if (!REORDERABLE_SECTION_IDS.includes(sectionId)) return null;
        return (
          <div
            key={sectionId}
            id={`section-${sectionId}`}
            className={highlightId === sectionId ? "boi-highlight" : ""}
          >
            <SectionRenderer
              sectionId={sectionId}
              variantId={variants[sectionId] ?? "v1"}
            />
          </div>
        );
      })}

      <div id="section-cta" className={highlightId === "cta" ? "boi-highlight" : ""}>
        <SectionRenderer sectionId="cta" variantId={variants.cta} />
      </div>
    </div>
  );
}
