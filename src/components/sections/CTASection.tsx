"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Globe2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import NoiseGrain from "@/components/ui/NoiseGrain";

const ctaStats = [
  {
    icon: TrendingUp,
    target: 850,
    prefix: "฿",
    suffix: "B",
    labelKey: "stat_investment_label",
  },
  {
    icon: Globe2,
    target: 50,
    suffix: "+",
    labelKey: "stat_countries_label",
  },
  {
    icon: ThumbsUp,
    target: 95,
    suffix: "%",
    labelKey: "stat_satisfaction_label",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* ================================================
          BACKGROUND — Full-bleed Thailand temple image
          Creates emotional "come to Thailand" feeling
          ================================================ */}
      <Image
        src="/images/why-thailand/temple.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/40" />

      {/* Atmospheric layers */}
      <FloatingOrbs variant="section" />
      <NoiseGrain opacity={0.03} />

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            TWO-COLUMN LAYOUT — Text left, Stats right
            NOT centered template style
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Message */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("subtitle")}
            </motion.span>

            <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">
                {t("title").split(" ").slice(0, -1).join(" ")}
              </span>{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                {t("title").split(" ").slice(-1)}
              </span>
            </h2>

            {/* Decorative gold line */}
            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />

            <p className="mt-6 text-lg text-white/55 max-w-lg leading-relaxed">
              {t("description")}
            </p>

            {/* CTA Button — polygon brand shape, large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="#"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.02]"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t("cta_button")}
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Stats panel with heavy shadow (EEC editorial style) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="relative"
          >
            <div
              className="relative p-8 sm:p-10 lg:p-12 bg-navy-950/60 backdrop-blur-xl border border-white/[0.06] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              }}
            >
              {/* Top gold accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

              <div className="space-y-8 sm:space-y-10">
                {ctaStats.map((stat, i) => (
                  <motion.div
                    key={stat.labelKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.12,
                      ease: EASE_OUT,
                    }}
                    className="group flex items-center gap-6"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold-500/20 group-hover:scale-110">
                      <stat.icon
                        className="h-7 w-7 text-gold-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        <AnimatedCounter
                          target={stat.target}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      </p>
                      <p className="mt-1 text-sm text-white/45 group-hover:text-gold-300/70 transition-colors duration-300">
                        {t(stat.labelKey)}
                      </p>
                    </div>

                    {/* Divider */}
                    {i < ctaStats.length - 1 && (
                      <div className="absolute left-0 right-0 -bottom-4 sm:-bottom-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    )}
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
