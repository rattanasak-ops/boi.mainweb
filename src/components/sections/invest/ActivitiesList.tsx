"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  ChevronRight,
  Shield,
  Percent,
  Package,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const FILTER_TABS = [
  { key: "all", label: "filter_all" },
  { key: "a1_plus", label: "filter_a1_plus" },
  { key: "a1", label: "filter_a1" },
  { key: "a2", label: "filter_a2" },
  { key: "a3", label: "filter_a3" },
  { key: "a4", label: "filter_a4" },
  { key: "b1", label: "filter_b1" },
  { key: "b2", label: "filter_b2" },
];

const CATEGORY_COLORS: Record<string, string> = {
  a1_plus: "bg-gold-500 text-navy-950",
  a1: "bg-navy-950 text-white",
  a2: "bg-navy-600 text-white",
  a3: "bg-blue-600 text-white",
  a4: "bg-blue-500 text-white",
  b1: "bg-emerald-600 text-white",
  b2: "bg-emerald-500 text-white",
};

const MOCK_ACTIVITIES = [
  {
    key: "act_1",
    category: "a1_plus",
    citExemption: "13",
    importDuty: true,
  },
  {
    key: "act_2",
    category: "a1",
    citExemption: "8",
    importDuty: true,
  },
  {
    key: "act_3",
    category: "a1",
    citExemption: "8",
    importDuty: true,
  },
  {
    key: "act_4",
    category: "a2",
    citExemption: "8",
    importDuty: true,
  },
  {
    key: "act_5",
    category: "a3",
    citExemption: "5",
    importDuty: true,
  },
  {
    key: "act_6",
    category: "a4",
    citExemption: "3",
    importDuty: false,
  },
  {
    key: "act_7",
    category: "b1",
    citExemption: "0",
    importDuty: true,
  },
  {
    key: "act_8",
    category: "b2",
    citExemption: "0",
    importDuty: false,
  },
];

export default function ActivitiesList() {
  const t = useTranslations("eligible_activities.list");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = MOCK_ACTIVITIES.filter((act) => {
    const matchesFilter =
      activeFilter === "all" || act.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      t(`${act.key}_name`).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            SEARCH BAR
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg text-sm text-navy-600 placeholder:text-text-secondary focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            FILTER TABS
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === tab.key
                  ? "bg-navy-950 text-white shadow-lg"
                  : "bg-white text-text-secondary border border-border hover:border-gold-300/60 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t(tab.label)}
            </button>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            ACTIVITIES TABLE/CARDS
            ══════════════════════════════════════════ */}
        {/* Table header (desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 mb-2 text-xs font-semibold text-text-secondary uppercase tracking-wider"
        >
          <div className="col-span-5">{t("col_activity")}</div>
          <div className="col-span-2 text-center">{t("col_category")}</div>
          <div className="col-span-2 text-center">{t("col_cit")}</div>
          <div className="col-span-2 text-center">{t("col_import_duty")}</div>
          <div className="col-span-1" />
        </motion.div>

        {/* Activity rows */}
        <div className="space-y-3">
          {filteredActivities.map((act, i) => (
            <motion.div
              key={act.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06] overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Top gold accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gold-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Desktop layout */}
                <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-6 py-5">
                  <div className="col-span-5">
                    <p className="text-base font-semibold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                      {t(`${act.key}_name`)}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {t(`${act.key}_desc`)}
                    </p>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wide rounded ${
                        CATEGORY_COLORS[act.category] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {act.category.replace("_", "+")}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Percent
                        className="h-4 w-4 text-gold-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-bold text-navy-600">
                        {act.citExemption === "0"
                          ? t("no_exemption")
                          : t("years_exempt", { years: act.citExemption })}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Package
                        className={`h-4 w-4 ${
                          act.importDuty ? "text-emerald-500" : "text-text-secondary"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm font-medium ${
                          act.importDuty
                            ? "text-emerald-600"
                            : "text-text-secondary"
                        }`}
                      >
                        {act.importDuty ? t("exempt") : t("not_exempt")}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <ChevronRight
                      className="h-5 w-5 text-text-secondary group-hover:text-gold-500 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-base font-semibold text-navy-600">
                      {t(`${act.key}_name`)}
                    </p>
                    <span
                      className={`flex-shrink-0 inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase rounded ${
                        CATEGORY_COLORS[act.category] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {act.category.replace("_", "+")}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">
                    {t(`${act.key}_desc`)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Shield
                        className="h-3.5 w-3.5 text-gold-500"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium text-navy-600">
                        {act.citExemption === "0"
                          ? t("no_exemption")
                          : t("cit_years", { years: act.citExemption })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package
                        className={`h-3.5 w-3.5 ${
                          act.importDuty ? "text-emerald-500" : "text-text-secondary"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-xs font-medium ${
                          act.importDuty
                            ? "text-emerald-600"
                            : "text-text-secondary"
                        }`}
                      >
                        {act.importDuty ? t("duty_exempt") : t("no_duty_exempt")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search
              className="h-12 w-12 text-text-secondary/50 mx-auto mb-4"
              aria-hidden="true"
            />
            <p className="text-lg font-semibold text-navy-600">
              {t("no_results")}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {t("no_results_desc")}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
