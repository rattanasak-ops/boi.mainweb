"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Cpu,
  BadgePercent,
  GraduationCap,
  ShieldCheck,
  Plane,
} from "lucide-react";
import Image from "next/image";

/* ── Advantages data with varied layout roles ── */
const advantages = [
  {
    icon: MapPin,
    titleKey: "strategic_location",
    descKey: "strategic_location_desc",
    image: "/images/why-thailand/aerial-city.jpg",
  },
  {
    icon: Cpu,
    titleKey: "digital_infra",
    descKey: "digital_infra_desc",
    image: "/images/why-thailand/digital-tech.jpg",
  },
  {
    icon: BadgePercent,
    titleKey: "incentives",
    descKey: "incentives_desc",
    image: "/images/why-thailand/finance.jpg",
  },
  {
    icon: GraduationCap,
    titleKey: "workforce",
    descKey: "workforce_desc",
    image: "/images/why-thailand/workforce.jpg",
  },
  {
    icon: ShieldCheck,
    titleKey: "investor_protection",
    descKey: "investor_protection_desc",
    image: "/images/why-thailand/handshake.jpg",
  },
  {
    icon: Plane,
    titleKey: "quality_of_life",
    descKey: "quality_of_life_desc",
    image: "/images/why-thailand/temple.jpg",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

export default function WhyThailandSection() {
  const t = useTranslations("why_thailand");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      {/* Background accent — subtle gold wash top-right */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            SECTION HEADER — Left-aligned editorial style
            NOT centered (breaks the template pattern)
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("title_1")}
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>

            {/* Decorative gold line — left accent */}
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

        {/* ================================================
            FEATURE HERO — First 2 items as large showcase
            Asymmetric layout: big image left + text right
            Inspired by EEC's full-bleed image panels
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {advantages.slice(0, 2).map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-navy-900"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Full-bleed image with zoom on hover */}
                <Image
                  src={item.image}
                  alt={t(item.titleKey)}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark gradient overlay — content readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

                {/* Editorial shadow on image (EEC: box-shadow: 50px 50px 100px) */}
                <div className="absolute inset-0 shadow-[inset_0_-60px_80px_rgba(7,11,23,0.3)]" />

                {/* Content — bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 backdrop-blur-sm mb-4">
                    <item.icon
                      className="h-6 w-6 text-gold-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-gold-200 transition-colors duration-300">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed max-w-md">
                    {t(item.descKey)}
                  </p>

                  {/* Learn more — hover reveal */}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-gold-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {tCommon("learn_more")}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================================================
            FEATURE GRID — Remaining 4 items as smaller cards
            Different layout from the top 2 = visual variety
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {advantages.slice(2).map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
            >
              <div className="group relative h-full bg-white border border-border hover:border-gold-300/60 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-gold-500/[0.06]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image — compact */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-lg">
                    <item.icon
                      className="h-5 w-5 text-gold-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-navy-600 group-hover:text-navy-700 leading-snug">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
