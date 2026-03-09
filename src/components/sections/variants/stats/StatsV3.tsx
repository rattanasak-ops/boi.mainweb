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

/* Badge positions relative to the map column (percentage-based) */
const badgePositions = [
  { top: "10%", left: "60%" },
  { top: "35%", left: "75%" },
  { top: "60%", left: "65%" },
  { top: "82%", left: "50%" },
];

export default function StatsV3() {
  const t = useTranslations("stats");

  return (
    <section className="relative w-full overflow-hidden bg-[#1B2A4A] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t("title")}</h2>
        </motion.div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left — Thailand map outline with floating badges */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
            {/* Simple Thailand SVG outline */}
            <svg
              viewBox="0 0 300 400"
              className="h-full w-full opacity-20"
              fill="none"
              stroke="#C5A572"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M150,20 C160,25 180,30 190,50 C200,70 210,80 200,100 C195,115 205,130 210,145 C220,170 230,180 220,200 C215,215 220,230 210,250 C200,265 195,280 190,300 C185,320 175,340 165,355 C155,365 150,380 145,380 C140,375 130,360 125,340 C120,320 115,300 110,280 C105,260 95,245 100,225 C105,210 100,195 95,180 C90,165 85,150 90,135 C95,120 100,105 110,90 C120,75 130,55 140,40 C145,30 148,22 150,20Z" />
            </svg>

            {/* Gold accent lines + badges */}
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                className="absolute"
                style={badgePositions[i]}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                {/* Connecting gold line */}
                <span className="absolute -left-8 top-1/2 h-px w-8 bg-gradient-to-r from-[#C5A572]/0 to-[#C5A572]" />
                {/* Badge */}
                <div className="rounded-lg border border-[#C5A572]/30 bg-[#1B2A4A]/80 px-4 py-2.5 backdrop-blur-sm">
                  <span className="block text-2xl font-bold text-[#C5A572]">
                    <AnimatedCounter
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      delay={0.3 + i * 0.15}
                    />
                  </span>
                  <span className="block text-xs text-white/70">{t(stat.labelKey)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — stats stacked list */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                className="flex items-baseline gap-4 border-b border-white/10 pb-4 last:border-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <span className="min-w-[120px] text-3xl font-extrabold text-[#C5A572]">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={i * 0.12}
                  />
                </span>
                <div>
                  <p className="font-semibold">{t(stat.labelKey)}</p>
                  <p className="text-sm text-white/50">{t(contextKeys[stat.labelKey])}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="mb-4 text-sm text-white/50">{t("bottom_line")}</p>
              <Link
                href="/invest"
                className="inline-block rounded-full border border-[#C5A572] px-6 py-2.5 text-sm font-semibold text-[#C5A572] transition-colors hover:bg-[#C5A572] hover:text-[#1B2A4A]"
              >
                {t("cta")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
