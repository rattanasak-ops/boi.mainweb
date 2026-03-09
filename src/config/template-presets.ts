// ===== Template Presets =====
// Maps each site template → default section variants + section order
// Admin can override per-section, but presets provide a starting point

import type { SectionId, VariantId } from "./section-registry";
import { REORDERABLE_SECTION_IDS } from "./section-registry";

export interface SectionVariantConfig {
  sectionId: SectionId;
  variantId: VariantId;
}

export interface TemplatePreset {
  templateId: string;
  /** Default variant for each section in this template */
  sectionVariants: SectionVariantConfig[];
  /** Default order of reorderable sections */
  sectionOrder: SectionId[];
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    templateId: "royal-navy",
    sectionVariants: [
      { sectionId: "hero", variantId: "v1" }, // Fullscreen cinematic
      { sectionId: "stats", variantId: "v1" }, // Counter cards
      { sectionId: "why-thailand", variantId: "v1" }, // Icon grid
      { sectionId: "services", variantId: "v1" }, // Service cards
      { sectionId: "news", variantId: "v1" }, // Card grid
      { sectionId: "cta", variantId: "v1" }, // Full banner
    ],
    sectionOrder: ["stats", "why-thailand", "services", "news"],
  },
  {
    templateId: "modern-white",
    sectionVariants: [
      { sectionId: "hero", variantId: "v2" }, // Split layout
      { sectionId: "stats", variantId: "v2" }, // Infographic strip
      { sectionId: "why-thailand", variantId: "v3" }, // Tab + Image
      { sectionId: "services", variantId: "v2" }, // Icon list
      { sectionId: "news", variantId: "v2" }, // Magazine layout
      { sectionId: "cta", variantId: "v2" }, // Split cards
    ],
    sectionOrder: ["stats", "services", "why-thailand", "news"],
  },
  {
    templateId: "forest-green",
    sectionVariants: [
      { sectionId: "hero", variantId: "v3" }, // Card carousel
      { sectionId: "stats", variantId: "v3" }, // Map + Numbers
      { sectionId: "why-thailand", variantId: "v2" }, // Timeline flow
      { sectionId: "services", variantId: "v3" }, // Mega grid
      { sectionId: "news", variantId: "v3" }, // Timeline feed
      { sectionId: "cta", variantId: "v3" }, // Floating action
    ],
    sectionOrder: ["why-thailand", "stats", "services", "news"],
  },
  {
    templateId: "sunrise-gradient",
    sectionVariants: [
      { sectionId: "hero", variantId: "v4" }, // Minimal gradient
      { sectionId: "stats", variantId: "v4" }, // Ticker scroll
      { sectionId: "why-thailand", variantId: "v4" }, // Accordion cards
      { sectionId: "services", variantId: "v4" }, // Slider showcase
      { sectionId: "news", variantId: "v4" }, // Minimal list
      { sectionId: "cta", variantId: "v4" }, // Inline minimal
    ],
    sectionOrder: ["services", "stats", "news", "why-thailand"],
  },
  {
    templateId: "dark-executive",
    sectionVariants: [
      { sectionId: "hero", variantId: "v1" }, // Fullscreen cinematic
      { sectionId: "stats", variantId: "v2" }, // Infographic strip
      { sectionId: "why-thailand", variantId: "v1" }, // Icon grid
      { sectionId: "services", variantId: "v1" }, // Service cards
      { sectionId: "news", variantId: "v2" }, // Magazine layout
      { sectionId: "cta", variantId: "v1" }, // Full banner
    ],
    sectionOrder: ["stats", "why-thailand", "services", "news"],
  },
];

// Storage key for custom section config (overrides preset)
export const SECTION_CONFIG_STORAGE_KEY = "boi-section-config";

export interface CustomSectionConfig {
  /** Which variant each section uses (overrides preset) */
  variants: Record<string, string>;
  /** Custom section order (overrides preset) */
  order: SectionId[];
}

// Get preset for a template
export function getTemplatePreset(
  templateId: string
): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((p) => p.templateId === templateId);
}

// Get effective section config: custom overrides > template preset > defaults
export function getEffectiveSectionConfig(
  templateId: string,
  customConfig?: CustomSectionConfig | null
): { variants: Record<SectionId, VariantId>; order: SectionId[] } {
  const preset = getTemplatePreset(templateId);

  // Build default variants from preset
  const defaultVariants: Record<string, string> = {};
  if (preset) {
    for (const sv of preset.sectionVariants) {
      defaultVariants[sv.sectionId] = sv.variantId;
    }
  }

  // Merge with custom overrides
  const variants = {
    hero: "v1",
    stats: "v1",
    "why-thailand": "v1",
    services: "v1",
    news: "v1",
    cta: "v1",
    ...defaultVariants,
    ...(customConfig?.variants ?? {}),
  } as Record<SectionId, VariantId>;

  // Order: custom > preset > default
  const order: SectionId[] =
    customConfig?.order ??
    preset?.sectionOrder ??
    REORDERABLE_SECTION_IDS;

  return { variants, order };
}
