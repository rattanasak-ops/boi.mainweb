"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileCheck } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* ── Easing ── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroV2() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the image column
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#1B2A4A" }}
    >
      {/* ── Left Column — Text (60%) ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 gap-8 lg:gap-12 items-center py-20 lg:py-0">
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Tagline badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span
              className="inline-block px-4 py-1.5 text-sm font-medium tracking-wider uppercase rounded-full border"
              style={{
                color: "#C5A572",
                borderColor: "rgba(197,165,114,0.4)",
                backgroundColor: "rgba(197,165,114,0.1)",
              }}
            >
              {t("tagline")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            {t("slides.gateway.headline_1")}{" "}
            <span style={{ color: "#C5A572" }}>
              {t("slides.gateway.headline_2")}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          >
            {t("slides.gateway.subheadline")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
          >
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
              style={{ backgroundColor: "#C5A572" }}
            >
              <FileCheck className="w-5 h-5" />
              {t("cta_eligibility")}
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-white/30 transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]"
            >
              {t("cta_apply")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Right Column — Image (40%) ── */}
        <motion.div
          className="lg:col-span-2 relative w-full aspect-[3/4] lg:aspect-auto lg:h-[75vh] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
          >
            <Image
              src="/images/hero/bangkok-aerial-night.jpg"
              alt="Bangkok aerial night view"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>
          {/* Gold accent border */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(197,165,114,0.25)",
            }}
          />
        </motion.div>
      </div>

      {/* Background decorative gradient */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(197,165,114,0.15), transparent 70%)",
        }}
      />
    </section>
  );
}
