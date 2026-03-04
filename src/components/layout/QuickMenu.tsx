"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Zap } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ═══════════════════════════════════════════════════
   ICONS — Filled+Outline Hybrid (strokeWidth 2, fill 0.22)
   ═══════════════════════════════════════════════════ */
type IconDef = { bg?: string; paths: string[]; filled?: number[] };

const ICONS: Record<string, IconDef> = {
  shield_check: {
    bg: "M12 3L4 7v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-4z",
    paths: ["M12 3L4 7v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-4z", "M9 12l2 2 4-4"],
  },
  star_badge: {
    bg: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
    paths: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"],
  },
  file_send: {
    bg: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z",
    paths: ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z", "M14 2v6h6", "M12 18v-6M9 15l3-3 3 3"],
  },
  broadcast: {
    bg: "M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0",
    paths: ["M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0", "M8.46 8.46a6 6 0 000 7.08", "M15.54 8.46a6 6 0 010 7.08", "M5.63 5.63a10 10 0 000 12.74", "M18.37 5.63a10 10 0 010 12.74"],
    filled: [0],
  },
  chart_trend: {
    bg: "M3 3v18h18",
    paths: ["M3 3v18h18", "M18 17V9M12 17V5M6 17v-4"],
  },
  book_layers: {
    bg: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z",
    paths: ["M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z", "M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"],
  },
  columns: {
    bg: "M5 21V7l7-4 7 4v14",
    paths: ["M3 21h18", "M5 21V7l7-4 7 4v14", "M9 21v-4h6v4", "M10 10h.01M14 10h.01M10 14h.01M14 14h.01"],
  },
  scale: {
    bg: "M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z",
    paths: ["M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z", "M16 12a1 1 0 100 2 1 1 0 000-2z"],
    filled: [1],
  },
  crosshair: {
    bg: "M22 12A10 10 0 112 12a10 10 0 0120 0z",
    paths: ["M22 12A10 10 0 112 12a10 10 0 0120 0z", "M18 12A6 6 0 116 12a6 6 0 0112 0z", "M14 12a2 2 0 11-4 0 2 2 0 014 0z"],
    filled: [2],
  },
  route: {
    bg: "M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z",
    paths: [
      "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z",
      "M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z",
      "M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3",
    ],
  },
  lightning: {
    bg: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    paths: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  },
  screen: {
    bg: "M2 3h20v14H2z",
    paths: ["M2 3h20v14H2z", "M8 21h8M12 17v4"],
  },
  compass_rose: {
    bg: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z",
    paths: ["M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z"],
    filled: [1],
  },
  chat_dots: {
    bg: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    paths: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", "M8 10h.01M12 10h.01M16 10h.01"],
  },
  signal: {
    bg: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z",
    paths: [
      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z",
      "M14.05 2a9 9 0 018 7.94M14.05 6A5 5 0 0118 10",
    ],
  },
};

/* ── Icon — Filled+Outline Hybrid ──
   Role 2 (Icon System Designer): fill 0.22 + stroke 2px = visual weight */
