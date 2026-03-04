"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FileText,
  Archive,
  DollarSign,
  ShieldCheck,
  Inbox,
  Calendar,
  ArrowRight,
  ExternalLink,
  Eye,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const MOCK_ARCHIVE = [
  { key: "archive_1", date: "2025-12", items: 8 },
  { key: "archive_2", date: "2025-09", items: 5 },
  { key: "archive_3", date: "2025-06", items: 12 },
];

const MOCK_PRICES = [
  { key: "price_1", date: "2026-01" },
  { key: "price_2", date: "2025-10" },
  { key: "price_3", date: "2025-07" },
];

export default function ProcurementContent() {
  const t = useTranslations("procurement_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-gold-100/20 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ── Current Procurement ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <FileText
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("current_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("current_title")}
              </h2>
            </div>
          </div>

          {/* No Items State */}
          <div
            className="bg-white border border-border p-10 sm:p-14 text-center"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-950/[0.03] mx-auto mb-5">
              <Inbox
                className="h-8 w-8 text-text-secondary/30"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-bold text-navy-600 mb-2">
              {t("no_items_title")}
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              {t("no_items_desc")}
            </p>
          </div>
        </motion.div>

        {/* ── Archive Section ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <Archive
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("archive_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("archive_title")}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_ARCHIVE.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group bg-white border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold-500/30 hover:shadow-[0_8px_24px_rgba(27,42,74,0.05)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600/5 shrink-0">
                      <Calendar
                        className="h-5 w-5 text-navy-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-navy-600 group-hover:text-gold-600 transition-colors duration-300">
                        {t(`${item.key}_title`)}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {t(`${item.key}_period`)} &middot;{" "}
                        {t("items_count", { count: item.items })}
                      </p>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:gap-3 transition-all duration-300 shrink-0">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    {t("view_archive")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Price References ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <DollarSign
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("prices_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("prices_title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {MOCK_PRICES.map((price, i) => (
              <motion.div
                key={price.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group bg-white border border-border p-6 hover:border-gold-500/30 hover:shadow-[0_12px_30px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
                    <Calendar
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    {t(`${price.key}_date`)}
                  </div>
                  <h4 className="text-base font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                    {t(`${price.key}_title`)}
                  </h4>
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:gap-3 transition-all duration-300">
                    {t("view_details")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Transparency Commitment ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div
            className="relative bg-navy-950 p-8 sm:p-10 lg:p-12 overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-gold-500/5" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 shrink-0">
                <ShieldCheck
                  className="h-7 w-7 text-gold-400"
                  aria-hidden="true"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("transparency_title")}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                  {t("transparency_desc")}
                </p>
              </div>

              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-950 text-sm font-bold hover:bg-gold-400 transition-all duration-300 shrink-0"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t("transparency_link")}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
