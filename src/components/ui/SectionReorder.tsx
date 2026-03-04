"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GripVertical, LayoutList, X, RotateCcw, Lock } from "lucide-react";
import { REORDERABLE_SECTIONS } from "@/components/sections/HomeSections";

const STORAGE_KEY = "boi-section-order";
const DEFAULT_ORDER = REORDERABLE_SECTIONS.map((s) => s.id);

function getStoredOrder(): string[] {
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

const sectionMap = new Map(REORDERABLE_SECTIONS.map((s) => [s.id, s]));

export default function SectionReorder() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOrder(getStoredOrder());
  }, []);

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

  const handleReorder = (newOrder: string[]) => {
    setOrder(newOrder);
    // Dispatch event for HomeSections to pick up
    window.dispatchEvent(
      new CustomEvent("boi-section-reorder", { detail: newOrder })
    );
  };

  const handleReset = () => {
    setOrder(DEFAULT_ORDER);
    window.dispatchEvent(new Event("boi-section-reset"));
  };

  const isModified = JSON.stringify(order) !== JSON.stringify(DEFAULT_ORDER);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-56 right-4 z-70 flex items-center justify-center h-12 w-12 bg-navy-600 text-white rounded-xl shadow-[0_8px_30px_rgba(27,42,74,0.3)] hover:bg-navy-500 transition-colors"
        aria-label="Customize page layout"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LayoutList className="h-5 w-5" />
        {isModified && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-gold-500 rounded-full" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Customize section order"
            className="fixed top-52 right-4 z-71 w-[300px] bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-[0_30px_80px_rgba(27,42,74,0.25)] [html[data-theme=dark]_&]:bg-navy-800/95 [html[data-theme=dark]_&]:border-navy-700"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <LayoutList className="h-4 w-4 text-gold-500" />
                <h2 className="font-bold text-sm text-navy-600 [html[data-theme=dark]_&]:text-white">
                  Customize Layout
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center h-7 w-7 text-navy-400 hover:text-navy-600 transition-colors rounded-lg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Locked: Hero */}
              <LockedItem icon="🏠" label="Hero Banner" position="Top" />

              {/* Draggable sections */}
              <Reorder.Group
                axis="y"
                values={order}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {order.map((id) => {
                  const section = sectionMap.get(id);
                  if (!section) return null;
                  return (
                    <Reorder.Item
                      key={id}
                      value={id}
                      className="flex items-center gap-3 px-3 py-2.5 bg-white border border-border rounded-xl cursor-grab active:cursor-grabbing select-none shadow-sm hover:shadow-md hover:border-gold-500/40 transition-shadow [html[data-theme=dark]_&]:bg-navy-700 [html[data-theme=dark]_&]:border-navy-600"
                      whileDrag={{
                        scale: 1.03,
                        boxShadow: "0 8px 25px rgba(27,42,74,0.2)",
                        zIndex: 50,
                      }}
                    >
                      <GripVertical className="h-4 w-4 text-navy-300 shrink-0" />
                      <span className="text-base shrink-0">{section.icon}</span>
                      <span className="text-xs font-medium text-navy-600 [html[data-theme=dark]_&]:text-white">
                        {section.label}
                      </span>
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>

              {/* Locked: CTA */}
              <LockedItem icon="📞" label="Call to Action" position="Bottom" />

              {/* Reset */}
              {isModified && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-600 transition-colors mt-2"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset to default
                </button>
              )}

              {/* Hint */}
              <p className="text-[10px] text-navy-400 [html[data-theme=dark]_&]:text-navy-300">
                Drag sections to reorder. Changes apply instantly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LockedItem({
  icon,
  label,
  position,
}: {
  icon: string;
  label: string;
  position: string;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-navy-50 border border-border rounded-xl opacity-60 [html[data-theme=dark]_&]:bg-navy-900 [html[data-theme=dark]_&]:border-navy-700">
      <Lock className="h-3.5 w-3.5 text-navy-300 shrink-0" />
      <span className="text-base shrink-0">{icon}</span>
      <span className="text-xs font-medium text-navy-500 [html[data-theme=dark]_&]:text-navy-400">
        {label}
      </span>
      <span className="ml-auto text-[9px] text-navy-300 uppercase tracking-wider">
        {position}
      </span>
    </div>
  );
}
