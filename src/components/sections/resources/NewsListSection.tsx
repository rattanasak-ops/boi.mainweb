"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const CATEGORIES = [
  "all",
  "announcement",
  "policy",
  "investment",
  "event",
  "industry",
] as const;

const MOCK_NEWS = [
  {
    slug: "boi-approves-new-ev-incentives-2026",
    image: "/images/news/ev-charging.jpg",
    category: "policy",
    date: "2026-02-28",
    featured: true,
  },
  {
    slug: "digital-economy-zone-expansion",
    image: "/images/news/digital-zone.jpg",
    category: "announcement",
    date: "2026-02-25",
    featured: true,
  },
  {
    slug: "thailand-auto-manufacturing-milestone",
    image: "/images/news/auto-factory.jpg",
    category: "industry",
    date: "2026-02-20",
    featured: false,
  },
  {
    slug: "international-investment-conference-2026",
    image: "/images/news/conference.jpg",
    category: "event",
    date: "2026-02-15",
    featured: false,
  },
  {
    slug: "foreign-investment-q4-2025-report",
    image: "/images/hero/expressway-trails.jpg",
    category: "investment",
    date: "2026-02-10",
    featured: false,
  },
  {
    slug: "smart-visa-program-updates",
    image: "/images/hero/digital-network.jpg",
    category: "policy",
    date: "2026-02-05",
    featured: false,
  },
];

export default function NewsListSection() {
  const t = useTranslations("news_page.list");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = MOCK_NEWS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Search & Filter Bar */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-secondary/50" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-none text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
              style={{ clipPath: BRAND_SHAPE }}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-navy-600 text-white"
                    : "bg-white border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
                }`}
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t(`category_${cat}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Articles — 2-column hero grid */}
        {featuredNews.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {featuredNews.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: EASE_OUT,
                }}
              >
                <Link
                  href={`/resources/news/${article.slug}`}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {/* Image */}
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase"
                          style={{ clipPath: BRAND_SHAPE }}
                        >
                          <Tag className="h-3 w-3" aria-hidden="true" />
                          {t(`category_${article.category}`)}
                        </span>
                      </div>

                      {/* Featured badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-navy-950/80 backdrop-blur-sm text-gold-400 text-xs font-semibold tracking-wide uppercase border border-gold-500/20">
                          {t("featured")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                        <Calendar
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <time dateTime={article.date}>
                          {t(`articles.${article.slug}.date`)}
                        </time>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                        {t(`articles.${article.slug}.title`)}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                        {t(`articles.${article.slug}.excerpt`)}
                      </p>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                        {t("read_more")}
                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Regular Articles — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <Link
                href={`/resources/news/${article.slug}`}
                className="group block h-full"
              >
                <div
                  className="relative h-full overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-navy-600 text-xs font-semibold tracking-wide uppercase"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {t(`category_${article.category}`)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <time dateTime={article.date}>
                        {t(`articles.${article.slug}.date`)}
                      </time>
                    </div>

                    <h3 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                      {t(`articles.${article.slug}.title`)}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                      {t(`articles.${article.slug}.excerpt`)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                      {t("read_more")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        >
          <button
            className="flex items-center justify-center h-10 w-10 border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600 transition-all"
            style={{ clipPath: BRAND_SHAPE }}
            aria-label={t("prev_page")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`flex items-center justify-center h-10 w-10 text-sm font-semibold transition-all ${
                page === 1
                  ? "bg-navy-600 text-white"
                  : "border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {page}
            </button>
          ))}
          <button
            className="flex items-center justify-center h-10 w-10 border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600 transition-all"
            style={{ clipPath: BRAND_SHAPE }}
            aria-label={t("next_page")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
