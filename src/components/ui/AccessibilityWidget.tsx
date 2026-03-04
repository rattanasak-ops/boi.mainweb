"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Accessibility,
  X,
  RotateCcw,
  Minus,
  Plus,
  Heading,
  Link2,
  Moon,
  Sun,
  Palette,
  Contrast,
  Droplets,
  MousePointer2,
  Volume2,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

const VOICE_MAP: Record<string, string> = {
  th: "th-TH",
  en: "en-US",
  ja: "ja-JP",
  zh: "zh-CN",
  ko: "ko-KR",
  de: "de-DE",
  fr: "fr-FR",
};

interface A11yState {
  contentSize: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highlightHeadings: boolean;
  highlightLinks: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  grayscale: boolean;
  highContrast: boolean;
  highSaturation: boolean;
  lowSaturation: boolean;
  highlightHover: boolean;
  textToSpeech: boolean;
}

const DEFAULT_STATE: A11yState = {
  contentSize: 2,
  fontSize: 2,
  lineHeight: 2,
  letterSpacing: 2,
  highlightHeadings: false,
  highlightLinks: false,
  darkContrast: false,
  lightContrast: false,
  grayscale: false,
  highContrast: false,
  highSaturation: false,
  lowSaturation: false,
  highlightHover: false,
  textToSpeech: false,
};

const SLIDER_KEYS = ["contentSize", "fontSize", "lineHeight", "letterSpacing"] as const;
const CSS_PREFIX_MAP: Record<string, string> = {
  contentSize: "a11y-content",
  fontSize: "a11y-font",
  lineHeight: "a11y-line",
  letterSpacing: "a11y-spacing",
};

const TOGGLE_CLASS_MAP: Record<string, string> = {
  highlightHeadings: "a11y-highlight-headings",
  highlightLinks: "a11y-highlight-links",
  darkContrast: "a11y-dark-contrast",
  lightContrast: "a11y-light-contrast",
  grayscale: "a11y-grayscale",
  highContrast: "a11y-high-contrast",
  highSaturation: "a11y-high-saturation",
  lowSaturation: "a11y-low-saturation",
  highlightHover: "a11y-highlight-hover",
};

function applyClasses(state: A11yState) {
  const html = document.documentElement;

  // Remove all a11y classes
  const existing = Array.from(html.classList).filter((c) => c.startsWith("a11y-"));
  existing.forEach((c) => html.classList.remove(c));

  // Apply slider classes
  for (const key of SLIDER_KEYS) {
    const val = state[key];
    if (val !== 2) {
      html.classList.add(`${CSS_PREFIX_MAP[key]}-${val}`);
    }
  }

  // Apply toggle classes
  for (const [key, cls] of Object.entries(TOGGLE_CLASS_MAP)) {
    if (state[key as keyof A11yState]) {
      html.classList.add(cls);
    }
  }
}

