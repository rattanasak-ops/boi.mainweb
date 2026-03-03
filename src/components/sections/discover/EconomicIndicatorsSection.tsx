"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  Globe2,
  Zap,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const indicators = [
  {
    icon: DollarSign,
    target: 502,
    suffix: "B",
    prefix: "$",
    key: "gdp",
  },
  {
    icon: TrendingUp,
    target: 3.5,
    suffix: "%",
    decimals: 1,
    key: "gdp_growth",
  },
  {
    icon: BarChart3,
    target: 290,
    suffix: "B",
    prefix: "$",
    key: "exports",
  },
  {
    icon: Globe2,
    target: 18,
    suffix: "",
    key: "fta",
  },
  {
    icon: Users,
    target: 72,
    suffix: "M",
    key: "population",
  },
  {
    icon: Zap,
    target: 99.9,
    suffix: "%",
    decimals: 1,
    key: "digital_access",
  },
];

export default function EconomicIndicatorsSection() {
  const t = useTranslations("discover_page.indicators");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      {/* Gold wash */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("eyebrow")}
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

        {/* 6-card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {indicators.map((ind, i) => (
            <motion.div
              key={ind.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group relative h-full bg-white border border-border hover:border-gold-500/30 p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)]"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Gold accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(197,165,114,0.5) 30%, rgba(197,165,114,0.5) 70%, transparent)",
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                />

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5 group-hover:bg-gold-500/20 transition-all duration-300">
                  <ind.icon
                    className="h-5 w-5 text-gold-500"
                    aria-hidden="true"
                  />
                </div>

                {/* Number */}
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 tracking-tight">
                  <AnimatedCounter
                    target={ind.target}
                    prefix={ind.prefix}
                    suffix={ind.suffix}
                    duration={2.5}
                    delay={0.5 + i * 0.15}
                  />
                </p>

                {/* Label */}
                <p className="mt-2 text-sm sm:text-base font-semibold text-navy-600 group-hover:text-gold-600 transition-colors duration-300">
                  {t(`${ind.key}_label`)}
                </p>

                {/* Context */}
                <p className="mt-1 text-xs sm:text-sm text-text-muted">
                  {t(`${ind.key}_context`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
