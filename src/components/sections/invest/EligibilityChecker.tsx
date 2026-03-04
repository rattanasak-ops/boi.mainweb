"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Factory,
  Cog,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Percent,
  Package,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const INDUSTRIES = [
  { key: "agriculture", label: "industry_agriculture" },
  { key: "minerals", label: "industry_minerals" },
  { key: "light_industry", label: "industry_light" },
  { key: "metal_products", label: "industry_metal" },
  { key: "electronics", label: "industry_electronics" },
  { key: "chemicals", label: "industry_chemicals" },
  { key: "services", label: "industry_services" },
  { key: "technology", label: "industry_technology" },
];

const ACTIVITIES: Record<string, { key: string; label: string }[]> = {
  agriculture: [
    { key: "food_processing", label: "activity_food_processing" },
    { key: "cold_storage", label: "activity_cold_storage" },
    { key: "biofuel", label: "activity_biofuel" },
  ],
  minerals: [
    { key: "glass_manufacturing", label: "activity_glass" },
    { key: "ceramics", label: "activity_ceramics" },
  ],
  light_industry: [
    { key: "textiles", label: "activity_textiles" },
    { key: "furniture", label: "activity_furniture" },
    { key: "packaging", label: "activity_packaging" },
  ],
  metal_products: [
    { key: "auto_parts", label: "activity_auto_parts" },
    { key: "machinery", label: "activity_machinery" },
  ],
  electronics: [
    { key: "semiconductor", label: "activity_semiconductor" },
    { key: "pcb_manufacturing", label: "activity_pcb" },
    { key: "ev_components", label: "activity_ev_components" },
  ],
  chemicals: [
    { key: "petrochemicals", label: "activity_petrochemicals" },
    { key: "pharma", label: "activity_pharma" },
  ],
  services: [
    { key: "software_dev", label: "activity_software" },
    { key: "data_center", label: "activity_data_center" },
    { key: "rd_center", label: "activity_rd_center" },
  ],
  technology: [
    { key: "ai_robotics", label: "activity_ai_robotics" },
    { key: "biotech", label: "activity_biotech" },
    { key: "advanced_materials", label: "activity_advanced_materials" },
  ],
};

const MOCK_INCENTIVES = [
  { key: "cit_exemption", icon: Percent },
  { key: "import_duty", icon: Package },
  { key: "foreign_ownership", icon: Shield },
];

const stepIcons = [Factory, Cog, CheckCircle2];

