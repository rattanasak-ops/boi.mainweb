"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

const investorLogos = [
  "Google",
  "Toyota",
  "BMW",
  "BYD",
  "Samsung",
  "Foxconn",
  "Honda",
  "Huawei",
  "Microsoft",
  "NextDC",
  "Hyundai",
  "Mercedes-Benz",
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
   LOGO MARQUEE — social proof
   ══════════════════════════════════════════════════════════ */

function LogoMarquee({ t }: { t: ReturnType<typeof useTranslations> }) {
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

      <div className="relative overflow-hidden py-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-14 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...investorLogos, ...investorLogos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg sm:text-xl font-bold text-navy-200/70 hover:text-gold-500 transition-colors duration-300 tracking-wider select-none shrink-0"
            >
              {name}
            </span>
          ))}
        </motion.div>
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
