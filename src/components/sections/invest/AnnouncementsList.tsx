"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  ArrowRight,
  Landmark,
  UserCheck,
  Building,
  Layers,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const FILTER_TABS = [
  { key: "all", label: "filter_all", icon: Layers },
  { key: "board", label: "filter_board", icon: Landmark },
  { key: "secretary", label: "filter_secretary", icon: UserCheck },
  { key: "office", label: "filter_office", icon: Building },
];

const CATEGORY_COLORS: Record<string, string> = {
  board: "bg-navy-950 text-white",
  secretary: "bg-gold-500 text-navy-950",
  office: "bg-navy-600 text-white",
};

const MOCK_ANNOUNCEMENTS = [
  {
    key: "ann_1",
    category: "board",
    date: "2026-02-28",
  },
  {
    key: "ann_2",
    category: "board",
    date: "2026-02-15",
  },
  {
    key: "ann_3",
    category: "secretary",
    date: "2026-02-10",
  },
  {
    key: "ann_4",
    category: "secretary",
    date: "2026-01-25",
  },
  {
    key: "ann_5",
    category: "office",
    date: "2026-01-18",
  },
  {
    key: "ann_6",
    category: "office",
    date: "2026-01-05",
  },
];

export default function AnnouncementsList() {
  const t = useTranslations("announcements_page.list");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(
    (ann) => activeFilter === "all" || ann.category === activeFilter
  );

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* ══════════════════════════════════════════
            FILTER TABS
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTER_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === tab.key
                    ? "bg-navy-950 text-white shadow-lg"
                    : "bg-white text-text-secondary border border-border hover:border-gold-300/60 hover:text-navy-600"
                }`}
                style={{ clipPath: BRAND_SHAPE }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t(tab.label)}
              </button>
            );
          })}
        </motion.div>

        {/* ══════════════════════════════════════════
            ANNOUNCEMENTS LIST
            ══════════════════════════════════════════ */}
        <div className="space-y-4">
          {filteredAnnouncements.map((ann, i) => (
            <motion.article
              key={ann.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/40 group-hover:to-gold-100/20 transition-all duration-500 pointer-events-none" />

                {/* Top gold accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                  style={{ transformOrigin: "left" }}
                />

                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    {/* Date column */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:justify-center sm:w-20 sm:flex-shrink-0">
                      <Calendar
                        className="h-4 w-4 text-gold-500 sm:mb-1"
                        aria-hidden="true"
                      />
                      <time className="text-xs font-medium text-text-secondary">
                        {ann.date}
                      </time>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                          {t(`${ann.key}_title`)}
                        </h3>
                      </div>

                      {/* Category badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded mb-3 ${
                          CATEGORY_COLORS[ann.category] ||
                          "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {t(`cat_${ann.category}`)}
                      </span>

                      {/* Excerpt */}
                      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                        {t(`${ann.key}_excerpt`)}
                      </p>

                      {/* Read more link */}
                      <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors duration-300 group/link">
                        {t("read_more")}
                        <ArrowRight
                          className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom-right chamfered corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute bottom-3 right-3 w-6 h-[1px] bg-gold-400/50" />
                  <div className="absolute bottom-3 right-3 w-[1px] h-6 bg-gold-400/50" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
