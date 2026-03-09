"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Loader2,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Paintbrush,
  Sparkles,
  X,
} from "lucide-react";
import {
  SITE_TEMPLATES,
  SITE_TEMPLATE_STORAGE_KEY,
  DEFAULT_SITE_TEMPLATE,
  type SiteTemplate,
} from "@/config/site-templates";

export default function AdminTemplatesPage() {
  const [active, setActive] = useState(DEFAULT_SITE_TEMPLATE);
  const [activating, setActivating] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SITE_TEMPLATE_STORAGE_KEY);
    if (stored) setActive(stored);
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function handleActivate(templateId: string) {
    setActivating(templateId);
    try {
      const res = await fetch("/api/admin/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      if (res.ok) {
        setActive(templateId);
        localStorage.setItem(SITE_TEMPLATE_STORAGE_KEY, templateId);
        const tmpl = SITE_TEMPLATES.find((t) => t.id === templateId);
        setToast(`Activated: ${tmpl?.name.en}`);
      }
    } finally {
      setActivating(null);
    }
  }

  const previewTemplate = previewId
    ? SITE_TEMPLATES.find((t) => t.id === previewId)
    : null;

  const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Paintbrush className="w-7 h-7 text-amber-400" />
            Template Management
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Choose a template to change the entire website appearance. TOR
            4.2.11 requires 3+ templates — we provide 5.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400">
            {SITE_TEMPLATES.length} templates available
          </span>
        </div>
      </div>

      {/* Template cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {SITE_TEMPLATES.map((tmpl) => {
          const isActive = active === tmpl.id;
          const isActivating = activating === tmpl.id;

          return (
            <div
              key={tmpl.id}
              className={`group relative bg-white/[0.03] border rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] ${
                isActive
                  ? "border-amber-500/40 ring-1 ring-amber-500/20"
                  : "border-white/[0.08] hover:border-white/[0.15]"
              }`}
            >
              {/* Active badge */}
              {isActive && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-[11px] font-semibold text-white shadow-lg shadow-amber-500/30">
                  <Check className="w-3 h-3" />
                  Active
                </div>
              )}

              {/* Preview thumbnail — color blocks mockup */}
              <TemplateThumbnail template={tmpl} />

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  {/* Swatches */}
                  <div className="flex gap-1.5">
                    {tmpl.previewSwatches.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-md border border-white/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {tmpl.name.en}
                  </h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  {tmpl.description.en}
                </p>

                {/* Template details */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.06] text-white/40 uppercase tracking-wider">
                    {tmpl.heroStyle}
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.06] text-white/40 uppercase tracking-wider">
                    {tmpl.headerStyle} header
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.06] text-white/40 uppercase tracking-wider">
                    {tmpl.cardStyle} cards
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewId(tmpl.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all border border-white/[0.06]"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {isActive ? (
                    <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Check className="w-4 h-4" />
                      Active
                    </div>
                  ) : (
                    <button
                      onClick={() => handleActivate(tmpl.id)}
                      disabled={!!activating}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {isActivating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Activate"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl mx-4 bg-[#0F1629] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {previewTemplate.previewSwatches.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-md border border-white/10"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {previewTemplate.name.en} — Preview
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {/* Device toggle */}
                <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-1">
                  {(
                    [
                      { key: "desktop", icon: Monitor },
                      { key: "tablet", icon: Tablet },
                      { key: "mobile", icon: Smartphone },
                    ] as const
                  ).map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setPreviewDevice(key)}
                      className={`p-1.5 rounded-md transition-colors ${
                        previewDevice === key
                          ? "bg-white/[0.1] text-white"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPreviewId(null)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 overflow-auto p-6 flex justify-center bg-[#0A0F1E]">
              <div
                className="transition-all duration-500"
                style={{
                  width: deviceWidths[previewDevice],
                  maxWidth: "100%",
                }}
              >
                <TemplateFullPreview template={previewTemplate} />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
              <p className="text-sm text-white/30">
                Style: {previewTemplate.heroStyle} hero /{" "}
                {previewTemplate.headerStyle} header /{" "}
                {previewTemplate.cardStyle} cards
              </p>
              {active === previewTemplate.id ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Check className="w-4 h-4" />
                  Currently Active
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleActivate(previewTemplate.id);
                    setPreviewId(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
                >
                  Activate This Template
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 bg-emerald-500 text-white rounded-xl shadow-2xl shadow-emerald-500/30 animate-[slide-up_0.3s_ease-out]">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Template Thumbnail ─── */
function TemplateThumbnail({ template: t }: { template: SiteTemplate }) {
  return (
    <div
      className="relative h-[180px] overflow-hidden"
      style={{ backgroundColor: t.colors.surface }}
    >
      {/* Mini header */}
      <div
        className="h-7 flex items-center px-3 gap-1.5"
        style={{ backgroundColor: t.colors.headerBg }}
      >
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: t.colors.accent }}
        />
        <div className="flex gap-1.5 ml-2">
          {[40, 32, 36, 28].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full opacity-40"
              style={{
                width: `${w}px`,
                backgroundColor: t.colors.textPrimary,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mini hero */}
      <div
        className="mx-3 mt-2 rounded-md p-3 h-[65px] flex flex-col justify-center"
        style={{
          backgroundColor: t.colors.primary,
          borderRadius: t.cardRadius,
        }}
      >
        <div
          className="h-2 w-24 rounded-full mb-1.5"
          style={{ backgroundColor: t.colors.accent }}
        />
        <div className="h-1.5 w-36 rounded-full opacity-40 bg-white" />
      </div>

      {/* Mini cards */}
      <div className="mx-3 mt-2 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="p-2 border"
            style={{
              backgroundColor:
                t.id === "dark-executive"
                  ? t.colors.surfaceAlt
                  : t.colors.surface,
              borderColor: t.colors.border,
              borderRadius: t.cardRadius,
              boxShadow: t.shadow,
            }}
          >
            <div
              className="h-6 rounded mb-1.5"
              style={{
                backgroundColor: t.colors.accent,
                opacity: 0.15 + i * 0.1,
                borderRadius: t.borderRadius,
              }}
            />
            <div
              className="h-1 w-full rounded-full mb-1"
              style={{
                backgroundColor: t.colors.textPrimary,
                opacity: 0.25,
              }}
            />
            <div
              className="h-1 w-2/3 rounded-full"
              style={{
                backgroundColor: t.colors.textPrimary,
                opacity: 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Template Full Preview (styled mockup) ─── */
function TemplateFullPreview({ template: t }: { template: SiteTemplate }) {
  return (
    <div
      className="rounded-xl overflow-hidden border shadow-2xl"
      style={{
        backgroundColor: t.colors.surface,
        borderColor: t.colors.border,
        fontFamily: t.fontFamily,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{
          backgroundColor: t.colors.headerBg,
          borderColor: t.colors.border,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: t.colors.accent }}
          >
            B
          </div>
          <div className="flex gap-4">
            {["Discover", "Invest", "Services", "Resources", "About"].map(
              (label) => (
                <span
                  key={label}
                  className="text-xs font-medium"
                  style={{ color: t.colors.headerText }}
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-6 rounded-md text-white text-[10px] font-semibold flex items-center justify-center"
            style={{
              backgroundColor: t.colors.accent,
              borderRadius: t.buttonRadius,
            }}
          >
            Invest
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative px-8 py-12 flex flex-col items-start justify-center"
        style={{
          backgroundColor: t.colors.primary,
          minHeight: "200px",
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
        <div className="relative z-10">
          <div
            className="h-2 w-20 rounded-full mb-4"
            style={{ backgroundColor: t.colors.accent }}
          />
          <div className="h-4 w-64 rounded-full mb-2 bg-white/80" />
          <div className="h-3 w-48 rounded-full mb-6 bg-white/40" />
          <div
            className="h-8 w-28 rounded-md flex items-center justify-center text-[10px] font-semibold"
            style={{
              backgroundColor: t.colors.accent,
              color: t.colors.primary,
              borderRadius: t.buttonRadius,
            }}
          >
            Get Started
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="grid grid-cols-4 gap-px"
        style={{ backgroundColor: t.colors.border }}
      >
        {["$32.5B", "2,847", "52+", "890K"].map((stat, i) => (
          <div
            key={i}
            className="px-4 py-4 text-center"
            style={{
              backgroundColor:
                t.id === "dark-executive"
                  ? t.colors.surfaceAlt
                  : t.colors.surface,
            }}
          >
            <div
              className="text-lg font-bold"
              style={{ color: t.colors.accent }}
            >
              {stat}
            </div>
            <div
              className="text-[10px] mt-1"
              style={{ color: t.colors.textMuted }}
            >
              {
                ["Investment", "Projects", "Countries", "Jobs"][
                  i
                ]
              }
            </div>
          </div>
        ))}
      </div>

      {/* Cards section */}
      <div className="p-6">
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: t.colors.accent }}
        >
          Why Thailand
        </div>
        <div
          className="text-base font-bold mb-4"
          style={{ color: t.colors.textPrimary }}
        >
          Your Gateway to Investment
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            "Strategic Location",
            "Skilled Workforce",
            "Strong Infrastructure",
          ].map((title, i) => (
            <div
              key={i}
              className="p-4 border transition-all"
              style={{
                borderColor: t.colors.border,
                borderRadius: t.cardRadius,
                boxShadow: t.shadow,
                backgroundColor:
                  t.id === "dark-executive"
                    ? t.colors.surfaceAlt
                    : t.colors.surface,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                style={{
                  backgroundColor: t.colors.accent + "20",
                  borderRadius: t.borderRadius,
                }}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: t.colors.accent }}
                />
              </div>
              <div
                className="text-xs font-semibold mb-1"
                style={{ color: t.colors.textPrimary }}
              >
                {title}
              </div>
              <div
                className="text-[10px] leading-relaxed"
                style={{ color: t.colors.textSecondary }}
              >
                Thailand offers world-class facilities and support for
                investors.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div
        className="px-6 py-8 flex items-center justify-between"
        style={{ backgroundColor: t.colors.primary }}
      >
        <div>
          <div className="text-sm font-bold text-white">
            Ready to Start Your Investment Journey?
          </div>
          <div className="text-xs text-white/50 mt-1">
            Contact BOI for personalized consultation
          </div>
        </div>
        <div
          className="h-8 px-5 flex items-center text-[10px] font-semibold rounded-md"
          style={{
            backgroundColor: t.colors.accent,
            color: t.colors.primary,
            borderRadius: t.buttonRadius,
          }}
        >
          Book Consultation
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-6 py-4 border-t"
        style={{
          borderColor: t.colors.border,
          backgroundColor:
            t.id === "dark-executive"
              ? t.colors.surfaceAlt
              : t.colors.surface,
        }}
      >
        <div className="flex justify-between items-center">
          <div
            className="text-[10px]"
            style={{ color: t.colors.textMuted }}
          >
            BOI Thailand 2026
          </div>
          <div className="flex gap-3">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <span
                key={link}
                className="text-[10px]"
                style={{ color: t.colors.textMuted }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
