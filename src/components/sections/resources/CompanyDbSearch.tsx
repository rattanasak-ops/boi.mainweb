"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Building2,
  Globe2,
  MapPin,
  ChevronDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const MOCK_COMPANIES = [
  {
    key: "company_1",
    industry: "automotive",
    country: "japan",
    province: "rayong",
    year: "2024",
  },
  {
    key: "company_2",
    industry: "electronics",
    country: "south_korea",
    province: "chonburi",
    year: "2024",
  },
  {
    key: "company_3",
    industry: "digital",
    country: "singapore",
    province: "bangkok",
    year: "2023",
  },
  {
    key: "company_4",
    industry: "petrochemical",
    country: "usa",
    province: "rayong",
    year: "2023",
  },
  {
    key: "company_5",
    industry: "agriculture",
    country: "china",
    province: "chachoengsao",
    year: "2024",
  },
  {
    key: "company_6",
    industry: "medical",
    country: "germany",
    province: "bangkok",
    year: "2025",
  },
];

export default function CompanyDbSearch() {
  const t = useTranslations("company_db_page.search");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-gold-100/20 via-gold-50/10 to-transparent pointer-events-none" />

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

        {/* Search & Filters */}
        <motion.div
          className="bg-white border border-border p-6 sm:p-8 mb-8"
          style={{ clipPath: BRAND_SHAPE }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/50" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
              style={{ clipPath: BRAND_SHAPE }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Industry Filter */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
              <select
                className="w-full appearance-none pl-10 pr-10 py-3 bg-surface border border-border text-sm text-navy-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all cursor-pointer"
                style={{ clipPath: BRAND_SHAPE }}
                defaultValue=""
              >
                <option value="">{t("filter_industry")}</option>
                <option value="automotive">{t("ind_automotive")}</option>
                <option value="electronics">{t("ind_electronics")}</option>
                <option value="digital">{t("ind_digital")}</option>
                <option value="petrochemical">{t("ind_petrochemical")}</option>
                <option value="agriculture">{t("ind_agriculture")}</option>
                <option value="medical">{t("ind_medical")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
              <select
                className="w-full appearance-none pl-10 pr-10 py-3 bg-surface border border-border text-sm text-navy-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all cursor-pointer"
                style={{ clipPath: BRAND_SHAPE }}
                defaultValue=""
              >
                <option value="">{t("filter_country")}</option>
                <option value="japan">{t("ctry_japan")}</option>
                <option value="south_korea">{t("ctry_south_korea")}</option>
                <option value="china">{t("ctry_china")}</option>
                <option value="singapore">{t("ctry_singapore")}</option>
                <option value="usa">{t("ctry_usa")}</option>
                <option value="germany">{t("ctry_germany")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
            </div>

            {/* Province Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
              <select
                className="w-full appearance-none pl-10 pr-10 py-3 bg-surface border border-border text-sm text-navy-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all cursor-pointer"
                style={{ clipPath: BRAND_SHAPE }}
                defaultValue=""
              >
                <option value="">{t("filter_province")}</option>
                <option value="bangkok">{t("prov_bangkok")}</option>
                <option value="rayong">{t("prov_rayong")}</option>
                <option value="chonburi">{t("prov_chonburi")}</option>
                <option value="chachoengsao">{t("prov_chachoengsao")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-300"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              {t("search_btn")}
            </button>
          </div>
        </motion.div>

        {/* Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">
              {t("results_count", { count: MOCK_COMPANIES.length })}
            </p>
          </div>

          <div
            className="bg-white border border-border overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-4 bg-navy-950/[0.03] border-b border-border text-xs font-semibold text-navy-600 uppercase tracking-wider">
              <div className="col-span-3">{t("col_name")}</div>
              <div className="col-span-2">{t("col_industry")}</div>
              <div className="col-span-2">{t("col_country")}</div>
              <div className="col-span-2">{t("col_province")}</div>
              <div className="col-span-2">{t("col_year")}</div>
              <div className="col-span-1">{t("col_action")}</div>
            </div>

            {/* Table Rows */}
            {MOCK_COMPANIES.map((company, i) => (
              <motion.div
                key={company.key}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b border-border last:border-b-0 hover:bg-gold-500/[0.03] transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * i,
                  ease: EASE_OUT,
                }}
              >
                <div className="sm:col-span-3">
                  <span className="sm:hidden text-xs font-semibold text-navy-600 uppercase tracking-wider mr-2">
                    {t("col_name")}:
                  </span>
                  <span className="text-sm font-semibold text-navy-600">
                    {t(`${company.key}_name`)}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="sm:hidden text-xs font-semibold text-navy-600 uppercase tracking-wider mr-2">
                    {t("col_industry")}:
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gold-500/10 text-gold-600 border border-gold-400/20"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {t(`ind_${company.industry}`)}
                  </span>
                </div>
                <div className="sm:col-span-2 flex items-center">
                  <span className="sm:hidden text-xs font-semibold text-navy-600 uppercase tracking-wider mr-2">
                    {t("col_country")}:
                  </span>
                  <span className="text-sm text-text-secondary">
                    {t(`ctry_${company.country}`)}
                  </span>
                </div>
                <div className="sm:col-span-2 flex items-center">
                  <span className="sm:hidden text-xs font-semibold text-navy-600 uppercase tracking-wider mr-2">
                    {t("col_province")}:
                  </span>
                  <span className="text-sm text-text-secondary">
                    {t(`prov_${company.province}`)}
                  </span>
                </div>
                <div className="sm:col-span-2 flex items-center">
                  <span className="sm:hidden text-xs font-semibold text-navy-600 uppercase tracking-wider mr-2">
                    {t("col_year")}:
                  </span>
                  <span className="text-sm text-text-secondary">
                    {company.year}
                  </span>
                </div>
                <div className="sm:col-span-1 flex items-center">
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors duration-300">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span className="sm:hidden">{t("view_details")}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
