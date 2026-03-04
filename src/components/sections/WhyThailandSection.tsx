"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  animate,
} from "framer-motion";
import {
  MapPin,
  Cpu,
  BadgePercent,
  GraduationCap,
  Plane,
} from "lucide-react";
import Image from "next/image";

/* ══════════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════════ */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const advantages = [
  {
    icon: MapPin,
    titleKey: "strategic_location",
    descKey: "strategic_location_desc",
    statKey: "strategic_location_stat",
    image: "/images/why-thailand/shipping-port.jpg",
  },
  {
    icon: GraduationCap,
    titleKey: "workforce",
    descKey: "workforce_desc",
    statKey: "workforce_stat",
    image: "/images/why-thailand/digital-workforce.jpg",
  },
  {
    icon: Cpu,
    titleKey: "digital_infra",
    descKey: "digital_infra_desc",
    statKey: "digital_infra_stat",
    image: "/images/why-thailand/industrial-estate.jpg",
  },
  {
    icon: BadgePercent,
    titleKey: "incentives",
    descKey: "incentives_desc",
    statKey: "incentives_stat",
    image: "/images/why-thailand/investment-growth.jpg",
  },
  {
    icon: Plane,
    titleKey: "quality_of_life",
    descKey: "quality_of_life_desc",
    statKey: "quality_of_life_stat",
    image: "/images/why-thailand/lifestyle-livability.jpg",
  },
] as const;

const statsData = [
  { value: 33, prefix: "$", suffix: "B+", labelKey: "stats_invested_label" },
  { value: 3137, prefix: "", suffix: "", labelKey: "stats_projects_label" },
  { value: 73, prefix: "", suffix: "%", labelKey: "stats_fdi_label" },
  { value: 35, prefix: "", suffix: "%", labelKey: "stats_growth_label" },
];

interface InvestorBrand {
  name: string;
  color: string;
}

const investorBrands: InvestorBrand[] = [
  { name: "Google", color: "#4285F4" },
  { name: "Toyota", color: "#EB0A1E" },
  { name: "BMW", color: "#0066B1" },
  { name: "BYD", color: "#C41230" },
  { name: "Samsung", color: "#1428A0" },
  { name: "Foxconn", color: "#00A7E1" },
  { name: "Honda", color: "#CC0000" },
  { name: "Huawei", color: "#CF0A2C" },
  { name: "Microsoft", color: "#737373" },
  { name: "NextDC", color: "#3AA935" },
  { name: "Hyundai", color: "#002C5F" },
  { name: "Mercedes-Benz", color: "#333333" },
];

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ══════════════════════════════════════════════════════════ */

function useAnimatedCounter(
  target: number,
  isInView: boolean,
  duration = 2.5
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return count;
}

/* ══════════════════════════════════════════════════════════
   STAT COUNTER — single animated number
   ══════════════════════════════════════════════════════════ */

