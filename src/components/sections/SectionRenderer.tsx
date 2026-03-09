"use client";

import dynamic from "next/dynamic";
import { useMemo, type ComponentType } from "react";
import type { SectionId, VariantId } from "@/config/section-registry";

// Loading fallback
function SectionSkeleton() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
    </div>
  );
}

// Import functions for each variant — only called when needed
const importMap: Record<string, () => Promise<{ default: ComponentType }>> = {
  "hero-v1": () => import("@/components/sections/HeroSection"),
  "hero-v2": () => import("@/components/sections/variants/hero/HeroV2"),
  "hero-v3": () => import("@/components/sections/variants/hero/HeroV3"),
  "hero-v4": () => import("@/components/sections/variants/hero/HeroV4"),
  "stats-v1": () => import("@/components/sections/StatsSection"),
  "stats-v2": () => import("@/components/sections/variants/stats/StatsV2"),
  "stats-v3": () => import("@/components/sections/variants/stats/StatsV3"),
  "stats-v4": () => import("@/components/sections/variants/stats/StatsV4"),
  "why-thailand-v1": () => import("@/components/sections/WhyThailandSection"),
  "why-thailand-v2": () => import("@/components/sections/variants/why-thailand/WhyThailandV2"),
  "why-thailand-v3": () => import("@/components/sections/variants/why-thailand/WhyThailandV3"),
  "why-thailand-v4": () => import("@/components/sections/variants/why-thailand/WhyThailandV4"),
  "services-v1": () => import("@/components/sections/QuickServicesSection"),
  "services-v2": () => import("@/components/sections/variants/services/ServicesV2"),
  "services-v3": () => import("@/components/sections/variants/services/ServicesV3"),
  "services-v4": () => import("@/components/sections/variants/services/ServicesV4"),
  "news-v1": () => import("@/components/sections/LatestNewsSection"),
  "news-v2": () => import("@/components/sections/variants/news/NewsV2"),
  "news-v3": () => import("@/components/sections/variants/news/NewsV3"),
  "news-v4": () => import("@/components/sections/variants/news/NewsV4"),
  "cta-v1": () => import("@/components/sections/CTASection"),
  "cta-v2": () => import("@/components/sections/variants/cta/CTAV2"),
  "cta-v3": () => import("@/components/sections/variants/cta/CTAV3"),
  "cta-v4": () => import("@/components/sections/variants/cta/CTAV4"),
};

// Cache dynamic components to avoid re-creating
const dynamicCache = new Map<string, ComponentType>();

function getDynamicComponent(sectionId: SectionId, variantId: VariantId): ComponentType {
  const key = `${sectionId}-${variantId}`;
  if (!dynamicCache.has(key)) {
    const loader = importMap[key] ?? importMap[`${sectionId}-v1`];
    if (!loader) {
      dynamicCache.set(key, () => null);
    } else {
      dynamicCache.set(key, dynamic(loader, { loading: SectionSkeleton, ssr: false }));
    }
  }
  return dynamicCache.get(key)!;
}

interface SectionRendererProps {
  sectionId: SectionId;
  variantId: VariantId;
}

export default function SectionRenderer({ sectionId, variantId }: SectionRendererProps) {
  const Component = useMemo(
    () => getDynamicComponent(sectionId, variantId),
    [sectionId, variantId]
  );

  return <Component />;
}
