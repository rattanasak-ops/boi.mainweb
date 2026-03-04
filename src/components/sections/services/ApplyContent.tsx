"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  CheckCircle,
  LogIn,
  UserPlus,
  FileText,
  Upload,
  Search,
  ClipboardCheck,
  Send,
} from "lucide-react";

/* ── Easing curves ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Feature items ── */
const features = [
  { key: "feature1", icon: FileText },
  { key: "feature2", icon: Upload },
  { key: "feature3", icon: Search },
  { key: "feature4", icon: ClipboardCheck },
  { key: "feature5", icon: Send },
] as const;

/* ── Application steps ── */
const steps = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
  { key: "step5", number: "05" },
] as const;

export default function ApplyContent() {
  const t = useTranslations("apply_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            PORTAL DESCRIPTION + FEATURES
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 sm:mb-20">
          {/* Left — Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("portal_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight mb-6">
              {t("portal_title")}
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-6" />
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {t("portal_description")}
            </p>

            {/* Login / Register Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-950 text-white font-semibold text-sm hover:bg-navy-900 transition-colors duration-300"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {t("btn_login")}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-navy-950/20 text-navy-950 font-semibold text-sm hover:border-gold-400 hover:bg-gold-50 transition-all duration-300"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                {t("btn_register")}
              </motion.button>
            </div>
          </motion.div>

          {/* Right — 5 Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col gap-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.08,
                  ease: EASE_OUT,
                }}
                className="group flex items-start gap-4 p-5 bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06]"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300">
                  <feature.icon
                    className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                    {t(`${feature.key}_title`)}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    {t(`${feature.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================================================
            5-STEP APPLICATION GUIDE
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="text-center mb-12">
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("guide_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
              {t("guide_title")}
            </h2>
            <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: EASE_OUT,
                }}
                className="group relative"
              >
                <div
                  className="relative h-full p-6 sm:p-8 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden text-center"
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

                  {/* Step number */}
                  <p className="relative z-10 text-3xl font-bold bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent mb-3">
                    {step.number}
                  </p>

                  {/* Step title */}
                  <h3 className="relative z-10 text-base font-bold text-navy-600 mb-2 group-hover:text-navy-950 transition-colors duration-300">
                    {t(`${step.key}_title`)}
                  </h3>

                  {/* Step description */}
                  <p className="relative z-10 text-sm text-text-secondary leading-relaxed">
                    {t(`${step.key}_desc`)}
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
        </motion.div>
      </div>
    </section>
  );
}
