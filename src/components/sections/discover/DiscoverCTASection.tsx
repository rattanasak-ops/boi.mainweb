"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

export default function DiscoverCTASection() {
  const t = useTranslations("discover_page.cta");
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
          src="/images/hero/digital-network.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/80" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {t("eyebrow")}
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            {t("description")}
          </motion.p>

          {/* Benefits */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          >
            {["benefit_1", "benefit_2", "benefit_3"].map((key) => (
              <div key={key} className="flex items-center gap-2 text-sm text-white/50">
                <CheckCircle className="h-4 w-4 text-gold-400" aria-hidden="true" />
                <span>{t(key)}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
          >
            <Link
              href="/invest/getting-started"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_30px_rgba(197,165,114,0.3)]"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t("cta_invest")}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/invest/eligibility-checker"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-gold-500/40 transition-all duration-300"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t("cta_eligibility")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
