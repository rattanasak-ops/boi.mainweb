"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Landmark, Globe2, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RadialProgress from "@/components/ui/RadialProgress";
import NoiseGrain from "@/components/ui/NoiseGrain";

/* ── Easing ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── Stats data ── */
const stats = [
  {
    icon: Landmark,
    target: 1500,
    suffix: "+",
    labelKey: "promoted_projects",
    contextKey: "context_projects",
    ringPercent: 85,
  },
  {
    icon: TrendingUp,
    target: 850,
    prefix: "฿",
    suffix: "B",
    labelKey: "total_investment",
    contextKey: "context_investment",
    ringPercent: 92,
  },
  {
    icon: Globe2,
    target: 50,
    suffix: "+",
    labelKey: "countries",
    contextKey: "context_countries",
    ringPercent: 50,
  },
  {
    icon: Users,
    target: 500,
    suffix: "K+",
    labelKey: "jobs",
    contextKey: "context_jobs",
    ringPercent: 72,
  },
];

export default function StatsSection() {
  const t = useTranslations("stats");
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax — BG image moves slower than content */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ================================================
          BACKGROUND — Parallax Bangkok at night
          ================================================ */}
      <motion.div className="absolute inset-0 -top-[20%] -bottom-[20%]" style={{ y: bgY }}>
        <Image
          src="/images/stats/bangkok-night.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-navy-950/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-transparent to-navy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,165,114,0.04)_0%,transparent_60%)]" />
      <NoiseGrain opacity={0.025} />

      {/* ================================================
          CONTENT
          ================================================ */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-24 sm:py-32">
        {/* ── Section header — connected to Big Idea ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.p
            className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {t("subtitle")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* ── Stats panel — raised glass card ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          className="relative p-8 sm:p-10 lg:p-14 bg-navy-950/60 backdrop-blur-2xl border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
          }}
        >
          {/* Top gold accent line — animates drawing */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(197,165,114,0.7) 30%, rgba(212,184,150,1) 50%, rgba(197,165,114,0.7) 70%, transparent)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
          />

          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: EASE_OUT,
                }}
                className="group text-center relative"
              >
                {/* Radial ring + Icon */}
                <RadialProgress
                  percent={stat.ringPercent}
                  delay={0.5 + i * 0.2}
                  duration={2}
                >
                  <stat.icon
                    className="h-7 w-7 sm:h-8 sm:w-8 text-gold-400 transition-all duration-500 group-hover:text-gold-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </RadialProgress>

                {/* Number — with glow on complete */}
                <p className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                    delay={0.6 + i * 0.2}
                  />
                </p>

                {/* Label */}
                <p className="mt-2 text-sm sm:text-base text-white/50 font-medium group-hover:text-gold-300/80 transition-colors duration-300">
                  {t(stat.labelKey)}
                </p>

                {/* Context line — data storytelling */}
                <motion.p
                  className="mt-2 text-[11px] sm:text-xs text-white/25 leading-snug"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + i * 0.2,
                    ease: EASE_OUT,
                  }}
                >
                  {t(stat.contextKey)}
                </motion.p>

                {/* Vertical divider (not on last item, desktop only) */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/4 h-1/2 w-px">
                    <motion.div
                      className="h-full w-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + i * 0.15,
                        ease: EASE_OUT,
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom gold separator — draws from center outward */}
          <motion.div
            className="mt-10 sm:mt-12 mx-auto h-[1px] max-w-md"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(197,165,114,0.4) 30%, rgba(197,165,114,0.4) 70%, transparent)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5, ease: EASE_OUT }}
          />

          {/* Tagline under stats */}
          <motion.p
            className="mt-5 text-center text-xs sm:text-sm text-white/30 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8, ease: EASE_OUT }}
          >
            {t("bottom_line")}
          </motion.p>
        </motion.div>
      </div>

      {/* ================================================
          BOTTOM DIAGONAL TRANSITION — to WhyThailand (light)
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