function StatCounter({
  value,
  prefix,
  suffix,
  label,
  delay,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useAnimatedCounter(value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className="text-center relative"
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="pt-4">
        <div
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          style={{
            fontVariantNumeric: "tabular-nums",
            background:
              "linear-gradient(135deg, var(--color-gold-500), var(--color-gold-400))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {prefix}
          {value >= 1000 ? count.toLocaleString() : count}
          {suffix}
        </div>
        <div className="mt-2 text-sm text-navy-400 font-medium tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   STATS BAR — 4 counters with glass card
   ══════════════════════════════════════════════════════════ */

function StatsBar({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-24 py-10 px-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-navy-100/60 shadow-[0_4px_40px_rgba(27,42,74,0.06)]"
    >
      {statsData.map((stat, i) => (
        <StatCounter
          key={stat.labelKey}
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          label={t(stat.labelKey)}
          delay={i * 0.1}
        />
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   3D TILT CARD — cursor-aware with spotlight & parallax
   ══════════════════════════════════════════════════════════ */

function TiltCard({
  item,
  t,
  tCommon,
  delay,
  className,
  tall,
}: {
  item: (typeof advantages)[number];
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
  delay: number;
  className?: string;
  tall?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* ── Motion values for cursor tracking ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  /* ── 3D tilt (±8 degrees) ── */
  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  /* ── Image parallax (opposite cursor direction) ── */
  const imgX = useTransform(smoothX, [0, 1], [15, -15]);
  const imgY = useTransform(smoothY, [0, 1], [15, -15]);

  /* ── Spotlight gradient follows cursor ── */
  const spotX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotY = useTransform(mouseY, [0, 1], [0, 100]);
  const spotlightBg = useMotionTemplate`radial-gradient(500px circle at ${spotX}% ${spotY}%, rgba(197,165,114,0.2), transparent 60%)`;

  /* ── Hover state for gold glow ── */
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const cardScale = useSpring(1, { stiffness: 300, damping: 30 });

  /* ── Mouse handlers ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [prefersReducedMotion, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    glowOpacity.set(1);
    cardScale.set(1.02);
  }, [glowOpacity, cardScale]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    glowOpacity.set(0);
    cardScale.set(1);
  }, [mouseX, mouseY, glowOpacity, cardScale]);

  return (
    /* Layer 1 — Grid placement (no sibling dim) */
    <motion.div className={className}>
      {/* Layer 2 — Clipping + rounded corners + gate-opening animation */}
      <motion.div
        className="h-full rounded-2xl overflow-hidden"
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 50% 0 50%)", opacity: 0 }
        }
        whileInView={
          prefersReducedMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0 0% 0 0%)", opacity: 1 }
        }
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE_OUT }}
        style={{ perspective: 1000 }}
      >
        {/* Layer 3 — 3D tilt transforms */}
        <motion.div
          ref={cardRef}
          className="group relative h-full cursor-pointer"
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            scale: cardScale,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {/* ── Full-bleed image with parallax ── */}
        <motion.div
          className="absolute inset-[-20px]"
          style={{
            x: prefersReducedMotion ? 0 : imgX,
            y: prefersReducedMotion ? 0 : imgY,
          }}
        >
          <Image
            src={item.image}
            alt={t(item.titleKey)}
            fill
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </motion.div>

        {/* ── Cursor spotlight overlay ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]"
          style={{ background: spotlightBg }}
        />

        {/* ── Subtle bottom gradient (always visible, just for text) ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[2] pointer-events-none" />

        {/* ── Gold border glow on hover ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-[3]"
          style={{
            opacity: glowOpacity,
            boxShadow:
              "inset 0 0 0 1.5px rgba(197,165,114,0.5), 0 0 30px rgba(197,165,114,0.1)",
          }}
        />

        {/* ── Golden light sweep on gate-opening entrance ── */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[4]"
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: delay + 0.3,
              ease: EASE_OUT,
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(197,165,114,0.2) 50%, transparent 100%)",
            }}
          />
        )}

        {/* ── Hero stat badge (top-right) ── */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-[5]">
          <div
            className={`
            flex items-center justify-center rounded-full
            bg-black/40 backdrop-blur-md border border-white/20
            group-hover:bg-gold-500/20 group-hover:border-gold-400/50
            transition-all duration-500
            ${tall ? "h-16 w-16 sm:h-18 sm:w-18" : "h-11 w-11 sm:h-13 sm:w-13"}
          `}
          >
            <span
              className={`font-bold text-white group-hover:text-gold-300 transition-colors ${
                tall ? "text-sm sm:text-base" : "text-xs sm:text-sm"
              }`}
            >
              {t(item.statKey)}
            </span>
          </div>
        </div>

        {/* ── Hover backdrop — frosted glass slides up, only behind text ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[4] pointer-events-none
            translate-y-full group-hover:translate-y-0
            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            height: tall ? "40%" : "50%",
            background:
              "linear-gradient(to top, rgba(27,42,74,0.92) 0%, rgba(27,42,74,0.75) 70%, transparent 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        />

        {/* ── Content overlay — bottom ── */}
        <div className={`absolute bottom-0 left-0 right-0 z-[5] ${tall ? "p-7 sm:p-9" : "p-5 sm:p-6"}`}>
          {/* Icon + Title row */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm group-hover:bg-gold-500/25 group-hover:border-gold-400/40 transition-all duration-400">
              <item.icon className="h-4 w-4 text-white/80 group-hover:text-gold-400 transition-colors duration-300" aria-hidden="true" />
            </div>
            <h3
              className={`font-bold text-white group-hover:text-gold-100 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                tall ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
              }`}
            >
              {t(item.titleKey)}
            </h3>
          </div>

          {/* Description — slides up + fades in on hover */}
          <div className="overflow-hidden">
            <p
              className={`text-white/0 leading-relaxed
                translate-y-4 group-hover:translate-y-0
                group-hover:text-white/85
                transition-all duration-500 delay-75 ease-out ${
                tall ? "text-sm sm:text-base max-w-md" : "text-xs sm:text-sm max-w-xs"
              }`}
            >
              {t(item.descKey)}
            </p>
          </div>

          {/* Learn more — hover reveal with slide */}
          <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gold-400 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-150">
            {tCommon("learn_more")}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        {/* End Layer 3 (3D tilt) */}
      </motion.div>
      {/* End Layer 2 (clipping) */}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   BRAND LOGO SVG — renders recognizable brand icons
   ══════════════════════════════════════════════════════════ */

function BrandLogoSvg({ name }: { name: string }) {
  const cls = "h-full w-auto max-w-full";

  switch (name) {
    case "Google":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      );
    case "Microsoft":
      return (
        <svg viewBox="0 0 23 23" className={cls}>
          <rect width="11" height="11" fill="#F25022"/>
          <rect x="12" width="11" height="11" fill="#7FBA00"/>
          <rect y="12" width="11" height="11" fill="#00A4EF"/>
          <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
        </svg>
      );
    case "BMW":
      return (
        <svg viewBox="0 0 48 48" className={cls}>
          <circle cx="24" cy="24" r="23" fill="#fff" stroke="#6D6E71" strokeWidth="1"/>
          <circle cx="24" cy="24" r="20" fill="#4B4F54"/>
          <path d="M24 4 A20 20 0 0 1 44 24 L24 24 Z" fill="#0066B1"/>
          <path d="M4 24 A20 20 0 0 1 24 44 L24 24 Z" fill="#0066B1"/>
          <path d="M24 4 A20 20 0 0 0 4 24 L24 24 Z" fill="#fff"/>
          <path d="M44 24 A20 20 0 0 0 24 44 L24 24 Z" fill="#fff"/>
          <circle cx="24" cy="24" r="23" fill="none" stroke="#A0A0A0" strokeWidth="1.5"/>
        </svg>
      );
    case "Toyota":
      return (
        <svg viewBox="0 0 96 64" fill="none" className={cls}>
          <ellipse cx="48" cy="32" rx="44" ry="28" stroke="#EB0A1E" strokeWidth="3.5"/>
          <ellipse cx="48" cy="38" rx="14" ry="22" stroke="#EB0A1E" strokeWidth="3.5"/>
          <ellipse cx="48" cy="22" rx="28" ry="8" stroke="#EB0A1E" strokeWidth="3.5"/>
        </svg>
      );
    case "Mercedes-Benz":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={cls}>
          <circle cx="24" cy="24" r="22" stroke="#333" strokeWidth="2.5"/>
          <circle cx="24" cy="24" r="19" stroke="#333" strokeWidth="0.8"/>
          <line x1="24" y1="24" x2="24" y2="5" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="24" x2="7.5" y2="33.5" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="24" x2="40.5" y2="33.5" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "Honda":
      return (
        <svg viewBox="0 0 44 36" fill="none" className={cls}>
          <path d="M6 2C6 2 8 2 10 6L14 18H30L34 6C36 2 38 2 38 2L32 34C32 34 30 34 30 34L28 22H16L14 34C14 34 12 34 12 34Z" fill="#CC0000"/>
        </svg>
      );
    case "Hyundai":
      return (
        <svg viewBox="0 0 48 40" fill="none" className={cls}>
          <ellipse cx="24" cy="20" rx="22" ry="18" stroke="#002C5F" strokeWidth="2.5"/>
          <path d="M13 8C13 8 15 16 24 20C33 24 35 32 35 32" stroke="#002C5F" strokeWidth="3" strokeLinecap="round"/>
          <path d="M13 32C13 32 15 24 24 20C33 16 35 8 35 8" stroke="#002C5F" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    case "Huawei":
      return (
        <svg viewBox="0 0 48 48" className={cls}>
          <g fill="#CF0A2C" transform="translate(24,24)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse key={deg} cx="0" cy="-11" rx="3.2" ry="8" transform={`rotate(${deg})`}/>
            ))}
          </g>
        </svg>
      );
    case "Samsung":
      return (
        <svg viewBox="0 0 132 28" className={cls}>
          <text x="66" y="22" textAnchor="middle" fill="#1428A0" fontSize="22" fontWeight="700" fontFamily="Arial,Helvetica,sans-serif" letterSpacing="4">SAMSUNG</text>
        </svg>
      );
    case "BYD":
      return (
        <svg viewBox="0 0 58 28" className={cls}>
          <text x="29" y="23" textAnchor="middle" fill="#C41230" fontSize="28" fontWeight="800" fontFamily="Arial,Helvetica,sans-serif" letterSpacing="3">BYD</text>
        </svg>
      );
    case "Foxconn":
      return (
        <svg viewBox="0 0 108 28" className={cls}>
          <text x="54" y="22" textAnchor="middle" fill="#00A7E1" fontSize="20" fontWeight="700" fontFamily="Arial,Helvetica,sans-serif" letterSpacing="3">Foxconn</text>
        </svg>
      );
    case "NextDC":
      return (
        <svg viewBox="0 0 94 28" className={cls}>
          <text x="47" y="22" textAnchor="middle" fill="#3AA935" fontSize="20" fontWeight="700" fontFamily="Arial,Helvetica,sans-serif" letterSpacing="2">NextDC</text>
        </svg>
      );
    default:
      return null;
  }
}

/* ══════════════════════════════════════════════════════════
   BRAND NAME ITEM — text by default, logo tooltip on hover
   ══════════════════════════════════════════════════════════ */

function BrandItem({ brand }: { brand: InvestorBrand }) {
  return (
    <div className="group/brand relative cursor-pointer select-none px-4 sm:px-6 py-3 flex-1 flex items-center justify-center min-w-0">
      <span className="text-base sm:text-lg font-bold tracking-wider transition-all duration-300 text-gray-400 group-hover/brand:opacity-0 whitespace-nowrap">
        {brand.name}
      </span>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 scale-95 group-hover/brand:opacity-100 group-hover/brand:scale-100 transition-all duration-300 ease-out z-20">
        <div
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl max-w-full"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: `0 6px 20px -4px ${brand.color}25, 0 2px 8px rgba(0,0,0,0.06)`,
            border: `1px solid ${brand.color}20`,
          }}
        >
          <div className="h-6 sm:h-7 max-w-[90px] flex items-center justify-center">
            <BrandLogoSvg name={brand.name} />
          </div>
          <span
            className="text-[8px] sm:text-[9px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap"
            style={{ color: brand.color }}
          >
            {brand.name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LOGO CAROUSEL — draggable + arrow navigation
   ══════════════════════════════════════════════════════════ */

function LogoMarquee({ t }: { t: ReturnType<typeof useTranslations> }) {
  const BRANDS_PER_SET = 4;
  const totalSets = Math.ceil(investorBrands.length / BRANDS_PER_SET);
  const [currentSet, setCurrentSet] = useState(0);

  const brandSets = useMemo(() => {
    const sets: InvestorBrand[][] = [];
    for (let i = 0; i < totalSets; i++) {
      sets.push(
        investorBrands.slice(i * BRANDS_PER_SET, (i + 1) * BRANDS_PER_SET)
      );
    }
    return sets;
  }, [totalSets]);

  const goToSet = useCallback(
    (dir: -1 | 1) => {
      setCurrentSet((prev) =>
        Math.max(0, Math.min(totalSets - 1, prev + dir))
      );
    },
    [totalSets]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="mt-16 sm:mt-20 lg:mt-24"
    >
      <p className="text-center text-sm text-navy-400 mb-8 font-medium tracking-wide">
        {t("social_proof_title")}
      </p>

      <div className="relative group/carousel">
        {/* Arrow Left */}
        <button
          onClick={() => goToSet(-1)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-navy-100/50 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gold-50 hover:border-gold-300 hover:shadow-gold-200/30 ${
            currentSet > 0
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow Right */}
        <button
          onClick={() => goToSet(1)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-navy-100/50 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gold-50 hover:border-gold-300 hover:shadow-gold-200/30 ${
            currentSet < totalSets - 1
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel track */}
        <div className="overflow-hidden px-10 sm:px-14">
          <motion.div
            className="flex"
            animate={{ x: `${currentSet * -100}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {brandSets.map((set, setIdx) => (
              <div
                key={setIdx}
                className="flex items-center justify-center w-full shrink-0 py-4"
              >
                {set.map((brand) => (
                  <BrandItem key={brand.name} brand={brand} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Set indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {brandSets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSet(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSet
                  ? "bg-navy-500 w-6"
                  : "bg-navy-200 hover:bg-navy-300 w-2"
              }`}
              aria-label={`Go to set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════ */

export default function WhyThailandSection() {
  const t = useTranslations("why_thailand");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-navy-100/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ═══ SECTION HEADER ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("title_1")}
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex items-end"
          >
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* ═══ STATS COUNTER BAR ═══ */}
        <StatsBar t={t} />

        {/* ═══ DESKTOP BENTO GRID (lg+) ═══
            ┌─────────────────────┬────────────┐
            │                     │ Workforce  │
            │  Location (hero)    ├────────────┤
            │  col-span-2         │  Digital   │
            │  row-span-2         │  Infra     │
            ├───────────┬─────────┴────────────┤
            │ Incentives│  Quality of Life     │
            │           │  col-span-2          │
            └───────────┴──────────────────────┘ */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-[280px_280px_280px] gap-5">
          <TiltCard
            item={advantages[0]}
            t={t}
            tCommon={tCommon}
            delay={0}
            className="col-span-2 row-span-2"
            tall
          />
          <TiltCard
            item={advantages[1]}
            t={t}
            tCommon={tCommon}
            delay={0.12}
          />
          <TiltCard
            item={advantages[2]}
            t={t}
            tCommon={tCommon}
            delay={0.24}
          />
          <TiltCard
            item={advantages[3]}
            t={t}
            tCommon={tCommon}
            delay={0.3}
          />
          <TiltCard
            item={advantages[4]}
            t={t}
            tCommon={tCommon}
            delay={0.36}
            className="col-span-2"
          />
        </div>

        {/* ═══ TABLET BENTO (md only) ═══ */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          <TiltCard
            item={advantages[0]}
            t={t}
            tCommon={tCommon}
            delay={0}
            className="col-span-2 h-[400px]"
            tall
          />
          {advantages.slice(1).map((item, i) => (
            <TiltCard
              key={item.titleKey}
              item={item}
              t={t}
              tCommon={tCommon}
              delay={(i + 1) * 0.1}
              className="h-[280px]"
            />
          ))}
        </div>

        {/* ═══ MOBILE STACK ═══ */}
        <div className="flex flex-col gap-5 md:hidden">
          {advantages.map((item, i) => (
            <TiltCard
              key={item.titleKey}
              item={item}
              t={t}
              tCommon={tCommon}
              delay={i * 0.08}
              className={i === 0 ? "h-[380px]" : "h-[280px]"}
              tall={i === 0}
            />
          ))}
        </div>

        {/* ═══ LOGO MARQUEE — Social Proof ═══ */}
        <LogoMarquee t={t} />
      </div>
    </section>
  );
}
