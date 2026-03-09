"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 1500, suffix: "+", labelKey: "promoted_projects" as const },
  { target: 850, prefix: "฿", suffix: "B", labelKey: "total_investment" as const },
  { target: 50, suffix: "+", labelKey: "countries" as const },
  { target: 500, suffix: "K+", labelKey: "jobs" as const },
];

const contextKeys = {
  promoted_projects: "context_projects",
  total_investment: "context_investment",
  countries: "context_countries",
  jobs: "context_jobs",
} as const;

export default function StatsV2() {
  const t = useTranslations("stats");

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-20">
      {/* Decorative line chart SVG behind */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points="0,160 150,140 300,100 450,120 600,60 750,80 900,30 1050,50 1200,20"
          fill="none"
          stroke="#1B2A4A"
          strokeWidth="3"
        />
        <polyline
          points="0,180 200,150 400,130 600,110 800,90 1000,70 1200,60"
          fill="none"
          stroke="#C5A572"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1B2A4A] md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#1B2A4A]/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className="flex flex-col items-center px-6 py-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span
                className="text-4xl font-extrabold md:text-5xl"
                style={{
                  background: "linear-gradient(135deg, #C5A572 0%, #E8D5B0 50%, #C5A572 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  delay={i * 0.15}
                />
              </span>
              <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#1B2A4A]">
                {t(stat.labelKey)}
              </span>
              <span className="mt-1 text-xs text-[#1B2A4A]/50">
                {t(contextKeys[stat.labelKey])}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-[#1B2A4A]/60">{t("bottom_line")}</p>
          <Link
            href="/invest"
            className="rounded-full bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2A4A]/90"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
