"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Download,
  FileText,
  BookOpen,
  Tag,
  Calendar,
  ArrowRight,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const CATEGORIES = [
  "all",
  "annual_reports",
  "reviews",
  "brochures",
  "research",
] as const;

const MOCK_PUBLICATIONS = [
  {
    key: "pub_1",
    category: "annual_reports",
    pages: 128,
    date: "2025-12",
    gradient: "from-navy-600 via-navy-800 to-navy-950",
  },
  {
    key: "pub_2",
    category: "reviews",
    pages: 64,
    date: "2025-11",
    gradient: "from-gold-500 via-gold-600 to-navy-800",
  },
  {
    key: "pub_3",
    category: "brochures",
    pages: 24,
    date: "2025-10",
    gradient: "from-navy-800 via-gold-600 to-gold-400",
  },
  {
    key: "pub_4",
    category: "research",
    pages: 96,
    date: "2025-09",
    gradient: "from-navy-950 via-navy-600 to-gold-500",
  },
  {
    key: "pub_5",
    category: "annual_reports",
    pages: 142,
    date: "2025-06",
    gradient: "from-gold-600 via-navy-800 to-navy-950",
  },
  {
    key: "pub_6",
    category: "brochures",
    pages: 16,
    date: "2025-05",
    gradient: "from-navy-600 via-gold-500 to-gold-400",
  },
];

export default function PublicationsList() {
  const t = useTranslations("publications_page.list");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = MOCK_PUBLICATIONS.filter(
    (pub) => activeCategory === "all" || pub.category === activeCategory
  );

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-gold-100/20 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-navy-600 text-white"
                  : "bg-white border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t(`category_${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pub, i) => (
            <motion.div
              key={pub.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group h-full bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500 overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Cover Placeholder */}
                <div
                  className={`relative h-56 bg-gradient-to-br ${pub.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                    <BookOpen
                      className="h-10 w-10 mb-3 opacity-40"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-medium tracking-widest uppercase opacity-60">
                      {t(`category_${pub.category}`)}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-600 text-xs font-bold tracking-wide uppercase"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {t(`category_${pub.category}`)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                    {t(`${pub.key}_title`)}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-5">
                    <span className="inline-flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("pages", { count: pub.pages })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(`${pub.key}_date`)}
                    </span>
                  </div>

                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-600 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-300 w-full justify-center group/btn"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t("download")}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
