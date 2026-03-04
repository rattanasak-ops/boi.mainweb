"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Factory,
  Building,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import NoiseGrain from "@/components/ui/NoiseGrain";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Zone types ── */
const zones = [
  {
    key: "eec",
    icon: MapPin,
    featured: true,
  },
  {
    key: "sez",
    icon: Building,
    featured: false,
  },
  {
    key: "industrial",
    icon: Factory,
    featured: false,
  },
] as const;

/* ── Stats data ── */
const zoneStats = [
  { labelKey: "zone_count", valueKey: "zone_count_value" },
  { labelKey: "province_count", valueKey: "province_count_value" },
] as const;

export default function SpecialZonesContent() {
  const t = useTranslations("special_zones.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            SECTION HEADER with stats
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("zones_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("zones_title")}
            </h2>
            <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex items-end"
          >
            <div className="flex gap-8 sm:gap-12">
              {zoneStats.map((stat, i) => (
                <div key={stat.labelKey}>
                  <motion.p
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 tracking-tight"
                    initial={{ clipPath: "inset(0 50% 0 50%)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.15,
                      ease: EASE_OUT,
                    }}
                  >
                    <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                      {t(stat.valueKey)}
                    </span>
                  </motion.p>
                  <p className="mt-1 text-sm text-text-muted font-medium uppercase tracking-wider">
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================================================
            ZONE CARDS — EEC featured large, SEZ + Industrial side
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* EEC — Featured large card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-3 group"
          >
            <div
              className="relative h-full p-8 sm:p-10 lg:p-12 bg-navy-950 overflow-hidden min-h-[420px] flex flex-col justify-between"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-navy-950 to-navy-950 group-hover:from-navy-800/50 transition-all duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(197,165,114,0.06)_0%,transparent_60%)]" />
              <NoiseGrain opacity={0.02} />

              {/* Top gold accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
                style={{ transformOrigin: "left" }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 backdrop-blur-sm mb-6 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                  <MapPin
                    className="h-7 w-7 text-gold-400 group-hover:text-gold-300 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-gold-200 transition-colors duration-300">
                  {t("eec_title")}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg mb-8">
                  {t("eec_desc")}
                </p>
              </div>

              {/* Benefits list */}
              <div className="relative z-10">
                <div className="flex flex-wrap gap-3">
                  {t("eec_benefits")
                    .split(",")
                    .map((benefit, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + i * 0.08,
                          ease: EASE_OUT,
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/[0.06] border border-white/10 text-white/60 text-sm backdrop-blur-sm hover:bg-gold-500/10 hover:border-gold-400/30 hover:text-gold-300 transition-all duration-300"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                        }}
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-gold-400/70" aria-hidden="true" />
                        {benefit.trim()}
                      </motion.span>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors duration-300">
                  <span>Explore EEC</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom corner accent */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-8 h-[1px] bg-gold-400/40" />
                <div className="w-[1px] h-8 bg-gold-400/40 ml-auto -mt-px" />
              </div>
            </div>
          </motion.div>

          {/* SEZ + Industrial — 2 stacked cards (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
            {zones
              .filter((z) => !z.featured)
              .map((zone, i) => (
                <motion.div
                  key={zone.key}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.15,
                    ease: EASE_OUT,
                  }}
                  className="group flex-1"
                >
                  <div
                    className="relative h-full p-7 sm:p-8 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/50 group-hover:to-gold-100/30 transition-all duration-500 pointer-events-none" />

                    {/* Top gold accent */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3 + i * 0.1,
                        ease: EASE_OUT,
                      }}
                      style={{ transformOrigin: "left" }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300 mb-5">
                      <zone.icon
                        className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                      {t(`${zone.key}_title`)}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                      {t(`${zone.key}_desc`)}
                    </p>

                    {/* Benefits tags */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {t(`${zone.key}_benefits`)
                        .split(",")
                        .map((benefit, j) => (
                          <span
                            key={j}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy-950/[0.04] border border-navy-950/[0.08] text-text-secondary text-xs font-medium hover:bg-gold-50 hover:border-gold-300/40 hover:text-gold-700 transition-all duration-300"
                            style={{
                              clipPath:
                                "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)",
                            }}
                          >
                            <CheckCircle className="h-3 w-3 text-gold-500/60" aria-hidden="true" />
                            {benefit.trim()}
                          </span>
                        ))}
                    </div>

                    {/* Bottom corner accent */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-5 h-[1px] bg-gold-400/40" />
                      <div className="w-[1px] h-5 bg-gold-400/40 ml-auto -mt-px" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
