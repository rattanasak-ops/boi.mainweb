"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Home,
  Banknote,
  FileCheck,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const benefits = [
  { icon: Users, key: "foreign_ownership" },
  { icon: Home, key: "land_ownership" },
  { icon: Banknote, key: "forex" },
  { icon: FileCheck, key: "work_permit" },
  { icon: Globe2, key: "expert_visa" },
  { icon: ShieldCheck, key: "guarantees" },
];

export default function NonTaxIncentivesSection() {
  const t = useTranslations("incentives_page.non_tax");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero/bangkok-aerial-night.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 bg-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
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
            {t("eyebrow")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <motion.div
            className="mt-6 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          />
          <motion.p
            className="mt-6 text-white/50 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group h-full bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] p-6 sm:p-8 hover:border-gold-500/20 transition-all duration-500"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                  <benefit.icon
                    className="h-6 w-6 text-gold-400 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors duration-300">
                  {t(`${benefit.key}_name`)}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed">
                  {t(`${benefit.key}_desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom transition */}
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
