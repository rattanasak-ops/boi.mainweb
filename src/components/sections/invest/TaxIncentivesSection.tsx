"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const tiers = [
  {
    key: "a1_plus",
    icon: Crown,
    featured: true,
    benefits: ["cit_13", "import_duty", "foreign_land", "deductions"],
  },
  {
    key: "a1",
    icon: Star,
    featured: false,
    benefits: ["cit_8", "import_duty", "foreign_land", "deductions"],
  },
  {
    key: "a2",
    icon: Zap,
    featured: false,
    benefits: ["cit_8", "import_duty", "foreign_ownership"],
  },
];

export default function TaxIncentivesSection() {
  const t = useTranslations("incentives_page.tax");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      {/* Gold wash */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("title_1")}
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex items-end"
          >
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* 3 TiltCard tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 * i,
                ease: EASE_OUT,
              }}
            >
              <TiltCard className="h-full">
                <div
                  className={`relative h-full p-8 sm:p-10 border transition-all duration-500 ${
                    tier.featured
                      ? "bg-navy-950 border-gold-500/30 shadow-[0_30px_80px_rgba(27,42,74,0.15)]"
                      : "bg-white border-border hover:border-gold-500/20 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)]"
                  }`}
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Gold accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: tier.featured
                        ? "linear-gradient(to right, rgba(197,165,114,0.8), rgba(212,184,150,1), rgba(197,165,114,0.8))"
                        : "linear-gradient(to right, transparent, rgba(197,165,114,0.4), transparent)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.15,
                      ease: EASE_OUT,
                    }}
                  />

                  {/* Featured badge */}
                  {tier.featured && (
                    <div className="absolute -top-3 right-6 px-4 py-1 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase">
                      {t("recommended")}
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl mb-6 ${
                      tier.featured
                        ? "bg-gold-500/20 border border-gold-400/30"
                        : "bg-gold-500/10 border border-gold-400/20"
                    }`}
                  >
                    <tier.icon
                      className={`h-7 w-7 ${
                        tier.featured ? "text-gold-400" : "text-gold-500"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Tier name */}
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      tier.featured ? "text-white" : "text-navy-600"
                    }`}
                  >
                    {t(`${tier.key}_name`)}
                  </h3>

                  {/* Tier highlight */}
                  <p
                    className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${
                      tier.featured
                        ? "text-gold-400"
                        : "bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent"
                    }`}
                  >
                    {t(`${tier.key}_highlight`)}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-sm mb-6 ${
                      tier.featured ? "text-white/50" : "text-text-secondary"
                    }`}
                  >
                    {t(`${tier.key}_desc`)}
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Check
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            tier.featured ? "text-gold-400" : "text-gold-500"
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-sm ${
                            tier.featured ? "text-white/70" : "text-text-secondary"
                          }`}
                        >
                          {t(`benefit_${benefit}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
