"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

/* ── Filter categories ── */
const filters = [
  { key: "all", labelKey: "filter_all" },
  { key: "investment", labelKey: "filter_investment" },
  { key: "industry", labelKey: "filter_industry" },
  { key: "policy", labelKey: "filter_policy" },
] as const;

/* ── Mock articles data ── */
const articles = [
  {
    id: 1,
    category: "investment",
    date: "28 Feb 2026",
    titleKey: "article_1_title",
    excerptKey: "article_1_excerpt",
    gradient: "from-navy-800 via-navy-900 to-navy-950",
    featured: true,
  },
  {
    id: 2,
    category: "industry",
    date: "25 Feb 2026",
    titleKey: "article_2_title",
    excerptKey: "article_2_excerpt",
    gradient: "from-gold-600/30 via-navy-900 to-navy-950",
    featured: false,
  },
  {
    id: 3,
    category: "policy",
    date: "22 Feb 2026",
    titleKey: "article_3_title",
    excerptKey: "article_3_excerpt",
    gradient: "from-navy-700 via-navy-800 to-navy-950",
    featured: false,
  },
  {
    id: 4,
    category: "investment",
    date: "18 Feb 2026",
    titleKey: "article_4_title",
    excerptKey: "article_4_excerpt",
    gradient: "from-gold-700/20 via-navy-900 to-navy-950",
    featured: false,
  },
  {
    id: 5,
    category: "industry",
    date: "15 Feb 2026",
    titleKey: "article_5_title",
    excerptKey: "article_5_excerpt",
    gradient: "from-navy-800 via-navy-900 to-navy-950",
    featured: false,
  },
  {
    id: 6,
    category: "policy",
    date: "10 Feb 2026",
    titleKey: "article_6_title",
    excerptKey: "article_6_excerpt",
    gradient: "from-navy-700/80 via-navy-800 to-navy-950",
    featured: false,
  },
] as const;

export default function AdvertorialsList() {
  const t = useTranslations("advertorials_page.list");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

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
          className="mb-10 sm:mb-14"
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* ================================================
            FILTER TABS
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-wrap gap-3 mb-10 sm:mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-navy-950 text-gold-400 shadow-lg shadow-navy-950/20"
                  : "bg-white text-text-secondary border border-border hover:border-gold-300/60 hover:text-gold-600"
              }`}
              style={{ clipPath: BRAND_SHAPE_SM }}
            >
              {/* Active indicator glow */}
              {activeFilter === filter.key && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500"
                  layoutId="activeFilterLine"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
              {t(filter.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* ================================================
            ARTICLES GRID
            ================================================ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {featuredArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
                {/* Featured article — large card (3 cols) */}
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="lg:col-span-3 group"
                >
                  <Link href="#">
                    <div
                      className="relative h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/[0.06]"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {/* Image placeholder gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${featuredArticle.gradient} transition-all duration-700 group-hover:scale-105`}
                      />

                      {/* Decorative pattern overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 25% 25%, rgba(197,165,114,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(197,165,114,0.2) 0%, transparent 50%)",
                          }}
                        />
                      </div>

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />

                      {/* Content overlay — bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                        {/* Category badge */}
                        <span
                          className="inline-block px-4 py-1.5 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase mb-4"
                          style={{ clipPath: BRAND_SHAPE_SM }}
                        >
                          {t(`filter_${featuredArticle.category}`)}
                        </span>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug group-hover:text-gold-200 transition-colors duration-300">
                          {t(featuredArticle.titleKey)}
                        </h3>

                        {/* Excerpt */}
                        <p className="mt-3 text-base text-white/50 line-clamp-2 max-w-lg">
                          {t(featuredArticle.excerptKey)}
                        </p>

                        {/* Meta */}
                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-white/35">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {featuredArticle.date}
                          </div>

                          <span className="flex items-center gap-1.5 text-sm font-semibold text-gold-400 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            {t("read_more")}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>

                {/* Regular articles — 3-col grid in the 2-col right side */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
                  {regularArticles.slice(0, 3).map((article, i) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.1,
                        ease: EASE_OUT,
                      }}
                      className="group"
                    >
                      <Link href="#">
                        <div
                          className="flex gap-4 sm:gap-5 p-4 sm:p-5 h-full bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.04]"
                          style={{ clipPath: BRAND_SHAPE_SM }}
                        >
                          {/* Thumbnail placeholder */}
                          <div
                            className={`relative h-full min-h-[100px] w-24 sm:w-28 shrink-0 bg-gradient-to-br ${article.gradient} overflow-hidden`}
                            style={{ clipPath: BRAND_SHAPE_SM }}
                          >
                            {/* Subtle pattern */}
                            <div className="absolute inset-0 opacity-20">
                              <div
                                className="absolute inset-0"
                                style={{
                                  backgroundImage:
                                    "radial-gradient(circle at 50% 50%, rgba(197,165,114,0.4) 0%, transparent 70%)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold text-gold-600 uppercase tracking-wide">
                                  {t(`filter_${article.category}`)}
                                </span>
                              </div>
                              <h3 className="text-sm sm:text-base font-semibold text-navy-600 leading-snug line-clamp-2 group-hover:text-navy-950 transition-colors duration-300">
                                {t(article.titleKey)}
                              </h3>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                {article.date}
                              </div>
                              <span className="text-xs font-semibold text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {t("read_more")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================
                REMAINING ARTICLES — full-width 3-col grid
                ================================================ */}
            {regularArticles.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6 sm:mt-8">
                {regularArticles.slice(3).map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: EASE_OUT,
                    }}
                    className="group"
                  >
                    <Link href="#">
                      <div
                        className="relative overflow-hidden bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-lg hover:shadow-gold-500/[0.06]"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {/* Image placeholder */}
                        <div
                          className={`relative h-48 bg-gradient-to-br ${article.gradient} group-hover:scale-105 transition-transform duration-700`}
                        >
                          {/* Decorative overlay */}
                          <div className="absolute inset-0 opacity-15">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 30% 70%, rgba(197,165,114,0.4) 0%, transparent 60%)",
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />

                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span
                              className="inline-block px-3 py-1 bg-gold-500 text-navy-950 text-[10px] font-bold tracking-wide uppercase"
                              style={{ clipPath: BRAND_SHAPE_SM }}
                            >
                              {t(`filter_${article.category}`)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6">
                          <h3 className="text-base sm:text-lg font-bold text-navy-600 leading-snug line-clamp-2 group-hover:text-navy-950 transition-colors duration-300 mb-2">
                            {t(article.titleKey)}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                            {t(article.excerptKey)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {article.date}
                            </div>
                            <span className="flex items-center gap-1 text-sm font-semibold text-gold-600 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              {t("read_more")}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
