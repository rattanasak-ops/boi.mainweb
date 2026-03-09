"use client";

import { useState, useEffect, useCallback } from "react";
import type { SectionId, VariantId } from "@/config/section-registry";
import { DEFAULT_VARIANT, REORDERABLE_SECTION_IDS } from "@/config/section-registry";
import {
  SECTION_CONFIG_STORAGE_KEY,
  getEffectiveSectionConfig,
  type CustomSectionConfig,
} from "@/config/template-presets";
import { SITE_TEMPLATE_STORAGE_KEY, DEFAULT_SITE_TEMPLATE } from "@/config/site-templates";

// Custom event name for section config changes
const SECTION_CONFIG_EVENT = "boi-section-config-change";

// Read custom config from localStorage (must only call on client)
function readCustomConfig(): CustomSectionConfig | null {
  try {
    const raw = localStorage.getItem(SECTION_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomSectionConfig;
  } catch {
    return null;
  }
}

// Read active template from localStorage (must only call on client)
function readTemplateId(): string {
  return localStorage.getItem(SITE_TEMPLATE_STORAGE_KEY) ?? DEFAULT_SITE_TEMPLATE;
}

// SSR-safe defaults — must match what server renders to avoid hydration mismatch
const SSR_DEFAULT_VARIANTS: Record<SectionId, VariantId> = {
  hero: "v1",
  stats: "v1",
  "why-thailand": "v1",
  services: "v1",
  news: "v1",
  cta: "v1",
};
const SSR_DEFAULT_ORDER: SectionId[] = [...REORDERABLE_SECTION_IDS];

/**
 * Hook: get the active variant for a specific section
 * SSR-safe: always renders v1 on server, then reads localStorage after mount
 */
export function useSectionVariant(sectionId: SectionId): VariantId {
  const [variant, setVariant] = useState<VariantId>(DEFAULT_VARIANT);

  useEffect(() => {
    const refresh = () => {
      const templateId = readTemplateId();
      const custom = readCustomConfig();
      const { variants } = getEffectiveSectionConfig(templateId, custom);
      setVariant(variants[sectionId] ?? DEFAULT_VARIANT);
    };

    refresh();

    window.addEventListener(SECTION_CONFIG_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SECTION_CONFIG_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [sectionId]);

  return variant;
}

/**
 * Hook: get the full section config (all variants + order)
 * SSR-safe: starts with defaults, reads localStorage after mount
 */
export function useSectionConfig() {
  const [config, setConfig] = useState<{
    variants: Record<SectionId, VariantId>;
    order: SectionId[];
  }>({ variants: SSR_DEFAULT_VARIANTS, order: SSR_DEFAULT_ORDER });

  const refresh = useCallback(() => {
    const templateId = readTemplateId();
    const custom = readCustomConfig();
    setConfig(getEffectiveSectionConfig(templateId, custom));
  }, []);

  useEffect(() => {
    refresh();

    const handler = () => refresh();
    window.addEventListener(SECTION_CONFIG_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(SECTION_CONFIG_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  const updateConfig = useCallback(
    (updates: Partial<CustomSectionConfig>) => {
      const current = readCustomConfig() ?? { variants: {}, order: config.order };
      const merged: CustomSectionConfig = {
        variants: { ...current.variants, ...updates.variants },
        order: updates.order ?? current.order,
      };
      localStorage.setItem(SECTION_CONFIG_STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event(SECTION_CONFIG_EVENT));
      refresh();
    },
    [config.order, refresh]
  );

  const resetConfig = useCallback(() => {
    localStorage.removeItem(SECTION_CONFIG_STORAGE_KEY);
    window.dispatchEvent(new Event(SECTION_CONFIG_EVENT));
    refresh();
  }, [refresh]);

  return { ...config, updateConfig, resetConfig };
}
