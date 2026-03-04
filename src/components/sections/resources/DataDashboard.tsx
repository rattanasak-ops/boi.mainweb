"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Building2,
  Globe2,
  MapPin,
  Calendar,
  Download,
  ArrowUpRight,
  Factory,
  Users,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const STAT_ICONS = [TrendingUp, Building2, Factory, Users];

const FILTER_TABS = [
  { key: "by_industry", icon: Building2 },
  { key: "by_country", icon: Globe2 },
  { key: "by_zone", icon: MapPin },
  { key: "by_year", icon: Calendar },
] as const;

const MOCK_INDUSTRIES = [
  { key: "automotive", percent: 85 },
  { key: "electronics", percent: 72 },
  { key: "petrochemical", percent: 65 },
  { key: "digital", percent: 58 },
  { key: "agriculture", percent: 42 },
];

const MOCK_COUNTRIES = [
  { key: "japan", percent: 78 },
  { key: "china", percent: 65 },
  { key: "singapore", percent: 52 },
  { key: "usa", percent: 48 },
  { key: "south_korea", percent: 40 },
];

export default function DataDashboard() {
  const t = useTranslations("data_page.dashboard");
  const [activeFilter, setActiveFilter] = useState<string>("by_industry");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="mb-12"
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

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[1, 2, 3, 4].map((num, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <motion.div
                key={num}
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
                  className="relative bg-white border border-gold-500/20 p-6 hover:border-gold-500/40 hover:shadow-[0_16px_40px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(197,165,114,0.6), transparent)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + 0.1 * i,
                      ease: EASE_OUT,
                    }}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
                      <Icon
                        className="h-5 w-5 text-gold-500"
                        aria-hidden="true"
                      />
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight mb-1">
                    {t(`stat${num}_value`)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {t(`stat${num}_label`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div
            className="bg-white border border-border p-6 sm:p-8 lg:p-10"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeFilter === tab.key
                      ? "bg-navy-600 text-white"
                      : "bg-surface border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
                  }`}
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <tab.icon className="h-4 w-4" aria-hidden="true" />
                  {t(`filter_${tab.key}`)}
                </button>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div className="relative h-64 sm:h-80 bg-gradient-to-br from-navy-950/5 via-gold-500/5 to-transparent rounded-sm mb-10 flex items-center justify-center border border-dashed border-border">
              <div className="text-center">
                <BarChart3
                  className="h-12 w-12 text-navy-600/20 mx-auto mb-3"
                  aria-hidden="true"
                />
                <p className="text-sm text-text-secondary">
                  {t("chart_placeholder")}
                </p>
              </div>
            </div>

            {/* Top Industries & Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Top Industries */}
              <div>
                <h3 className="text-lg font-bold text-navy-600 mb-5">
                  {t("top_industries")}
                </h3>
                <div className="space-y-4">
                  {MOCK_INDUSTRIES.map((item, i) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.06 * i,
                        ease: EASE_OUT,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-navy-600">
                          {t(`industry_${item.key}`)}
                        </span>
                        <span className="text-sm font-bold text-gold-600">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-2 bg-navy-950/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(to right, #1B2A4A, #C5A572)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.3 + 0.1 * i,
                            ease: EASE_OUT,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div>
                <h3 className="text-lg font-bold text-navy-600 mb-5">
                  {t("top_countries")}
                </h3>
                <div className="space-y-4">
                  {MOCK_COUNTRIES.map((item, i) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.06 * i,
                        ease: EASE_OUT,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-navy-600">
                          {t(`country_${item.key}`)}
                        </span>
                        <span className="text-sm font-bold text-gold-600">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-2 bg-navy-950/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(to right, #C5A572, #1B2A4A)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.3 + 0.1 * i,
                            ease: EASE_OUT,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Export Button */}
        <motion.div
          className="mt-8 flex justify-end"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
        >
          <button
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-navy-600 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-300"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("export_data")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
