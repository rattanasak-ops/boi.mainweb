"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Paintbrush,
  LayoutGrid,
  ChevronDown,
  Sparkles,
  X,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  type ColorMode,
  type Mood,
  type LayoutTemplate,
  MOOD_META,
  LAYOUT_META,
} from "@/config/themes";

const COLOR_MODE_OPTIONS: { value: ColorMode; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

const MOOD_OPTIONS = (Object.keys(MOOD_META) as Mood[]).map((key) => ({
  value: key,
  ...MOOD_META[key],
}));

const LAYOUT_OPTIONS = (Object.keys(LAYOUT_META) as LayoutTemplate[]).map(
  (key) => ({ value: key, ...LAYOUT_META[key] })
);

export default function ThemeToggle() {
  const {
    colorMode,
    mood,
    layout,
    resolvedColorMode,
    seasonalId,
    setColorMode,
    setMood,
    setLayout,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen]);

  const CurrentIcon = resolvedColorMode === "dark" ? Moon : Sun;

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-40 right-4 z-70 flex items-center justify-center h-12 w-12 bg-navy-600 text-white rounded-xl shadow-[0_8px_30px_rgba(27,42,74,0.3)] hover:bg-navy-500 transition-colors dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
        aria-label="Theme settings"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CurrentIcon className="h-5 w-5" />
        {seasonalId && (
          <span className="absolute -top-1 -right-1">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* No backdrop — user sees website change in real-time */}

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-label="Theme settings"
              className="fixed top-36 right-4 z-71 w-[320px] max-h-[calc(100vh-160px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-[0_30px_80px_rgba(27,42,74,0.25)] [html[data-theme=dark]_&]:bg-navy-800/95 [html[data-theme=dark]_&]:border-navy-700"
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <Paintbrush className="h-4.5 w-4.5 text-gold-500" />
                  <h2 className="font-bold text-sm text-navy-600 [html[data-theme=dark]_&]:text-white">
                    Theme Settings
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center h-7 w-7 text-navy-400 hover:text-navy-600 transition-colors rounded-lg [html[data-theme=dark]_&]:text-navy-300 [html[data-theme=dark]_&]:hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Color Mode */}
                <Section icon={Sun} title="Color Mode">
                  <div className="grid grid-cols-3 gap-2">
                    {COLOR_MODE_OPTIONS.map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => setColorMode(value)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                          colorMode === value
                            ? "bg-navy-600 border-navy-600 text-white"
                            : "bg-white border-border text-navy-600 hover:border-gold-500/40 [html[data-theme=dark]_&]:bg-navy-700 [html[data-theme=dark]_&]:border-navy-600 [html[data-theme=dark]_&]:text-navy-200"
                        }`}
                        aria-pressed={colorMode === value}
                      >
                        <Icon
                          className={`h-4 w-4 ${colorMode === value ? "text-gold-400" : ""}`}
                        />
                        <span className="text-[10px] font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </Section>

                <div className="h-px bg-border" />

                {/* Mood */}
                <Section icon={Paintbrush} title="Visual Mood">
                  <div className="space-y-2">
                    {MOOD_OPTIONS.map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => setMood(value)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                          mood === value
                            ? "bg-navy-600/5 border-gold-500/40"
                            : "bg-white border-border hover:border-gold-500/20 [html[data-theme=dark]_&]:bg-navy-700 [html[data-theme=dark]_&]:border-navy-600"
                        }`}
                        aria-pressed={mood === value}
                      >
                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            mood === value
                              ? "border-gold-500"
                              : "border-navy-300"
                          }`}
                        >
                          {mood === value && (
                            <div className="h-2 w-2 rounded-full bg-gold-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-navy-600 [html[data-theme=dark]_&]:text-white">
                            {label}
                          </p>
                          <p className="text-[10px] text-navy-400 mt-0.5 [html[data-theme=dark]_&]:text-navy-300">
                            {description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </Section>

                <div className="h-px bg-border" />

                {/* Layout Template */}
                <Section icon={LayoutGrid} title="Page Layout">
                  <div className="space-y-2">
                    {LAYOUT_OPTIONS.map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => setLayout(value)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                          layout === value
                            ? "bg-navy-600/5 border-gold-500/40"
                            : "bg-white border-border hover:border-gold-500/20 [html[data-theme=dark]_&]:bg-navy-700 [html[data-theme=dark]_&]:border-navy-600"
                        }`}
                        aria-pressed={layout === value}
                      >
                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            layout === value
                              ? "border-gold-500"
                              : "border-navy-300"
                          }`}
                        >
                          {layout === value && (
                            <div className="h-2 w-2 rounded-full bg-gold-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-navy-600 [html[data-theme=dark]_&]:text-white">
                            {label}
                          </p>
                          <p className="text-[10px] text-navy-400 mt-0.5 [html[data-theme=dark]_&]:text-navy-300">
                            {description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </Section>

                {/* Seasonal indicator */}
                {seasonalId && (
                  <>
                    <div className="h-px bg-border" />
                    <div className="flex items-center gap-2 p-3 bg-gold-500/10 border border-gold-500/20 rounded-xl">
                      <Sparkles className="h-4 w-4 text-gold-500 shrink-0" />
                      <p className="text-xs text-gold-700 [html[data-theme=dark]_&]:text-gold-400">
                        Seasonal theme active
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Section wrapper ---
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-3.5 w-3.5 text-gold-500" />
        <p className="text-[10px] text-navy-400 font-semibold uppercase tracking-wider [html[data-theme=dark]_&]:text-navy-300">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}
