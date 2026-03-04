"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardCheck,
  Send,
  Timer,
  Award,
  CheckCircle,
  Clock,
  Zap,
  Building2,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const processSteps = [
  { key: "step1_prepare", icon: FileText, color: "from-blue-500 to-blue-600" },
  { key: "step2_submit", icon: Send, color: "from-amber-500 to-amber-600" },
  { key: "step3_review", icon: ClipboardCheck, color: "from-purple-500 to-purple-600" },
  { key: "step4_approval", icon: Timer, color: "from-emerald-500 to-emerald-600" },
  { key: "step5_certificate", icon: Award, color: "from-gold-500 to-gold-600" },
];

const documentChecklist = [
  "doc_application_form",
  "doc_company_cert",
  "doc_shareholder_list",
  "doc_financial_projection",
  "doc_project_layout",
  "doc_machinery_list",
  "doc_environmental_impact",
  "doc_power_of_attorney",
];

const timelineComparison = [
  {
    key: "standard",
    icon: Clock,
    color: "bg-navy-950",
    duration: "60-90",
    features: ["standard_review", "standard_approval", "standard_cert"],
  },
  {
    key: "fast_track",
    icon: Zap,
    color: "bg-gold-500",
    duration: "30-45",
    features: ["fast_review", "fast_approval", "fast_cert"],
  },
  {
    key: "large_project",
    icon: Building2,
    color: "bg-navy-600",
    duration: "90-120",
    features: ["large_review", "large_board", "large_cert"],
  },
];

export default function ProceduresContent() {
  const t = useTranslations("procedures_page.content");

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
            5-STEP PROCESS DIAGRAM
            ══════════════════════════════════════════ */}
        <div className="mb-20 sm:mb-24">
          {/* Desktop: Horizontal process */}
          <div className="hidden lg:flex items-start gap-0 mb-4">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: EASE_OUT,
                  }}
                  className="flex-1 flex flex-col items-center text-center relative"
                >
                  {/* Connector line */}
                  {i < processSteps.length - 1 && (
                    <motion.div
                      className="absolute top-7 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-[2px] bg-gradient-to-r from-gold-500/60 to-gold-400/30"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.12,
                        ease: EASE_OUT,
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}

                  {/* Step circle */}
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-5`}
                  >
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 text-white text-xs font-bold border-2 border-surface">
                      {i + 1}
                    </div>
                  </div>

                  {/* Step text */}
                  <h3 className="text-base font-bold text-navy-600 mb-1">
                    {t(`${step.key}_title`)}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[180px]">
                    {t(`${step.key}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Vertical process */}
          <div className="lg:hidden space-y-6">
            {/* Timeline line */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-transparent" />

              <div className="space-y-8">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: EASE_OUT,
                      }}
                      className="flex gap-5 relative"
                    >
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}
                        >
                          <Icon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-950 text-white text-[10px] font-bold border-2 border-surface">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-base font-bold text-navy-600 mb-1">
                          {t(`${step.key}_title`)}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {t(`${step.key}_desc`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTS + TIMELINE COMPARISON GRID
            ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Documents Checklist */}
          <motion.div
            className="lg:col-span-2"
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
                  <FileText
                    className="h-5 w-5 text-gold-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy-600">
                  {t("docs_title")}
                </h3>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                {t("docs_desc")}
              </p>

              <ul className="space-y-3">
                {documentChecklist.map((doc, i) => (
                  <motion.li
                    key={doc}
                    initial={{ opacity: 0, x: -10 }}
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
                      className="h-4 w-4 shrink-0 mt-0.5 text-gold-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-text-secondary">
                      {t(doc)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Timeline Comparison */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
                <Clock
                  className="h-5 w-5 text-gold-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-navy-600">
                {t("timeline_title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {timelineComparison.map((track, i) => {
                const Icon = track.icon;
                return (
                  <motion.div
                    key={track.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.1,
                      ease: EASE_OUT,
                    }}
                  >
                    <div
                      className="h-full bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-lg overflow-hidden"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {/* Header */}
                      <div className={`${track.color} px-5 py-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon
                            className={`h-5 w-5 ${
                              track.key === "fast_track"
                                ? "text-navy-950"
                                : "text-white"
                            }`}
                            aria-hidden="true"
                          />
                          <h4
                            className={`text-sm font-bold ${
                              track.key === "fast_track"
                                ? "text-navy-950"
                                : "text-white"
                            }`}
                          >
                            {t(`${track.key}_title`)}
                          </h4>
                        </div>
                        <p
                          className={`text-2xl font-bold ${
                            track.key === "fast_track"
                              ? "text-navy-950"
                              : "text-white"
                          }`}
                        >
                          {t("days", { count: track.duration })}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="p-5">
                        <ul className="space-y-3">
                          {track.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle
                                className="h-4 w-4 shrink-0 mt-0.5 text-gold-500"
                                aria-hidden="true"
                              />
                              <span className="text-xs text-text-secondary">
                                {t(feature)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