export default function AccessibilityWidget() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [liveMessage, setLiveMessage] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load persisted state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("a11y-preferences");
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = { ...DEFAULT_STATE, ...parsed };
        setState(merged);
        applyClasses(merged);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save and apply on state change
  useEffect(() => {
    localStorage.setItem("a11y-preferences", JSON.stringify(state));
    applyClasses(state);
  }, [state]);

  // TTS mouseup handler
  useEffect(() => {
    if (!state.textToSpeech) return;

    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (!selection) return;
      const utterance = new SpeechSynthesisUtterance(selection);
      utterance.lang = VOICE_MAP[locale] || "en-US";
      utterance.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      speechSynthesis.cancel();
    };
  }, [state.textToSpeech, locale]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const updateSlider = useCallback(
    (key: (typeof SLIDER_KEYS)[number], delta: number) => {
      setState((prev) => {
        const next = Math.max(0, Math.min(5, prev[key] + delta));
        if (next === prev[key]) return prev;
        setLiveMessage(`${t(key)}: ${next + 1}/6`);
        return { ...prev, [key]: next };
      });
    },
    [t]
  );

  const toggleFeature = useCallback(
    (key: keyof A11yState) => {
      setState((prev) => {
        const next = { ...prev };
        const newVal = !prev[key];

        // Mutual exclusion
        if (key === "darkContrast" && newVal) next.lightContrast = false;
        if (key === "lightContrast" && newVal) next.darkContrast = false;
        if (key === "highSaturation" && newVal) next.lowSaturation = false;
        if (key === "lowSaturation" && newVal) next.highSaturation = false;

        (next[key] as boolean) = newVal;
        setLiveMessage(`${t(key)}: ${newVal ? "ON" : "OFF"}`);
        return next;
      });
    },
    [t]
  );

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    speechSynthesis.cancel();
    setLiveMessage(t("reset"));
  }, [t]);

  const isModified =
    JSON.stringify(state) !== JSON.stringify(DEFAULT_STATE);

  return (
    <>
      {/* Live region for screen readers */}
      <div role="status" aria-live="polite" className="a11y-sr-only">
        {liveMessage}
      </div>

      {/* Toggle button — fixed top-right */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-4 z-70 flex items-center justify-center h-12 w-12 bg-navy-600 text-white rounded-xl shadow-[0_8px_30px_rgba(27,42,74,0.3)] hover:bg-navy-500 transition-colors"
        aria-label={t("title")}
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Accessibility className="h-5 w-5" />
        {isModified && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-gold-500 rounded-full" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-70 bg-navy-950/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel dialog */}
            <motion.div
              ref={panelRef}
              id="a11y-panel"
              role="dialog"
              aria-label={t("title")}
              aria-modal="true"
              className="a11y-panel-root fixed top-20 right-4 z-71 w-[340px] max-h-[calc(100vh-120px)] overflow-y-auto bg-white border border-border shadow-[0_30px_80px_rgba(27,42,74,0.15)]"
              style={{ clipPath: BRAND_SHAPE }}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-navy-600 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Accessibility className="h-5 w-5 text-gold-400" />
                    <div>
                      <h2 className="text-white font-bold text-sm">
                        {t("title")}
                      </h2>
                      <p className="text-white/50 text-xs">{t("subtitle")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center h-8 w-8 text-white/60 hover:text-white transition-colors rounded-lg"
                    aria-label={t("close")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Reset */}
                {isModified && (
                  <button
                    onClick={resetAll}
                    className="mt-3 flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {t("reset")}
                  </button>
                )}
              </div>

              <div className="p-5 space-y-5">
                {/* Group A — Sliders */}
                <div role="group" aria-label={t("title")}>
                  <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mb-3">
                    {t("contentSize")} / {t("fontSize")}
                  </p>

                  {SLIDER_KEYS.map((key) => (
                    <div key={key} className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-navy-600 w-28 truncate">
                        {t(key)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateSlider(key, -1)}
                          disabled={state[key] <= 0}
                          className="flex items-center justify-center h-7 w-7 border border-border text-navy-600 hover:border-gold-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
                          aria-label={`${t(key)} -`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <div className="flex gap-0.5">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 w-3 rounded-full transition-colors ${
                                i <= state[key]
                                  ? "bg-gold-500"
                                  : "bg-navy-600/10"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => updateSlider(key, 1)}
                          disabled={state[key] >= 5}
                          className="flex items-center justify-center h-7 w-7 border border-border text-navy-600 hover:border-gold-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
                          aria-label={`${t(key)} +`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border" />

                {/* Group B — Highlights */}
                <div>
                  <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mb-3">
                    {t("highlightHeadings")} / {t("highlightLinks")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToggleButton
                      icon={Heading}
                      label={t("highlightHeadings")}
                      active={state.highlightHeadings}
                      onClick={() => toggleFeature("highlightHeadings")}
                    />
                    <ToggleButton
                      icon={Link2}
                      label={t("highlightLinks")}
                      active={state.highlightLinks}
                      onClick={() => toggleFeature("highlightLinks")}
                    />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Group C — Display Modes */}
                <div>
                  <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mb-3">
                    {t("darkContrast")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToggleButton
                      icon={Moon}
                      label={t("darkContrast")}
                      active={state.darkContrast}
                      onClick={() => toggleFeature("darkContrast")}
                    />
                    <ToggleButton
                      icon={Sun}
                      label={t("lightContrast")}
                      active={state.lightContrast}
                      onClick={() => toggleFeature("lightContrast")}
                    />
                    <ToggleButton
                      icon={Palette}
                      label={t("grayscale")}
                      active={state.grayscale}
                      onClick={() => toggleFeature("grayscale")}
                    />
                    <ToggleButton
                      icon={Contrast}
                      label={t("highContrast")}
                      active={state.highContrast}
                      onClick={() => toggleFeature("highContrast")}
                    />
                    <ToggleButton
                      icon={Droplets}
                      label={t("highSaturation")}
                      active={state.highSaturation}
                      onClick={() => toggleFeature("highSaturation")}
                    />
                    <ToggleButton
                      icon={Droplets}
                      label={t("lowSaturation")}
                      active={state.lowSaturation}
                      onClick={() => toggleFeature("lowSaturation")}
                    />
                    <ToggleButton
                      icon={MousePointer2}
                      label={t("highlightHover")}
                      active={state.highlightHover}
                      onClick={() => toggleFeature("highlightHover")}
                    />
                    <ToggleButton
                      icon={Volume2}
                      label={t("textToSpeech")}
                      active={state.textToSpeech}
                      onClick={() => toggleFeature("textToSpeech")}
                    />
                  </div>
                </div>

                {/* TTS Active Indicator */}
                {state.textToSpeech && (
                  <motion.div
                    className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs text-gold-600 font-medium flex items-center gap-2">
                      <Volume2 className="h-3.5 w-3.5" />
                      {t("ttsActive")}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ToggleButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center gap-1.5 p-3 text-center border transition-all duration-200 rounded-lg ${
        active
          ? "bg-navy-600 border-navy-600 text-white"
          : "bg-white border-border text-navy-600 hover:border-gold-500/30"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-gold-400" : ""}`} aria-hidden="true" />
      <span className="text-[10px] font-medium leading-tight">{label}</span>
    </button>
  );
}
