"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Building2,
  Scale,
  Globe,
  HelpCircle,
  Calendar,
  Clock,
  Send,
} from "lucide-react";

/* ── Easing curves ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Topic list ── */
const topics = [
  { key: "topic1", icon: FileText },
  { key: "topic2", icon: Building2 },
  { key: "topic3", icon: Scale },
  { key: "topic4", icon: Globe },
  { key: "topic5", icon: MessageSquare },
  { key: "topic6", icon: HelpCircle },
] as const;

export default function ConsultationContent() {
  const t = useTranslations("consultation_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            BOOKING DESCRIPTION + TOPICS
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 sm:mb-20">
          {/* Left — Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("booking_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight mb-6">
              {t("booking_title")}
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-6" />
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {t("booking_description")}
            </p>
          </motion.div>

          {/* Right — 6 Topic List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {topics.map((topic, i) => (
              <motion.div
                key={topic.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.06,
                  ease: EASE_OUT,
                }}
                className="group flex items-center gap-3 p-4 bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06]"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300">
                  <topic.icon
                    className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm font-semibold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                  {t(`${topic.key}_label`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================================================
            CONSULTATION FORM
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("form_eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
              {t("form_title")}
            </h2>
            <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </div>

          <div
            className="relative bg-white border border-border p-8 sm:p-10 overflow-hidden"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {/* Top gold accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent" />

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="consultation-name"
                    className="block text-sm font-semibold text-navy-600 mb-2"
                  >
                    {t("form_name_label")}
                  </label>
                  <input
                    id="consultation-name"
                    type="text"
                    placeholder={t("form_name_placeholder")}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 placeholder:text-text-muted focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="consultation-email"
                    className="block text-sm font-semibold text-navy-600 mb-2"
                  >
                    {t("form_email_label")}
                  </label>
                  <input
                    id="consultation-email"
                    type="email"
                    placeholder={t("form_email_placeholder")}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 placeholder:text-text-muted focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="consultation-company"
                  className="block text-sm font-semibold text-navy-600 mb-2"
                >
                  {t("form_company_label")}
                </label>
                <input
                  id="consultation-company"
                  type="text"
                  placeholder={t("form_company_placeholder")}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 placeholder:text-text-muted focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300"
                />
              </div>

              {/* Topic Select */}
              <div>
                <label
                  htmlFor="consultation-topic"
                  className="block text-sm font-semibold text-navy-600 mb-2"
                >
                  {t("form_topic_label")}
                </label>
                <select
                  id="consultation-topic"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300 appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("form_topic_placeholder")}
                  </option>
                  {topics.map((topic) => (
                    <option key={topic.key} value={topic.key}>
                      {t(`${topic.key}_label`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="consultation-date"
                    className="block text-sm font-semibold text-navy-600 mb-2"
                  >
                    <Calendar className="inline h-4 w-4 mr-1.5 -mt-0.5" aria-hidden="true" />
                    {t("form_date_label")}
                  </label>
                  <input
                    id="consultation-date"
                    type="date"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="consultation-time"
                    className="block text-sm font-semibold text-navy-600 mb-2"
                  >
                    <Clock className="inline h-4 w-4 mr-1.5 -mt-0.5" aria-hidden="true" />
                    {t("form_time_label")}
                  </label>
                  <input
                    id="consultation-time"
                    type="time"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="consultation-message"
                  className="block text-sm font-semibold text-navy-600 mb-2"
                >
                  {t("form_message_label")}
                </label>
                <textarea
                  id="consultation-message"
                  rows={4}
                  placeholder={t("form_message_placeholder")}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-navy-950 placeholder:text-text-muted focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-950 text-white font-semibold text-sm hover:bg-navy-900 transition-colors duration-300 self-start"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {t("form_submit")}
              </motion.button>

              {/* Note */}
              <p className="text-xs text-text-muted leading-relaxed">
                {t("form_note")}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
