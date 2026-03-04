"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  Download,
  Package,
  Phone,
  Mail,
  User,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const MOCK_RELEASES = [
  { key: "release_1", date: "2026-02-28" },
  { key: "release_2", date: "2026-02-20" },
  { key: "release_3", date: "2026-02-15" },
  { key: "release_4", date: "2026-02-08" },
];

export default function PressCenterContent() {
  const t = useTranslations("press_center_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold-100/20 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ── Latest Press Releases ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <Newspaper
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("releases_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("releases_title")}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_RELEASES.map((release, i) => (
              <motion.div
                key={release.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group bg-white border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold-500/30 hover:shadow-[0_12px_30px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                      <Calendar
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <time dateTime={release.date}>
                        {t(`${release.key}_date`)}
                      </time>
                    </div>
                    <h3 className="text-lg font-bold text-navy-600 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                      {t(`${release.key}_title`)}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-1">
                      {t(`${release.key}_excerpt`)}
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:gap-3 transition-all duration-300 shrink-0">
                    {t("read_more")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Press Kit + Media Contact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 sm:mb-20">
          {/* Press Kit Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div
              className="relative h-full bg-white border border-border p-8 sm:p-10 hover:border-gold-500/30 hover:shadow-[0_16px_40px_rgba(27,42,74,0.06)] transition-all duration-500"
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
                transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5">
                <Package
                  className="h-6 w-6 text-gold-500"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl font-bold text-navy-600 mb-3">
                {t("press_kit_title")}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {t("press_kit_desc")}
              </p>

              <ul className="space-y-2 mb-6">
                {["logos", "photos", "factsheet", "guidelines"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                    {t(`press_kit_${item}`)}
                  </li>
                ))}
              </ul>

              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-300"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("press_kit_download")}
              </button>
            </div>
          </motion.div>

          {/* Media Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <div
              className="relative h-full bg-white border border-border p-8 sm:p-10 hover:border-gold-500/30 hover:shadow-[0_16px_40px_rgba(27,42,74,0.06)] transition-all duration-500"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(197,165,114,0.6))",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5">
                <User
                  className="h-6 w-6 text-gold-500"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl font-bold text-navy-600 mb-3">
                {t("media_contact_title")}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {t("media_contact_desc")}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <User
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_spokesperson")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("media_spokesperson")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Phone
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_phone")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("media_phone")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Mail
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_email")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("media_email")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Media Accreditation ── */}
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

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 shrink-0">
                  <BadgeCheck
                    className="h-6 w-6 text-gold-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t("accreditation_title")}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-lg">
                    {t("accreditation_desc")}
                  </p>
                </div>
              </div>

              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-950 text-sm font-bold hover:bg-gold-400 transition-all duration-300 shrink-0"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t("accreditation_apply")}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
