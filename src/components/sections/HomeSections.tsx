"use client";

import { useState, useEffect, type ComponentType } from "react";
import StatsSection from "@/components/sections/StatsSection";
import WhyThailandSection from "@/components/sections/WhyThailandSection";
import QuickServicesSection from "@/components/sections/QuickServicesSection";
import LatestNewsSection from "@/components/sections/LatestNewsSection";

// --- Section Registry ---
export interface SectionConfig {
  id: string;
  label: string;
  icon: string;
  component: ComponentType;
}

export const REORDERABLE_SECTIONS: SectionConfig[] = [
  { id: "stats", label: "Statistics", icon: "📊", component: StatsSection },
  { id: "why-thailand", label: "Why Thailand", icon: "🌏", component: WhyThailandSection },
  { id: "services", label: "Quick Services", icon: "⚡", component: QuickServicesSection },
  { id: "news", label: "Latest News", icon: "📰", component: LatestNewsSection },
];

const STORAGE_KEY = "boi-section-order";
const DEFAULT_ORDER = REORDERABLE_SECTIONS.map((s) => s.id);

function getStoredOrder(): string[] {
  if (typeof window === "undefined") return DEFAULT_ORDER;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_ORDER;
    const parsed = JSON.parse(stored) as string[];
    const validIds = new Set(DEFAULT_ORDER);
    const filtered = parsed.filter((id) => validIds.has(id));
    const missing = DEFAULT_ORDER.filter((id) => !filtered.includes(id));
    return [...filtered, ...missing];
  } catch {
    return DEFAULT_ORDER;
  }
}

export function saveOrder(order: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function resetOrder() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function HomeSections() {
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrder(getStoredOrder());
    setMounted(true);
  }, []);

  // Listen for custom event from SectionReorder panel
  useEffect(() => {
    const handler = (e: CustomEvent<string[]>) => {
      setOrder(e.detail);
      saveOrder(e.detail);
    };
    window.addEventListener("boi-section-reorder", handler as EventListener);
    return () => window.removeEventListener("boi-section-reorder", handler as EventListener);
  }, []);

  // Listen for reset event
  useEffect(() => {
    const handler = () => {
      setOrder(DEFAULT_ORDER);
      resetOrder();
    };
    window.addEventListener("boi-section-reset", handler);
    return () => window.removeEventListener("boi-section-reset", handler);
  }, []);

  const sectionMap = new Map(REORDERABLE_SECTIONS.map((s) => [s.id, s]));

  return (
    <>
      {order.map((id) => {
        const section = sectionMap.get(id);
        if (!section) return null;
        const Component = section.component;
        return (
          <div
            key={id}
            id={`section-${id}`}
            style={{
              transition: mounted ? "opacity 0.3s ease" : "none",
            }}
          >
            <Component />
          </div>
        );
      })}
    </>
  );
}
