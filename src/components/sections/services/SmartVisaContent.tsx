"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cpu,
  Lightbulb,
  Rocket,
  GraduationCap,
  Globe,
  CheckCircle,
} from "lucide-react";

/* ── Easing curves ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Category cards ── */
const categories = [
  { key: "cat_t", icon: Cpu },
  { key: "cat_i", icon: Lightbulb },
  { key: "cat_e", icon: Rocket },
  { key: "cat_s", icon: GraduationCap },
  { key: "cat_o", icon: Globe },
] as const;

/* ── Benefits ── */
const benefits = ["benefit1", "benefit2", "benefit3", "benefit4", "benefit5"] as const;

export default function SmartVisaContent() {
  const t = useTranslations("smart_visa_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            ABOUT SECTION
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("about_eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight mb-6">
            {t("about_title")}
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-6" />
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {t("about_description")}
          </p>
        </motion.div>

        {/* ================================================
            CATEGORY CARDS — 5 cards in responsive grid
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
              className={`group ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              }`}
            >
              <div
                className="relative h-full p-8 sm:p-10 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/50 group-hover:to-gold-100/30 transition-all duration-500 pointer-events-none" />

                {/* Top gold accent */}
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
                  <cat.icon
                    className="h-6 w-6 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                  {t(`${cat.key}_title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-text-secondary leading-relaxed">
                  {t(`${cat.key}_desc`)}
                </p>

                {/* Bottom corner accent */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="w-5 h-[1px] bg-gold-400/40" />
                  <div className="w-[1px] h-5 bg-gold-400/40 ml-auto -mt-px" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================================================
            BENEFITS — 5 items
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("benefits_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
              {t("benefits_title")}
            </h2>
            <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </div>

          <div className="flex flex-col gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
                className="group flex items-start gap-4 p-5 bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06]"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/10 border border-gold-400/20 group-hover:bg-gold-500/20 transition-all duration-300">
                  <CheckCircle
                    className="h-4 w-4 text-gold-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                    {t(`${benefit}_title`)}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    {t(`${benefit}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
