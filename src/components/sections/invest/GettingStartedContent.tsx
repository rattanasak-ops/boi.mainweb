"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle,
  Upload,
  Clock,
  Award,
  FileCheck,
  CalendarDays,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const steps = [
  { key: "step1", icon: Search, color: "from-blue-500 to-blue-600" },
  { key: "step2", icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
  { key: "step3", icon: Upload, color: "from-amber-500 to-amber-600" },
  { key: "step4", icon: Clock, color: "from-purple-500 to-purple-600" },
  { key: "step5", icon: Award, color: "from-gold-500 to-gold-600" },
];

const checklistItems = [
  "doc_company_registration",
  "doc_financial_statements",
  "doc_project_plan",
  "doc_environmental_report",
  "doc_board_resolution",
  "doc_power_of_attorney",
];

const timelinePhases = [
  { key: "phase_application", weeks: "1-2" },
  { key: "phase_review", weeks: "3-6" },
  { key: "phase_approval", weeks: "7-8" },
  { key: "phase_certificate", weeks: "9-10" },
];

export default function GettingStartedContent() {
  const t = useTranslations("getting_started.content");

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
          className="max-w-2xl mb-16 sm:mb-20"
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
            5-STEP VERTICAL TIMELINE
            ══════════════════════════════════════════ */}
        <div className="relative mb-20 sm:mb-24">
          {/* Timeline vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-transparent hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: EASE_OUT,
                  }}
                  className="relative flex gap-6 sm:gap-8"
                >
                  {/* Step number + icon circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                    >
                      <Icon
                        className="h-6 w-6 sm:h-7 sm:w-7 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 text-white text-xs font-bold border-2 border-surface">
                      {i + 1}
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className="flex-1 p-6 sm:p-8 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] group"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {/* Top gold accent */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.1,
                        ease: EASE_OUT,
                      }}
                      style={{ transformOrigin: "left" }}
                    />

                    <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-2 group-hover:text-navy-950 transition-colors duration-300">
                      {t(`${step.key}_title`)}
                    </h3>
                    <p className="text-base text-text-secondary leading-relaxed">
                      {t(`${step.key}_desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENT CHECKLIST + TIMELINE GRID
            ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Checklist Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div
              className="h-full p-8 sm:p-10 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-lg"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {/* Gold accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
                  <FileCheck
                    className="h-5 w-5 text-gold-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-600">
                  {t("checklist_title")}
                </h3>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                {t("checklist_desc")}
              </p>

              <ul className="space-y-4">
                {checklistItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * i,
                      ease: EASE_OUT,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5 text-gold-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-text-secondary">
                      {t(item)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <div
              className="h-full p-8 sm:p-10 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-lg"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {/* Gold accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
                  <CalendarDays
                    className="h-5 w-5 text-gold-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-600">
                  {t("timeline_title")}
                </h3>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                {t("timeline_desc")}
              </p>

              <div className="space-y-4">
                {timelinePhases.map((phase, i) => (
                  <motion.div
                    key={phase.key}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * i,
                      ease: EASE_OUT,
                    }}
                    className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border/50 hover:border-gold-300/40 transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-950 text-white text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-600">
                        {t(phase.key)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 px-3 py-1 bg-gold-500/10 text-gold-600 text-xs font-bold rounded-full border border-gold-400/20">
                      {t("weeks", { count: phase.weeks })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
