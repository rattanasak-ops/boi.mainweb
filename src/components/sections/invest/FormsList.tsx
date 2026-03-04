"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileCheck2,
  Download,
  Calendar,
  HardDrive,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const FILTER_TABS = [
  { key: "all", label: "filter_all" },
  { key: "application", label: "filter_application" },
  { key: "reporting", label: "filter_reporting" },
  { key: "customs", label: "filter_customs" },
  { key: "general", label: "filter_general" },
];

const CATEGORY_COLORS: Record<string, string> = {
  application: "bg-navy-950 text-white",
  reporting: "bg-emerald-600 text-white",
  customs: "bg-amber-500 text-navy-950",
  general: "bg-blue-600 text-white",
};

const FILE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
  docx: FileCheck2,
};

const MOCK_FORMS = [
  {
    key: "form_1",
    category: "application",
    fileType: "pdf",
    fileSize: "2.4 MB",
    updatedDate: "2025-12-15",
  },
  {
    key: "form_2",
    category: "application",
    fileType: "pdf",
    fileSize: "1.8 MB",
    updatedDate: "2025-11-20",
  },
  {
    key: "form_3",
    category: "reporting",
    fileType: "xlsx",
    fileSize: "856 KB",
    updatedDate: "2026-01-10",
  },
  {
    key: "form_4",
    category: "reporting",
    fileType: "pdf",
    fileSize: "1.2 MB",
    updatedDate: "2025-10-05",
  },
  {
    key: "form_5",
    category: "customs",
    fileType: "pdf",
    fileSize: "3.1 MB",
    updatedDate: "2026-02-01",
  },
  {
    key: "form_6",
    category: "customs",
    fileType: "xlsx",
    fileSize: "420 KB",
    updatedDate: "2025-09-18",
  },
  {
    key: "form_7",
    category: "general",
    fileType: "docx",
    fileSize: "680 KB",
    updatedDate: "2026-01-25",
  },
  {
    key: "form_8",
    category: "general",
    fileType: "pdf",
    fileSize: "1.5 MB",
    updatedDate: "2025-12-01",
  },
];

export default function FormsList() {
  const t = useTranslations("forms_page.list");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredForms = MOCK_FORMS.filter(
    (form) => activeFilter === "all" || form.category === activeFilter
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
            FORMS LIST
            ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {filteredForms.map((form, i) => {
            const Icon = FILE_ICONS[form.fileType] || FileText;
            return (
              <motion.div
                key={form.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group h-full bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
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
                      delay: 0.2 + i * 0.06,
                      ease: EASE_OUT,
                    }}
                    style={{ transformOrigin: "left" }}
                  />

                  <div className="relative z-10 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      {/* File icon */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300 flex-shrink-0">
                        <Icon
                          className="h-7 w-7 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Form info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-navy-600 mb-1 group-hover:text-navy-950 transition-colors duration-300">
                          {t(`${form.key}_name`)}
                        </h3>

                        {/* Category badge */}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded mb-3 ${
                            CATEGORY_COLORS[form.category] ||
                            "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {t(`cat_${form.category}`)}
                        </span>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-secondary">
                          <div className="flex items-center gap-1.5">
                            <HardDrive
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            <span>{form.fileSize}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            <span>{form.updatedDate}</span>
                          </div>
                          <span className="uppercase font-bold text-navy-600/50">
                            .{form.fileType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Download button */}
                    <div className="mt-5 flex justify-end">
                      <button
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-950 text-white hover:bg-navy-600 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        <Download
                          className="h-4 w-4 group-hover/btn:translate-y-0.5 transition-transform duration-300"
                          aria-hidden="true"
                        />
                        {t("download")}
                      </button>
                    </div>
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
      </div>
    </section>
  );
}
