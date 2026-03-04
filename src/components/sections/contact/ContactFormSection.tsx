"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

export default function ContactFormSection() {
  const t = useTranslations("contact_page.form");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — Info */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight leading-[1.15]">
              {t("title")}
            </h2>
            <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
            <p className="mt-6 text-text-secondary leading-relaxed">
              {t("description")}
            </p>

            {/* Map placeholder */}
            <div
              className="mt-8 relative h-48 bg-navy-600/5 border border-border overflow-hidden"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary">{t("map_label")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <div
              className="bg-white border border-border p-8 sm:p-10"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-600 mb-2">
                      {t("name_label")} <span className="text-gold-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("name_placeholder")}
                      className="w-full px-4 py-3 border border-border text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                      style={{ clipPath: BRAND_SHAPE }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-600 mb-2">
                      {t("email_label")} <span className="text-gold-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("email_placeholder")}
                      className="w-full px-4 py-3 border border-border text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                      style={{ clipPath: BRAND_SHAPE }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-600 mb-2">
                      {t("company_label")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("company_placeholder")}
                      className="w-full px-4 py-3 border border-border text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all"
                      style={{ clipPath: BRAND_SHAPE }}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-600 mb-2">
                      {t("subject_label")} <span className="text-gold-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-border text-sm text-navy-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all bg-white"
                      style={{ clipPath: BRAND_SHAPE }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("subject_placeholder")}
                      </option>
                      <option value="general">{t("subject_general")}</option>
                      <option value="incentives">{t("subject_incentives")}</option>
                      <option value="application">{t("subject_application")}</option>
                      <option value="visa">{t("subject_visa")}</option>
                      <option value="other">{t("subject_other")}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-navy-600 mb-2">
                    {t("message_label")} <span className="text-gold-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t("message_placeholder")}
                    className="w-full px-4 py-3 border border-border text-sm text-navy-600 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                    style={{ clipPath: BRAND_SHAPE }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-text-secondary">
                    {t("required_note")}
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_30px_rgba(197,165,114,0.3)]"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
