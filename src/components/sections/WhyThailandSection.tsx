"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Cpu,
  BadgePercent,
  GraduationCap,
  Plane,
} from "lucide-react";
import Image from "next/image";

/* ── 5 Advantages — mapped to approved Freepik images ── */
const advantages = [
  {
    icon: MapPin,
    titleKey: "strategic_location",
    descKey: "strategic_location_desc",
    image: "/images/why-thailand/shipping-port.jpg",
  },
  {
    icon: GraduationCap,
    titleKey: "workforce",
    descKey: "workforce_desc",
    image: "/images/why-thailand/digital-workforce.jpg",
  },
  {
    icon: Cpu,
    titleKey: "digital_infra",
    descKey: "digital_infra_desc",
    image: "/images/why-thailand/industrial-estate.jpg",
  },
  {
    icon: BadgePercent,
    titleKey: "incentives",
    descKey: "incentives_desc",
    image: "/images/why-thailand/investment-growth.jpg",
  },
  {
    icon: Plane,
    titleKey: "quality_of_life",
    descKey: "quality_of_life_desc",
    image: "/images/why-thailand/lifestyle-livability.jpg",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

/* ── Card component — reusable for all bento items ── */
function BentoCard({
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      className={className}
    >
      <div
        className="group relative h-full overflow-hidden bg-navy-900"
        style={{ clipPath: BRAND_SHAPE }}
      >
        {/* Full-bleed image with zoom on hover */}
        <Image
          src={item.image}
          alt={t(item.titleKey)}
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

        {/* Editorial inset shadow */}
        <div className="absolute inset-0 shadow-[inset_0_-60px_80px_rgba(7,11,23,0.3)]" />

        {/* Content — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 backdrop-blur-sm mb-3">
            <item.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
          </div>
          <h3
            className={`font-bold text-white mb-2 group-hover:text-gold-200 transition-colors duration-300 ${
              tall ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {t(item.titleKey)}
          </h3>
          <p
            className={`text-white/60 leading-relaxed ${
              tall ? "text-base max-w-md" : "text-sm max-w-xs line-clamp-2"
            }`}
          >
            {t(item.descKey)}
          </p>

          {/* Learn more — hover reveal */}
          <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-gold-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {tCommon("learn_more")}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
      </div>
    </motion.div>
  );
}

export default function WhyThailandSection() {
  const t = useTranslations("why_thailand");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      {/* Background accent — subtle gold wash top-right */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            SECTION HEADER — Left-aligned editorial style
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20 lg:mb-28">
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

        {/* ================================================
            EEC-INSPIRED BENTO GRID
            ─────────────────────────────────────────────
            Desktop layout (3-column asymmetric):

            ┌────────────────────┬──────────┐
            │                    │ Workforce│
            │  Location (hero)   ├──────────┤
            │  spans 2 cols      │  Infra   │
            │  spans 2 rows      │          │
            ├──────────┬─────────┴──────────┤
            │Incentives│  Livability (wide) │
            │          │  spans 2 cols      │
            └──────────┴───────────────────┘

            Mobile: stacked vertically
            Tablet: 2-column simplified
            ================================================ */}

        {/* ── Desktop Bento (lg+) ── */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-[260px_260px_320px] gap-5">
          {/* Item 1 — Location (hero: col 1-2, row 1-2) */}
          <BentoCard
            item={advantages[0]}
            t={t}
            tCommon={tCommon}
            delay={0}
            className="col-span-2 row-span-2"
            tall
          />

          {/* Item 2 — Workforce (col 3, row 1) */}
          <BentoCard
            item={advantages[1]}
            t={t}
            tCommon={tCommon}
            delay={0.1}
          />

          {/* Item 3 — Infrastructure (col 3, row 2) */}
          <BentoCard
            item={advantages[2]}
            t={t}
            tCommon={tCommon}
            delay={0.2}
          />

          {/* Item 4 — Incentives (col 1, row 3) */}
          <BentoCard
            item={advantages[3]}
            t={t}
            tCommon={tCommon}
            delay={0.25}
          />

          {/* Item 5 — Livability (col 2-3, row 3) */}
          <BentoCard
            item={advantages[4]}
            t={t}
            tCommon={tCommon}
            delay={0.3}
            className="col-span-2"
          />
        </div>

        {/* ── Tablet Bento (md only) ── */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          <BentoCard
            item={advantages[0]}
            t={t}
            tCommon={tCommon}
            delay={0}
            className="col-span-2 h-[400px]"
            tall
          />
          <BentoCard
            item={advantages[1]}
            t={t}
            tCommon={tCommon}
            delay={0.1}
            className="h-[280px]"
          />
          <BentoCard
            item={advantages[2]}
            t={t}
            tCommon={tCommon}
            delay={0.15}
            className="h-[280px]"
          />
          <BentoCard
            item={advantages[3]}
            t={t}
            tCommon={tCommon}
            delay={0.2}
            className="h-[280px]"
          />
          <BentoCard
            item={advantages[4]}
            t={t}
            tCommon={tCommon}
            delay={0.25}
            className="h-[280px]"
          />
        </div>

        {/* ── Mobile Stack ── */}
        <div className="flex flex-col gap-5 md:hidden">
          {advantages.map((item, i) => (
            <BentoCard
              key={item.titleKey}
              item={item}
              t={t}
              tCommon={tCommon}
              delay={i * 0.1}
              className={i === 0 ? "h-[380px]" : "h-[280px]"}
              tall={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
