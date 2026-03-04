"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  Shield,
  Scale,
  FileText,
  Lightbulb,
  GraduationCap,
  Download,
  ArrowRight,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const chapters = [
  { key: "ch1", icon: Target, color: "from-blue-500 to-blue-600" },
  { key: "ch2", icon: Shield, color: "from-emerald-500 to-emerald-600" },
  { key: "ch3", icon: Scale, color: "from-purple-500 to-purple-600" },
  { key: "ch4", icon: FileText, color: "from-amber-500 to-amber-600" },
  { key: "ch5", icon: Lightbulb, color: "from-rose-500 to-rose-600" },
  { key: "ch6", icon: GraduationCap, color: "from-gold-500 to-gold-600" },
];

export default function GuideContent() {
  const t = useTranslations("guide_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ══════════════════════════════════════════
            OVERVIEW SECTION
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16 sm:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight">
                {t("title")}
              </h2>
              <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              className="flex items-end"
            >
              <div>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  {t("overview_desc")}
                </p>
                {/* Quick overview card */}
                <div
                  className="p-6 bg-white border border-border hover:border-gold-300/60 transition-all duration-300"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 flex-shrink-0">
                      <BookOpen
                        className="h-6 w-6 text-gold-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-600">
                        {t("overview_chapters")}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {t("overview_pages")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            6 CHAPTER CARDS — 2x3 Grid
            ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {chapters.map((chapter, i) => {
            const Icon = chapter.icon;
            return (
              <motion.div
                key={chapter.key}
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
                  className="relative h-full bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
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

                  <div className="relative z-10 p-8 sm:p-10">
                    {/* Chapter number + icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${chapter.color} shadow-lg`}
                      >
                        <Icon
                          className="h-7 w-7 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/[0.06] border border-navy-950/10">
                        <span className="text-sm font-bold text-navy-600">
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Chapter title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                      {t(`${chapter.key}_title`)}
                    </h3>

                    {/* Chapter description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">
                      {t(`${chapter.key}_desc`)}
                    </p>

                    {/* Read chapter link */}
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors duration-300 group/link">
                      {t("read_chapter")}
                      <ArrowRight
                        className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Bottom-right chamfered corner accent */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute bottom-3 right-3 w-6 h-[1px] bg-gold-400/50" />
                    <div className="absolute bottom-3 right-3 w-[1px] h-6 bg-gold-400/50" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════
            DOWNLOAD PDF CTA
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div
            className="relative bg-navy-950 border border-gold-500/20 overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Gold gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none" />

            {/* Top gold accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(197,165,114,0.8), rgba(212,184,150,1), rgba(197,165,114,0.8))",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
            />

            <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20 border border-gold-400/30 flex-shrink-0">
                  <BookOpen
                    className="h-8 w-8 text-gold-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {t("download_title")}
                  </h3>
                  <p className="text-sm text-white/50">
                    {t("download_desc")}
                  </p>
                </div>
              </div>

              <button
                className="flex items-center gap-2 px-8 py-4 text-sm font-bold bg-gold-500 text-navy-950 hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap group/btn"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <Download
                  className="h-5 w-5 group-hover/btn:translate-y-0.5 transition-transform duration-300"
                  aria-hidden="true"
                />
                {t("download_btn")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
