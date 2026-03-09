"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  GripVertical,
  Check,
  RotateCcw,
  Lock,
  Monitor,
  Smartphone,
  Sparkles,
  ChevronDown,
  Layers,
  Palette,
  Zap,
} from "lucide-react";
import {
  SECTION_REGISTRY,
  REORDERABLE_SECTION_IDS,
  type SectionId,
  type VariantId,
} from "@/config/section-registry";
import {
  SECTION_CONFIG_STORAGE_KEY,
  getEffectiveSectionConfig,
  type CustomSectionConfig,
} from "@/config/template-presets";
import {
  SITE_TEMPLATE_STORAGE_KEY,
  DEFAULT_SITE_TEMPLATE,
  SITE_TEMPLATES,
} from "@/config/site-templates";

/* ─────────────── CSS Wireframe Thumbnails ─────────────── */

function VariantThumb({
  sectionId,
  variantId,
  isActive,
}: {
  sectionId: SectionId;
  variantId: VariantId;
  isActive: boolean;
}) {
  const color = isActive ? "rgba(245,158,11,0.7)" : "rgba(255,255,255,0.15)";
  const faint = isActive ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)";
  const key = `${sectionId}-${variantId}`;

  const wireframes: Record<string, React.ReactNode> = {
    // ── Hero ──
    "hero-v1": (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
        <div className="w-full h-full rounded" style={{ background: faint }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div className="w-10 h-1.5 rounded-full" style={{ background: color }} />
          <div className="w-14 h-1 rounded-full" style={{ background: faint }} />
          <div className="w-8 h-2 rounded mt-1" style={{ background: color }} />
        </div>
      </div>
    ),
    "hero-v2": (
      <div className="w-full h-full flex gap-1 p-2">
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div className="w-10 h-1.5 rounded-full" style={{ background: color }} />
          <div className="w-8 h-1 rounded-full" style={{ background: faint }} />
          <div className="w-6 h-2 rounded mt-1" style={{ background: color }} />
        </div>
        <div className="w-[45%] rounded" style={{ background: faint }} />
      </div>
    ),
    "hero-v3": (
      <div className="w-full h-full flex items-center justify-center gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 h-full rounded flex flex-col items-center justify-end p-1 gap-0.5"
            style={{ background: i === 1 ? color : faint, opacity: i === 1 ? 0.6 : 1 }}
          >
            <div className="w-full h-0.5 rounded-full" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),
    "hero-v4": (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2"
        style={{ background: `linear-gradient(135deg, ${faint}, transparent)` }}>
        <div className="w-12 h-1.5 rounded-full" style={{ background: color }} />
        <div className="w-8 h-1 rounded-full" style={{ background: faint }} />
      </div>
    ),

    // ── Stats ──
    "stats-v1": (
      <div className="w-full h-full flex items-center justify-center gap-1.5 p-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-[70%] rounded flex flex-col items-center justify-center gap-0.5" style={{ background: faint }}>
            <div className="w-3 h-2 rounded-sm" style={{ background: color }} />
            <div className="w-4 h-0.5 rounded-full" style={{ background: faint }} />
          </div>
        ))}
      </div>
    ),
    "stats-v2": (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
        <div className="w-full h-1 rounded-full overflow-hidden flex">
          <div className="w-1/3 h-full" style={{ background: color }} />
          <div className="w-1/4 h-full" style={{ background: faint }} />
          <div className="flex-1 h-full" style={{ background: `${color}40` }} />
        </div>
        <div className="w-full flex justify-between">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 h-1 rounded-full" style={{ background: color }} />
          ))}
        </div>
      </div>
    ),
    "stats-v3": (
      <div className="w-full h-full flex gap-1 p-2">
        <div className="w-[40%] h-full rounded flex items-center justify-center" style={{ background: faint }}>
          <div className="w-6 h-6 rounded" style={{ background: `${color}40`, border: `1px solid ${color}` }} />
        </div>
        <div className="flex-1 flex flex-col gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-3 h-1.5 rounded-sm" style={{ background: color }} />
              <div className="flex-1 h-0.5 rounded-full" style={{ background: faint }} />
            </div>
          ))}
        </div>
      </div>
    ),
    "stats-v4": (
      <div className="w-full h-full flex items-center gap-2 p-2 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="shrink-0 flex items-center gap-0.5">
            <div className="w-1 h-1 rounded-full" style={{ background: i % 2 === 0 ? color : "rgba(239,68,68,0.5)" }} />
            <div className="w-4 h-1 rounded-full" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),

    // ── Why Thailand ──
    "why-thailand-v1": (
      <div className="w-full h-full grid grid-cols-3 gap-1 p-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded flex flex-col items-center justify-center gap-0.5" style={{ background: faint }}>
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <div className="w-4 h-0.5 rounded-full" style={{ background: faint }} />
          </div>
        ))}
      </div>
    ),
    "why-thailand-v2": (
      <div className="w-full h-full flex flex-col items-center gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color, opacity: 1 - i * 0.2 }} />
            <div className="flex-1 h-0.5 rounded-full" style={{ background: faint }} />
          </div>
        ))}
      </div>
    ),
    "why-thailand-v3": (
      <div className="w-full h-full flex gap-1 p-2">
        <div className="w-[30%] flex flex-col gap-0.5 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2 rounded" style={{ background: i === 0 ? color : faint }} />
          ))}
        </div>
        <div className="flex-1 rounded" style={{ background: faint }} />
      </div>
    ),
    "why-thailand-v4": (
      <div className="w-full h-full flex flex-col gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-full rounded flex items-center gap-1 px-1" style={{ background: faint, height: i === 0 ? "40%" : "20%" }}>
            <div className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: color }} />
            <div className="flex-1 h-0.5 rounded-full" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),

    // ── Services ──
    "services-v1": (
      <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-1 p-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded flex items-center justify-center" style={{ background: faint }}>
            <div className="w-2.5 h-2.5 rounded" style={{ background: `${color}60` }} />
          </div>
        ))}
      </div>
    ),
    "services-v2": (
      <div className="w-full h-full flex flex-col gap-1 p-2 justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: color }} />
            <div className="flex-1 h-0.5 rounded-full" style={{ background: faint }} />
            <div className="w-3 h-0.5 rounded-full shrink-0" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),
    "services-v3": (
      <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-1 p-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded relative overflow-hidden" style={{ background: faint }}>
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: `${color}30` }} />
          </div>
        ))}
      </div>
    ),
    "services-v4": (
      <div className="w-full h-full flex items-center gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[80%] rounded flex-1 flex flex-col items-center justify-center gap-0.5"
            style={{ background: faint, transform: i === 1 ? "scale(1.05)" : "scale(0.95)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: `${color}50` }} />
            <div className="w-4 h-0.5 rounded-full" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),

    // ── News ──
    "news-v1": (
      <div className="w-full h-full grid grid-cols-3 gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded flex flex-col gap-0.5 overflow-hidden" style={{ background: faint }}>
            <div className="w-full h-[50%]" style={{ background: `${color}30` }} />
            <div className="px-0.5">
              <div className="w-full h-0.5 rounded-full" style={{ background: color }} />
              <div className="w-3/4 h-0.5 rounded-full mt-0.5" style={{ background: faint }} />
            </div>
          </div>
        ))}
      </div>
    ),
    "news-v2": (
      <div className="w-full h-full flex gap-1 p-2">
        <div className="w-[50%] rounded overflow-hidden" style={{ background: faint }}>
          <div className="w-full h-[60%]" style={{ background: `${color}30` }} />
          <div className="p-0.5">
            <div className="w-full h-0.5 rounded-full" style={{ background: color }} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 rounded flex items-center gap-0.5 px-0.5" style={{ background: faint }}>
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: `${color}30` }} />
              <div className="flex-1 h-0.5 rounded-full" style={{ background: color }} />
            </div>
          ))}
        </div>
      </div>
    ),
    "news-v3": (
      <div className="w-full h-full flex flex-col gap-1 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-full flex items-center gap-1">
            <div className="w-1 h-full rounded-full shrink-0" style={{ background: color }} />
            <div className="flex-1">
              <div className="w-full h-0.5 rounded-full" style={{ background: color }} />
              <div className="w-3/4 h-0.5 rounded-full mt-0.5" style={{ background: faint }} />
            </div>
          </div>
        ))}
      </div>
    ),
    "news-v4": (
      <div className="w-full h-full flex flex-col gap-1 p-2 justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-full flex items-center gap-1">
            <div className="w-4 h-0.5 rounded-full shrink-0" style={{ background: faint }} />
            <div className="flex-1 h-0.5 rounded-full" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),

    // ── CTA ──
    "cta-v1": (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2"
        style={{ background: `linear-gradient(135deg, ${faint}, ${color}20)` }}>
        <div className="w-12 h-1.5 rounded-full" style={{ background: color }} />
        <div className="w-8 h-2 rounded" style={{ background: color }} />
      </div>
    ),
    "cta-v2": (
      <div className="w-full h-full flex gap-1 p-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 rounded flex flex-col items-center justify-center gap-0.5" style={{ background: faint }}>
            <div className="w-3 h-3 rounded-full" style={{ background: `${color}40` }} />
            <div className="w-6 h-0.5 rounded-full" style={{ background: color }} />
            <div className="w-4 h-1.5 rounded mt-0.5" style={{ background: color }} />
          </div>
        ))}
      </div>
    ),
    "cta-v3": (
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="w-[80%] h-[80%] rounded-lg flex flex-col items-center justify-center gap-1"
          style={{ background: faint, boxShadow: `0 2px 8px ${color}30` }}>
          <div className="w-10 h-1 rounded-full" style={{ background: color }} />
          <div className="w-6 h-2 rounded" style={{ background: color }} />
        </div>
      </div>
    ),
    "cta-v4": (
      <div className="w-full h-full flex items-center justify-between gap-2 p-2">
        <div className="flex-1">
          <div className="w-full h-1 rounded-full" style={{ background: color }} />
          <div className="w-3/4 h-0.5 rounded-full mt-0.5" style={{ background: faint }} />
        </div>
        <div className="w-8 h-3 rounded shrink-0" style={{ background: color }} />
      </div>
    ),
  };

  return (
    <div className="w-full h-12 relative rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      {wireframes[key] ?? (
        <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ color }}>
          {variantId.toUpperCase()}
        </div>
      )}
    </div>
  );
}