function DualIcon({ iconKey, className = "h-[18px] w-[18px]" }: { iconKey: string; className?: string }) {
  const icon = ICONS[iconKey];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {icon.bg && <path d={icon.bg} fill="currentColor" opacity="0.22" />}
      {icon.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          {...(icon.filled?.includes(i)
            ? { fill: "currentColor", opacity: 0.55 }
            : { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
          )}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   DATA — 3 sections
   ═══════════════════════════════════════════════════ */
type QuickItem = { tKey: string; href: string; icon: string };
type Section = { key: string; items: QuickItem[] };

const sections: Section[] = [
  {
    key: "invest_promote",
    items: [
      { tKey: "eligible_activities", href: "/invest/eligible-activities", icon: "shield_check" },
      { tKey: "criteria", href: "/invest/incentives", icon: "star_badge" },
      { tKey: "how_to_apply", href: "/invest/procedures", icon: "file_send" },
      { tKey: "announcement", href: "/resources/news", icon: "broadcast" },
      { tKey: "statistics", href: "/resources/data", icon: "chart_trend" },
      { tKey: "publications", href: "/resources/publications", icon: "book_layers" },
    ],
  },
  {
    key: "explore_learn",
    items: [
      { tKey: "know_boi", href: "/about/overview", icon: "columns" },
      { tKey: "cost_of_business", href: "/discover/thailand-overview", icon: "scale" },
      { tKey: "business_opportunities", href: "/discover/industries", icon: "crosshair" },
      { tKey: "how_to_do_business", href: "/invest/getting-started", icon: "route" },
    ],
  },
  {
    key: "services_support",
    items: [
      { tKey: "fastpass", href: "/services/smart-visa", icon: "lightning" },
      { tKey: "e_services", href: "/services/e-investment", icon: "screen" },
      { tKey: "boi_guide", href: "/resources/publications", icon: "compass_rose" },
      { tKey: "faq", href: "/resources/faq", icon: "chat_dots" },
      { tKey: "contact_us", href: "/about/offices", icon: "signal" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   MENU ITEM — Dense row, no icon container, gold glow hover
   Role 3 (Spacing Engineer): py-1, gap-2.5, no wrapper box
   ═══════════════════════════════════════════════════ */
function MenuItem({
  item,
  sectionKey,
  t,
  onClose,
  delay,
}: {
  item: QuickItem;
  sectionKey: string;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay, ease: EASE_OUT }}
    >
      <Link
        href={item.href}
        className="group/item relative flex items-center gap-2.5 px-2.5 py-1 rounded-lg overflow-hidden"
        onClick={onClose}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="menuitem"
        style={{
          background: hovered ? "rgba(197,165,114,0.05)" : "transparent",
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(197,165,114,0.3), 0 0 16px rgba(197,165,114,0.05)"
            : "inset 0 0 0 1px transparent",
          transition: "box-shadow 0.3s ease, background 0.3s ease",
        }}
      >
        {/* ── Icon — inline, no box wrapper ── */}
        <DualIcon
          iconKey={item.icon}
          className={`h-[18px] w-[18px] shrink-0 transition-all duration-200 ${
            hovered
              ? "text-gold-600 dark:text-gold-400 scale-110"
              : "text-navy-400 dark:text-slate-400"
          }`}
        />

        {/* ── Label ── */}
        <span
          className={`text-[13px] font-medium leading-tight transition-colors duration-200 ${
            hovered
              ? "text-gold-700 dark:text-gold-300"
              : "text-navy-600 dark:text-slate-300"
          }`}
        >
          {t(`${sectionKey}.${item.tKey}`)}
        </span>

        {/* ── Arrow ── */}
        <svg
          className={`ml-auto h-3 w-3 shrink-0 transition-all duration-200 ${
            hovered
              ? "opacity-50 translate-x-0 text-gold-500"
              : "opacity-0 -translate-x-1.5"
          }`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   QUICK MENU — v5 "Design Fundamentals First"
   Role 1 (Hierarchy): Title 15px gold > Item 13px navy
   Role 2 (Icons): Filled+Outline, stroke 2px
   Role 3 (Spacing): Dense py-1, no icon box
   Role 4 (Polish): Cursor spotlight, gold glow, frosted glass
   ═══════════════════════════════════════════════════ */
export default function QuickMenu() {
  const t = useTranslations("quick_menu");
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── Cursor-tracking gold spotlight ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 30 });
  const spotX = useTransform(smoothX, [0, 1], [0, 100]);
  const spotY = useTransform(smoothY, [0, 1], [0, 100]);
  const spotlightBg = useMotionTemplate`radial-gradient(500px circle at ${spotX}% ${spotY}%, rgba(197,165,114,0.06), transparent 55%)`;

  const handlePanelMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [prefersReduced, mouseX, mouseY]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggle = useCallback(() => setOpen((p) => !p), []);

  return (
    <>
      {/* ── Trigger ── */}
      <motion.button
        ref={buttonRef}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
          open
            ? "bg-gold-50 text-gold-600 dark:bg-gold-900/30 dark:text-gold-400"
            : "text-navy-500 hover:bg-gold-50 hover:text-gold-600 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-gold-400"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("button_label")}
      >
        <Zap className="h-4.5 w-4.5" aria-hidden="true" />
        <span className="hidden lg:inline text-sm font-medium">{t("button")}</span>
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="absolute left-0 right-0 top-full z-40"
            role="menu"
            aria-label={t("panel_label")}
            onMouseMove={handlePanelMouseMove}
          >
            {/* ── Gold accent line ── */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            />

            {/* ── Frosted glass panel ── */}
            <div className="relative bg-white/85 dark:bg-navy-900/90 backdrop-blur-2xl border-b border-navy-100/40 dark:border-navy-700/40 shadow-[0_16px_48px_-12px_rgba(27,42,74,0.12)]">

              {/* Cursor spotlight */}
              {!prefersReduced && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{ background: spotlightBg }}
                />
              )}

              {/* Noise grain */}
              <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-[0.018] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* ── Content ── */}
              <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-4">
                  {sections.map((section, si) => (
                    <motion.div
                      key={section.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: si * 0.06, ease: EASE_OUT }}
                    >
                      {/* ── Section title — 15px bold gold ──
                          Role 1 (Hierarchy): MUST be larger + more prominent than items */}
                      <div className="flex items-center gap-2.5 px-2.5 mb-1.5">
                        <motion.div
                          className="h-5 w-1 rounded-full bg-gradient-to-b from-gold-400 to-gold-600"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3, delay: si * 0.06 + 0.1, ease: EASE_OUT }}
                          style={{ transformOrigin: "top" }}
                        />
                        <h4 className="text-[15px] font-semibold text-gold-600 dark:text-gold-400">
                          {t(`${section.key}.title`)}
                        </h4>
                      </div>

                      {/* ── Items — dense ── */}
                      <div>
                        {section.items.map((item, ii) => (
                          <MenuItem
                            key={item.tKey}
                            item={item}
                            sectionKey={section.key}
                            t={t}
                            onClose={() => setOpen(false)}
                            delay={si * 0.06 + ii * 0.025}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
