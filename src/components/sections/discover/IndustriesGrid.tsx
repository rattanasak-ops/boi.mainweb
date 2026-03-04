"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Wheat,
  Stethoscope,
  Car,
  Cpu,
  Hammer,
  FlaskConical,
  Zap,
  Monitor,
  Palette,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Industry data ── */
const industries = [
  { key: "agriculture_food", icon: Wheat, featured: true },
  { key: "digital", icon: Monitor, featured: true },
  { key: "medical", icon: Stethoscope, featured: false },
  { key: "automotive", icon: Car, featured: false },
  { key: "electronics", icon: Cpu, featured: false },
  { key: "metals", icon: Hammer, featured: false },
  { key: "chemicals", icon: FlaskConical, featured: false },
  { key: "utilities", icon: Zap, featured: false },
  { key: "creative", icon: Palette, featured: false },
  { key: "services", icon: Briefcase, featured: false },
] as const;

const featuredIndustries = industries.filter((ind) => ind.featured);
const regularIndustries = industries.filter((ind) => !ind.featured);

export default function IndustriesGrid() {
  const t = useTranslations("industries_page.grid");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-gold-100/25 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            SECTION HEADER
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 sm:mb-18"
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 tracking-tight max-w-3xl">
            {t("title")}
          </h2>
          <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* ================================================
            FEATURED INDUSTRIES — 2-column large cards (dark navy)
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {featuredIndustries.map((industry, i) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: EASE_OUT,
              }}
              className="group"
            >
              <Link href="/discover/industries">
                <div
                  className="relative p-8 sm:p-10 lg:p-12 bg-navy-950 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-navy-950/30"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-950 group-hover:from-navy-800/60 transition-all duration-500" />

                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,165,114,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top gold accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + i * 0.15,
                      ease: EASE_OUT,
                    }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 backdrop-blur-sm mb-6 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                    <industry.icon
                      className="h-7 w-7 text-gold-400 group-hover:text-gold-300 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-gold-200 transition-colors duration-300">
                    {t(`${industry.key}_name`)}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-base sm:text-lg text-white/50 leading-relaxed max-w-lg mb-8">
                    {t(`${industry.key}_desc`)}
                  </p>

                  {/* Learn more CTA */}
                  <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Bottom-right chamfered corner accent */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-8 h-[1px] bg-gold-400/40" />
                    <div className="w-[1px] h-8 bg-gold-400/40 ml-auto -mt-px" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================================================
            REGULAR INDUSTRIES — 3-column grid (or 4 on xl)
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {regularIndustries.map((industry, i) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: EASE_OUT,
              }}
              className="group"
            >
              <Link href="/discover/industries">
                <div
                  className="relative p-6 sm:p-8 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-lg hover:shadow-gold-500/[0.06] overflow-hidden h-full"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/50 group-hover:to-gold-100/30 transition-all duration-500 pointer-events-none" />

                  {/* Top gold accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.05,
                      ease: EASE_OUT,
                    }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300 mb-5">
                    <industry.icon
                      className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-lg font-bold text-navy-600 mb-2 group-hover:text-navy-950 transition-colors duration-300">
                    {t(`${industry.key}_name`)}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-sm text-text-secondary leading-relaxed line-clamp-3 mb-5">
                    {t(`${industry.key}_desc`)}
                  </p>

                  {/* Learn more */}
                  <div className="relative z-10 flex items-center gap-1.5 text-sm font-semibold text-gold-600 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
