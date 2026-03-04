"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Handshake,
  Target,
  ArrowRight,
} from "lucide-react";

/* ── Easing curves ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Service cards ── */
const services = [
  { key: "service1", icon: Users },
  { key: "service2", icon: Building2 },
  { key: "service3", icon: Handshake },
  { key: "service4", icon: Target },
] as const;

export default function MatchmakingContent() {
  const t = useTranslations("matchmaking_page.content");

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
            SERVICE CARDS — 4 cards in 2x2 grid
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
              className="group"
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
                  <service.icon
                    className="h-6 w-6 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                  {t(`${service.key}_title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-text-secondary leading-relaxed">
                  {t(`${service.key}_desc`)}
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
            CTA SECTION
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div
            className="relative p-10 sm:p-14 bg-navy-950 overflow-hidden text-center"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-navy-950 to-navy-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,165,114,0.06)_0%,transparent_60%)]" />

            {/* Top gold accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
              style={{ transformOrigin: "center" }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-gold-400 font-medium text-sm tracking-[0.2em] uppercase mb-4">
                {t("cta_eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                {t("cta_title")}
              </h2>
              <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8">
                {t("cta_description")}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-950 font-bold text-sm hover:bg-gold-400 transition-colors duration-300"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t("cta_button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Bottom corner accent */}
            <div className="absolute bottom-4 right-4 pointer-events-none">
              <div className="w-8 h-[1px] bg-gold-400/30" />
              <div className="w-[1px] h-8 bg-gold-400/30 ml-auto -mt-px" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
