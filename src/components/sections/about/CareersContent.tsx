"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
  Building2,
  FileText,
  Send,
  CheckCircle2,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const BENEFITS = [
  { key: "benefit1", icon: Heart },
  { key: "benefit2", icon: GraduationCap },
  { key: "benefit3", icon: TrendingUp },
  { key: "benefit4", icon: Users },
];

const MOCK_JOBS = [
  { key: "job_1", department: "dept_promotion" },
  { key: "job_2", department: "dept_international" },
  { key: "job_3", department: "dept_digital" },
];

const HOW_TO_STEPS = [
  { key: "step_1", icon: FileText },
  { key: "step_2", icon: Send },
  { key: "step_3", icon: CheckCircle2 },
];

export default function CareersContent() {
  const t = useTranslations("careers_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ── Why Work at BOI ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            {t("why_eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight mb-4">
            {t("why_title")}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed mb-10">
            {t("why_description")}
          </p>
          <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group h-full bg-white border border-border p-7 sm:p-8 hover:border-gold-500/30 hover:shadow-[0_16px_40px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5 group-hover:bg-gold-500/20 transition-all duration-300">
                    <benefit.icon
                      className="h-6 w-6 text-gold-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                    {t(`${benefit.key}_title`)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`${benefit.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Current Openings ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <Briefcase
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("openings_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("openings_title")}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_JOBS.map((job, i) => (
              <motion.div
                key={job.key}
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
                  className="group bg-white border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold-500/30 hover:shadow-[0_12px_30px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div>
                    <h3 className="text-lg font-bold text-navy-600 mb-1 group-hover:text-gold-600 transition-colors duration-300">
                      {t(`${job.key}_title`)}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="inline-flex items-center gap-1">
                        <Building2
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        {t(`${job.key}_department`)}
                      </span>
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-400/20"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {t("status_open")}
                      </span>
                    </div>
                  </div>

                  <button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white text-sm font-semibold hover:bg-navy-950 transition-all duration-300 shrink-0 group/btn"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {t("apply_btn")}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── How to Apply ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            {t("how_eyebrow")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight mb-8">
            {t("how_title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_TO_STEPS.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="relative bg-white border border-border p-6 sm:p-8 h-full hover:border-gold-500/30 hover:shadow-[0_12px_30px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-white text-sm font-bold">
                      {i + 1}
                    </span>
                    <step.icon
                      className="h-5 w-5 text-gold-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="text-base font-bold text-navy-600 mb-2">
                    {t(`${step.key}_title`)}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`${step.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
