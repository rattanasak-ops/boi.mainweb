"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Globe2,
  Building2,
  GraduationCap,
  Heart,
} from "lucide-react";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Feature cards data ── */
const features = [
  { icon: TrendingUp, key: "economy" },
  { icon: Globe2, key: "strategic" },
  { icon: Building2, key: "infrastructure" },
  { icon: GraduationCap, key: "workforce" },
  { icon: Heart, key: "quality" },
] as const;

/* ── Stats data ── */
const stats = [
  { labelKey: "stat_gdp", valueKey: "stat_gdp_value" },
  { labelKey: "stat_population", valueKey: "stat_population_value" },
  { labelKey: "stat_fdi", valueKey: "stat_fdi_value" },
  { labelKey: "stat_ease", valueKey: "stat_ease_value" },
] as const;

export default function ThailandOverviewContent() {
  const t = useTranslations("thailand_overview.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent — subtle gold wash */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            STATS BOXES — 4 key indicators at top
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: EASE_OUT,
              }}
              className="relative p-6 sm:p-8 bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06] group"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {/* Top gold accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />

              <p className="text-xs sm:text-sm font-medium text-text-muted uppercase tracking-wider mb-2 group-hover:text-gold-600 transition-colors duration-300">
                {t(stat.labelKey)}
              </p>

              {/* Value with gate opening reveal */}
              <motion.p
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-600 tracking-tight"
                initial={{ clipPath: "inset(0 50% 0 50%)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: EASE_OUT,
                }}
              >
                <span className="bg-gradient-to-r from-navy-600 to-navy-950 bg-clip-text text-transparent">
                  {t(stat.valueKey)}
                </span>
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================================================
            FEATURE CARDS — 5 key Thailand indicators
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
              className={`group relative ${
                /* Last card spans full width on odd count */
                i === features.length - 1 && features.length % 3 !== 0
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div
                className="relative h-full p-8 sm:p-10 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/50 group-hover:to-gold-100/30 transition-all duration-500 pointer-events-none" />

                {/* Top gold accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Icon */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300 mb-6">
                  <feature.icon
                    className="h-6 w-6 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                  {t(`${feature.key}_title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-text-secondary leading-relaxed">
                  {t(`${feature.key}_desc`)}
                </p>

                {/* Bottom-right chamfered corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute bottom-3 right-3 w-6 h-[1px] bg-gold-400/50" />
                  <div className="absolute bottom-3 right-3 w-[1px] h-6 bg-gold-400/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