/* ─────────────── Section Icon Map ─────────────── */
const SECTION_ICONS: Record<SectionId, string> = {
  hero: "🏠",
  stats: "📊",
  "why-thailand": "🌏",
  services: "⚡",
  news: "📰",
  cta: "📞",
};

/* ─────────────── Main Page ─────────────── */

export default function AdminSectionsPage() {
  const [templateId, setTemplateId] = useState(DEFAULT_SITE_TEMPLATE);
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<SectionId[]>([...REORDERABLE_SECTION_IDS]);
  const [toast, setToast] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [expandedSection, setExpandedSection] = useState<SectionId | null>(null);
  const [changeCount, setChangeCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Section data lookup — used by handlers below
  const sectionMap = new Map(SECTION_REGISTRY.map((s) => [s.id, s]));
  const heroSection = sectionMap.get("hero")!;
  const ctaSection = sectionMap.get("cta")!;

  // Load config from localStorage
  useEffect(() => {
    const tmpl = localStorage.getItem(SITE_TEMPLATE_STORAGE_KEY) ?? DEFAULT_SITE_TEMPLATE;
    setTemplateId(tmpl);
    const raw = localStorage.getItem(SECTION_CONFIG_STORAGE_KEY);
    const custom = raw ? (() => { try { return JSON.parse(raw) as CustomSectionConfig; } catch { return null; } })() : null;
    const effective = getEffectiveSectionConfig(tmpl, custom);
    setVariants(effective.variants);
    setOrder(effective.order);
  }, []);

  // Send update to preview iframe
  const sendToPreview = useCallback(
    (newVariants: Record<string, string>, newOrder: SectionId[], scrollTo?: SectionId) => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "boi-preview-update", variants: newVariants, order: newOrder, scrollTo },
        "*"
      );
    },
    []
  );

  // Tell preview iframe to scroll to a section and highlight it
  const scrollPreviewTo = useCallback(
    (sectionId: SectionId) => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "boi-preview-scroll", sectionId },
        "*"
      );
    },
    []
  );

  // Save config
  const saveConfig = useCallback(
    (newVariants: Record<string, string>, newOrder: SectionId[], scrollTo?: SectionId) => {
      const config: CustomSectionConfig = { variants: newVariants, order: newOrder };
      localStorage.setItem(SECTION_CONFIG_STORAGE_KEY, JSON.stringify(config));
      sendToPreview(newVariants, newOrder, scrollTo);
      setChangeCount((c) => c + 1);
    },
    [sendToPreview]
  );

  // Variant change
  const handleVariantChange = useCallback(
    (sectionId: SectionId, variantId: VariantId) => {
      const newVariants = { ...variants, [sectionId]: variantId };
      setVariants(newVariants);
      saveConfig(newVariants, order, sectionId);
      const sectionDef = sectionMap.get(sectionId);
      const variantMeta = sectionDef?.variants.find((v) => v.id === variantId);
      setToast(`✅ ${sectionDef?.name.th ?? sectionId} → ${variantMeta?.name.th ?? variantId}`);
      setTimeout(() => setToast(null), 2000);
    },
    [variants, order, saveConfig, sectionMap]
  );

  // Template quick-switch
  const handleTemplateSwitch = useCallback(
    (tmplId: string) => {
      setTemplateId(tmplId);
      localStorage.setItem(SITE_TEMPLATE_STORAGE_KEY, tmplId);
      localStorage.removeItem(SECTION_CONFIG_STORAGE_KEY);
      const effective = getEffectiveSectionConfig(tmplId, null);
      setVariants(effective.variants);
      setOrder(effective.order);
      sendToPreview(effective.variants, effective.order);
      setChangeCount(0);
      setToast(`เปลี่ยนเป็น ${SITE_TEMPLATES.find((t) => t.id === tmplId)?.name.th ?? tmplId}`);
      setTimeout(() => setToast(null), 2000);
    },
    [sendToPreview]
  );

  // Reset
  const handleReset = useCallback(() => {
    localStorage.removeItem(SECTION_CONFIG_STORAGE_KEY);
    const effective = getEffectiveSectionConfig(templateId, null);
    setVariants(effective.variants);
    setOrder(effective.order);
    sendToPreview(effective.variants, effective.order);
    setChangeCount(0);
    setToast("รีเซ็ตเรียบร้อย");
    setTimeout(() => setToast(null), 1500);
  }, [templateId, sendToPreview]);

  // Reorder
  const handleReorder = useCallback(
    (newOrder: SectionId[]) => {
      setOrder(newOrder);
      saveConfig(variants, newOrder);
    },
    [variants, saveConfig]
  );

  return (
    <div className="-m-8 flex h-[calc(100vh-64px)]">
      {/* ══════ Left Panel — Controls ══════ */}
      <div className="w-[440px] shrink-0 border-r border-white/[0.06] flex flex-col bg-[#0A0F1E]/50 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">จัดการ Section</h1>
                <p className="text-[11px] text-white/30">เลือก Variant & จัดลำดับ</p>
              </div>
            </div>
            {changeCount > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-400/70 hover:text-amber-400 border border-amber-500/20 hover:border-amber-500/40 rounded-lg transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                รีเซ็ต
                <span className="ml-1 w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center">
                  {changeCount}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Template Quick Switch */}
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2.5">
            <Palette className="w-3.5 h-3.5 text-white/30" />
            <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
              Template
            </span>
          </div>
          <div className="flex gap-2">
            {SITE_TEMPLATES.map((tmpl) => {
              const isActive = templateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateSwitch(tmpl.id)}
                  className={`group relative flex-1 py-2 px-1.5 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "border-amber-500/40 bg-amber-500/10"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12]"
                  }`}
                  title={tmpl.name.th}
                >
                  {/* Color swatches */}
                  <div className="flex justify-center gap-0.5 mb-1.5">
                    {tmpl.previewSwatches.map((c, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-[9px] text-center font-medium truncate ${
                      isActive ? "text-amber-400" : "text-white/40 group-hover:text-white/60"
                    }`}
                  >
                    {tmpl.name.th}
                  </p>
                  {isActive && (
                    <motion.div
                      layoutId="template-active"
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center"
                    >
                      <Check className="w-2 h-2 text-white" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section List (scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="p-4 space-y-2">
            {/* ── Hero (Locked Top) ── */}
            <SectionCardAccordion
              section={heroSection}
              activeVariant={(variants.hero as VariantId) ?? "v1"}
              onVariantChange={handleVariantChange}
              locked
              expanded={expandedSection === "hero"}
              onToggle={() => {
                const next = expandedSection === "hero" ? null : "hero";
                setExpandedSection(next);
                if (next) scrollPreviewTo("hero");
              }}
            />

            {/* ── Reorderable Sections ── */}
            <div className="py-2">
              <div className="flex items-center gap-2 mb-2 px-1">
                <Zap className="w-3 h-3 text-white/20" />
                <span className="text-[10px] font-medium text-white/25 uppercase tracking-wider">
                  ลากเพื่อจัดลำดับ
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <Reorder.Group
                axis="y"
                values={order}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {order.map((sectionId) => {
                  const section = sectionMap.get(sectionId);
                  if (!section) return null;
                  return (
                    <Reorder.Item
                      key={sectionId}
                      value={sectionId}
                      className="cursor-grab active:cursor-grabbing"
                      whileDrag={{
                        scale: 1.02,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                        zIndex: 50,
                      }}
                    >
                      <SectionCardAccordion
                        section={section}
                        activeVariant={(variants[sectionId] as VariantId) ?? "v1"}
                        onVariantChange={handleVariantChange}
                        locked={false}
                        expanded={expandedSection === sectionId}
                        onToggle={() => {
                          const next = expandedSection === sectionId ? null : sectionId;
                          setExpandedSection(next);
                          if (next) scrollPreviewTo(sectionId);
                        }}
                        showGrip
                      />
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </div>

            {/* ── CTA (Locked Bottom) ── */}
            <SectionCardAccordion
              section={ctaSection}
              activeVariant={(variants.cta as VariantId) ?? "v1"}
              onVariantChange={handleVariantChange}
              locked
              expanded={expandedSection === "cta"}
              onToggle={() => {
                const next = expandedSection === "cta" ? null : "cta";
                setExpandedSection(next);
                if (next) scrollPreviewTo("cta");
              }}
            />
          </div>
        </div>
      </div>

      {/* ══════ Right Panel — Live Preview ══════ */}
      <div className="flex-1 flex flex-col bg-[#0F1629] min-w-0">
        {/* Preview toolbar */}
        <div className="h-12 px-5 flex items-center justify-between border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-500/60" />
            <span className="text-sm font-medium text-white/50">Live Preview</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Device toggle */}
            <div className="flex items-center bg-white/[0.04] rounded-lg border border-white/[0.06] p-0.5">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all ${
                  previewMode === "desktop"
                    ? "bg-white/[0.08] text-white"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all ${
                  previewMode === "mobile"
                    ? "bg-white/[0.08] text-white"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>
        </div>

        {/* Preview frame */}
        <div className="flex-1 p-4 flex items-start justify-center overflow-auto">
          <div
            className={`bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/30 transition-all duration-500 ${
              previewMode === "desktop"
                ? "w-full max-w-full h-full"
                : "w-[375px] h-[740px]"
            }`}
          >
            {/* Browser chrome */}
            <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full max-w-xs mx-auto h-4 bg-white rounded-md border border-gray-200 flex items-center px-2">
                  <span className="text-[9px] text-gray-400 truncate">
                    boi.go.th/preview
                  </span>
                </div>
              </div>
            </div>

            {/* iframe */}
            <iframe
              ref={iframeRef}
              src="/preview"
              className="w-full border-0"
              style={{ height: "calc(100% - 32px)" }}
              title="Live Preview"
            />
          </div>
        </div>
      </div>

      {/* ══════ Toast ══════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-2 px-5 py-2.5 bg-emerald-500/90 backdrop-blur-lg rounded-xl text-sm text-white font-medium shadow-xl shadow-emerald-500/20"
          >
            <Check className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── Section Card (Accordion) ─────────────── */

function SectionCardAccordion({
  section,
  activeVariant,
  onVariantChange,
  locked,
  expanded,
  onToggle,
  showGrip,
}: {
  section: (typeof SECTION_REGISTRY)[number];
  activeVariant: VariantId;
  onVariantChange: (sectionId: SectionId, variantId: VariantId) => void;
  locked: boolean;
  expanded: boolean;
  onToggle: () => void;
  showGrip?: boolean;
}) {
  const activeVariantMeta = section.variants.find((v) => v.id === activeVariant);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        expanded
          ? "bg-white/[0.04] border-white/[0.1]"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08]"
      }`}
    >
      {/* Header — click to expand */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left"
      >
        {showGrip && (
          <GripVertical className="w-3.5 h-3.5 text-white/15 shrink-0 -mr-1" />
        )}
        <span className="text-base shrink-0">
          {SECTION_ICONS[section.id as SectionId]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white truncate">
              {section.name.th}
            </span>
            {locked && (
              <Lock className="w-3 h-3 text-white/20 shrink-0" />
            )}
          </div>
          <p className="text-[10px] text-white/30 truncate">
            {activeVariantMeta?.name.th ?? "V1"}
          </p>
        </div>

        {/* Active variant mini-preview */}
        <div className="w-16 shrink-0">
          <VariantThumb
            sectionId={section.id as SectionId}
            variantId={activeVariant}
            isActive
          />
        </div>

        <ChevronDown
          className={`w-4 h-4 text-white/20 shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded — variant grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1">
              <div className="grid grid-cols-2 gap-2">
                {section.variants.map((variant) => {
                  const isActive = activeVariant === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onVariantChange(section.id as SectionId, variant.id);
                      }}
                      className={`relative text-left p-2 rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                      }`}
                    >
                      {/* Wireframe thumbnail */}
                      <VariantThumb
                        sectionId={section.id as SectionId}
                        variantId={variant.id}
                        isActive={isActive}
                      />

                      {/* Name + description */}
                      <p
                        className={`mt-1.5 text-xs font-medium truncate ${
                          isActive ? "text-amber-300" : "text-white/60"
                        }`}
                      >
                        {variant.name.th}
                      </p>
                      <p className="text-[10px] text-white/25 truncate mt-0.5">
                        {variant.description.th}
                      </p>

                      {/* Active checkmark */}
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