export default function EligibilityChecker() {
  const t = useTranslations("eligibility_checker.checker");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const canProceedStep1 = selectedIndustry !== "";
  const canProceedStep2 = selectedActivity !== "";

  const handleNext = () => {
    if (currentStep === 0 && canProceedStep1) {
      setCurrentStep(1);
      setSelectedActivity("");
    } else if (currentStep === 1 && canProceedStep2) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setSelectedActivity("");
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedIndustry("");
    setSelectedActivity("");
  };

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
          className="max-w-2xl mb-12 sm:mb-16"
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
            STEP INDICATORS
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex items-center justify-center gap-0 mb-12 sm:mb-16"
        >
          {[0, 1, 2].map((step) => {
            const Icon = stepIcons[step];
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;

            return (
              <div key={step} className="flex items-center">
                {step > 0 && (
                  <div
                    className={`h-[2px] w-12 sm:w-20 transition-all duration-500 ${
                      isCompleted || isActive
                        ? "bg-gold-500"
                        : "bg-border"
                    }`}
                  />
                )}
                <div
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-navy-950 border-gold-500 shadow-lg shadow-navy-950/20"
                      : isCompleted
                      ? "bg-gold-500 border-gold-500"
                      : "bg-white border-border"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isActive
                        ? "text-gold-400"
                        : isCompleted
                        ? "text-white"
                        : "text-text-secondary"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ══════════════════════════════════════════
            WIZARD CONTENT
            ══════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Select Industry ── */}
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <div
                  className="p-8 sm:p-10 bg-white border border-border"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />

                  <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-2">
                    {t("step1_title")}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    {t("step1_desc")}
                  </p>

                  {/* Industry Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIndustryOpen(!industryOpen)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-surface border border-border rounded-lg hover:border-gold-300/60 transition-all duration-300 text-left"
                    >
                      <span
                        className={`text-base ${
                          selectedIndustry
                            ? "text-navy-600 font-medium"
                            : "text-text-secondary"
                        }`}
                      >
                        {selectedIndustry
                          ? t(
                              INDUSTRIES.find(
                                (ind) => ind.key === selectedIndustry
                              )?.label || ""
                            )
                          : t("select_industry")}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-text-secondary transition-transform duration-300 ${
                          industryOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {industryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-xl overflow-hidden"
                        >
                          {INDUSTRIES.map((ind) => (
                            <button
                              key={ind.key}
                              onClick={() => {
                                setSelectedIndustry(ind.key);
                                setIndustryOpen(false);
                                setSelectedActivity("");
                              }}
                              className={`w-full flex items-center gap-3 px-5 py-3 text-sm text-left transition-all duration-200 ${
                                selectedIndustry === ind.key
                                  ? "bg-gold-50 text-gold-600 font-medium"
                                  : "text-text-secondary hover:bg-surface hover:text-navy-600"
                              }`}
                            >
                              <Factory
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                              {t(ind.label)}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next button */}
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleNext}
                      disabled={!canProceedStep1}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                        canProceedStep1
                          ? "bg-navy-950 text-white hover:bg-navy-600 shadow-lg hover:shadow-xl"
                          : "bg-border text-text-secondary cursor-not-allowed"
                      }`}
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {t("next")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Select Activity ── */}
            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <div
                  className="p-8 sm:p-10 bg-white border border-border"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />

                  <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-2">
                    {t("step2_title")}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    {t("step2_desc")}
                  </p>

                  {/* Activity Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActivityOpen(!activityOpen)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-surface border border-border rounded-lg hover:border-gold-300/60 transition-all duration-300 text-left"
                    >
                      <span
                        className={`text-base ${
                          selectedActivity
                            ? "text-navy-600 font-medium"
                            : "text-text-secondary"
                        }`}
                      >
                        {selectedActivity
                          ? t(
                              (
                                ACTIVITIES[selectedIndustry] || []
                              ).find(
                                (act) => act.key === selectedActivity
                              )?.label || ""
                            )
                          : t("select_activity")}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-text-secondary transition-transform duration-300 ${
                          activityOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {activityOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-xl overflow-hidden"
                        >
                          {(ACTIVITIES[selectedIndustry] || []).map((act) => (
                            <button
                              key={act.key}
                              onClick={() => {
                                setSelectedActivity(act.key);
                                setActivityOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-5 py-3 text-sm text-left transition-all duration-200 ${
                                selectedActivity === act.key
                                  ? "bg-gold-50 text-gold-600 font-medium"
                                  : "text-text-secondary hover:bg-surface hover:text-navy-600"
                              }`}
                            >
                              <Cog
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                              {t(act.label)}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-text-secondary hover:text-navy-600 border border-border hover:border-navy-600/30 transition-all duration-300"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      {t("back")}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canProceedStep2}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                        canProceedStep2
                          ? "bg-navy-950 text-white hover:bg-navy-600 shadow-lg hover:shadow-xl"
                          : "bg-border text-text-secondary cursor-not-allowed"
                      }`}
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {t("view_results")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Results ── */}
            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <div
                  className="p-8 sm:p-10 bg-white border border-gold-500/30 shadow-[0_20px_60px_rgba(27,42,74,0.08)]"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />

                  {/* Eligible badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
                      <Sparkles
                        className="h-7 w-7 text-emerald-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">
                        {t("result_eligible")}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {t("result_subtitle")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Category badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
                    className="mb-8"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-950 text-white text-sm font-semibold rounded-lg">
                      <Shield className="h-4 w-4 text-gold-400" aria-hidden="true" />
                      {t("category_a1")}
                    </div>
                  </motion.div>

                  {/* Incentives list */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
                  >
                    <h4 className="text-lg font-bold text-navy-600 mb-4">
                      {t("incentives_title")}
                    </h4>
                    <div className="space-y-3">
                      {MOCK_INCENTIVES.map((inc, i) => (
                        <motion.div
                          key={inc.key}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.5 + i * 0.1,
                            ease: EASE_OUT,
                          }}
                          className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border/50"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20 flex-shrink-0">
                            <inc.icon
                              className="h-5 w-5 text-gold-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-600">
                              {t(`${inc.key}_title`)}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {t(`${inc.key}_desc`)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-text-secondary hover:text-navy-600 border border-border hover:border-navy-600/30 transition-all duration-300"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      {t("check_again")}
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gold-500 text-navy-950 hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {t("start_application")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
