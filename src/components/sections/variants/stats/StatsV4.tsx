"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 1500, suffix: "+", labelKey: "promoted_projects" as const },
  { target: 850, prefix: "฿", suffix: "B", labelKey: "total_investment" as const },
  { target: 50, suffix: "+", labelKey: "countries" as const },
  { target: 500, suffix: "K+", labelKey: "jobs" as const },
];

function TickerItem({ stat, t }: { stat: (typeof stats)[number]; t: ReturnType<typeof useTranslations<"stats">> }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 px-2">
      <span className="text-2xl font-extrabold text-[#C5A572] md:text-3xl">
        <AnimatedCounter
          target={stat.target}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </span>
      <span className="text-sm font-medium uppercase tracking-wide text-white/70">
        {t(stat.labelKey)}
      </span>
      {/* Gold dot separator */}
      <span className="mx-4 inline-block h-1.5 w-1.5 rounded-full bg-[#C5A572]" aria-hidden="true" />
    </span>
  );
}

export default function StatsV4() {
  const t = useTranslations("stats");

  /* Repeat items enough to fill wide screens seamlessly */
  const repeated = [...stats, ...stats, ...stats, ...stats];

  return (
    <section className="relative w-full overflow-hidden bg-[#1B2A4A] py-10">
      {/* Gold accent lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A572] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C5A572] to-transparent" />

      {/* Subtitle + title above ticker */}
      <div className="mx-auto mb-6 max-w-7xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A572]">
          {t("subtitle")}
        </p>
        <h2 className="mt-1 text-lg font-bold text-white md:text-xl">{t("title")}</h2>
      </div>

      {/* Ticker band */}
      <div className="relative flex select-none" aria-label={t("title")}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {repeated.map((stat, i) => (
            <TickerItem key={`${stat.labelKey}-${i}`} stat={stat} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Bottom line + CTA */}
      <div className="mx-auto mt-6 max-w-7xl px-6 text-center">
        <p className="text-xs text-white/40">{t("bottom_line")}</p>
      </div>
    </section>
  );
}
