"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eye, Target, Lightbulb } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const pillars = [
  {
    icon: Eye,
    titleKey: "vision_title",
    descKey: "vision_desc",
    accentColor: "from-gold-400 to-gold-600",
  },
  {
    icon: Target,
    titleKey: "mission_title",
    descKey: "mission_desc",
    accentColor: "from-gold-500 to-gold-400",
  },
  {
    icon: Lightbulb,
    titleKey: "values_title",
    descKey: "values_desc",
    accentColor: "from-gold-600 to-gold-500",
  },
];

export default function VisionMissionSection() {
  const t = useTranslations("about_page.vision_mission");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      {/* Subtle gold wash */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section header */}
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

        {/* 3 Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group relative h-full bg-white border border-border hover:border-gold-500/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] p-8 sm:p-10"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Top gold accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, transparent, rgba(197,165,114,0.6) 30%, rgba(197,165,114,0.6) 70%, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.15,
                    ease: EASE_OUT,
                  }}
                />

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-6 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                  <pillar.icon
                    className="h-7 w-7 text-gold-500 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-navy-600 mb-4 group-hover:text-gold-600 transition-colors duration-300">
                  {t(pillar.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">
                  {t(pillar.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
