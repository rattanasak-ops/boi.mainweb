"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Landmark, Globe2, Users } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* ── Stats data ── */
const stats = [
  {
    icon: Landmark,
    target: 1500,
    suffix: "+",
    labelKey: "promoted_projects",
  },
  {
    icon: TrendingUp,
    target: 850,
    prefix: "฿",
    suffix: "B",
    labelKey: "total_investment",
  },
  {
    icon: Globe2,
    target: 50,
    suffix: "+",
    labelKey: "countries",
  },
  {
    icon: Users,
    target: 500,
    suffix: "K+",
    labelKey: "jobs",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="relative overflow-hidden">
      {/* ================================================
          BACKGROUND — Full-bleed Bangkok at night
          ================================================ */}
      <Image
        src="/images/stats/bangkok-night.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-900/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/60 to-navy-900" />

      {/* ================================================
          CONTENT — Negative margin overlap into Hero
          EEC pattern: margin-top: -7rem with heavy box-shadow
          Creates depth between Hero and Stats sections
          ================================================ */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-20 sm:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-gold-400 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* ── Stats grid — overlapping card panel ──
            Uses negative margin + heavy shadow (EEC pattern)
            Cards sit inside a raised navy panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          className="relative -mt-2 p-8 sm:p-10 lg:p-14 bg-navy-950/80 backdrop-blur-xl border border-white/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
          }}
        >
          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: EASE_OUT,
                }}
                className="group text-center relative"
              >
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 group-hover:scale-110">
                  <stat.icon
                    className="h-7 w-7 text-gold-400 transition-colors duration-300 group-hover:text-gold-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Number */}
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>

                {/* Label */}
                <p className="text-sm text-white/50 group-hover:text-gold-300/80 transition-colors duration-300">
                  {t(stat.labelKey)}
                </p>

                {/* Vertical divider (not on last item) */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================================================
          BOTTOM DIAGONAL TRANSITION — to WhyThailand (light)
          Opposite direction from Hero's diagonal
          ================================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1600 100"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px] lg:h-[100px]"
          aria-hidden="true"
        >
          <polygon points="0,100 1600,100 0,0" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
