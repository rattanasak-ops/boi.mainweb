"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import NoiseGrain from "@/components/ui/NoiseGrain";

/* ── Easing curves (EEC-inspired) ── */
const GATE_EASE = [0.65, 0, 0.25, 1] as [number, number, number, number];
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ──
   Chamfered bottom-right corner = "opening gate" motif
   Used on buttons, badges, and cards throughout the site */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

export default function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax — Ken Burns scale + vertical drift */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* ================================================
          GATE OPENING REVEAL — BOI Signature Entrance
          Two diagonal panels split apart like opening gates
          Inspired by EEC's cinematic loading screen
          ================================================ */}

      {/* Left gate — diagonal trapezoid */}
      <motion.div
        className="absolute inset-0 z-50 bg-navy-950"
        style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)" }}
        initial={{ x: 0 }}
        animate={{ x: "-110%" }}
        transition={{ duration: 1.4, delay: 0.5, ease: GATE_EASE }}
        aria-hidden="true"
      />

      {/* Right gate — diagonal trapezoid */}
      <motion.div
        className="absolute inset-0 z-50 bg-navy-950"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 55% 100%)" }}
        initial={{ x: 0 }}
        animate={{ x: "110%" }}
        transition={{ duration: 1.4, delay: 0.5, ease: GATE_EASE }}
        aria-hidden="true"
      />

      {/* Gold center seam — the gate hinge line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-[51]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 5%, rgba(197,165,114,0.6) 50%, transparent 95%)",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        aria-hidden="true"
      />

      {/* ================================================
          BACKGROUND — Parallax + Ken Burns zoom
          ================================================ */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/hero/bangkok-skytrain.jpg"
          alt="Modern Bangkok skyline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark cinematic overlay — simplified from 7 layers to 2 */}
      <div className="absolute inset-0 bg-navy-950/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,11,23,0.5)_100%)]" />

      {/* Atmospheric depth */}
      <FloatingOrbs variant="hero" />
      <NoiseGrain opacity={0.03} />

      {/* ================================================
          ANIMATED GOLD LINE — perpetual left-edge accent
          Inspired by EEC's animated decorative lines
          ================================================ */}
      <div
        className="absolute left-8 sm:left-12 lg:left-20 top-0 w-px h-full z-10 bg-gold-500/[0.08]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 w-full h-28 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent"
          animate={{ top: ["-112px", "100%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </div>

      {/* ================================================
          CONTENT — Cinematic center layout
          Max-width 1600px (wider than template 1280px)
          ================================================ */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Badge — polygon clip-path (BOI brand shape) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: EASE_OUT }}
        >
          <span
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.08] border border-white/15 text-gold-300 text-sm font-medium backdrop-blur-md"
            style={{ clipPath: BRAND_SHAPE_SM }}
          >
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* ── HEADLINE — Massive typography ── */}
        <h1 className="mt-6 sm:mt-8">
          {/* "Thailand" — blur-deblur reveal (EEC hero text technique) */}
          <motion.span
            className="block text-[clamp(3.5rem,10vw,9rem)] font-bold text-white leading-[0.95] tracking-[-0.02em]"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease: EASE_OUT }}
          >
            Thailand
          </motion.span>

          {/* "Opens for You" — clip-path expand from center (gate opening motif) */}
          <motion.span
            className="block text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.01em] mt-1 sm:mt-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent"
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            transition={{ duration: 1.0, delay: 2.2, ease: EASE_OUT }}
          >
            Opens for You
          </motion.span>
        </h1>

        {/* Decorative gold line — section accent */}
        <motion.div
          className="mt-6 sm:mt-8 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.8, delay: 2.6, ease: EASE_OUT }}
          aria-hidden="true"
        />

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-base sm:text-lg lg:text-xl text-white/60 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          {t("subheadline")}
        </motion.p>

        {/* ── CTA BUTTONS — Polygon Brand Shape ── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0, ease: EASE_OUT }}
        >
          {/* Primary — gold polygon */}
          <a
            href="#"
            className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-base transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02]"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
            {t("cta_eligibility")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          {/* Secondary — ghost polygon */}
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2.5 px-10 py-5 border-2 border-white/25 text-white font-semibold text-base transition-all duration-300 hover:border-gold-400/60 hover:text-gold-300 backdrop-blur-sm"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
            {t("cta_apply")}
          </a>
        </motion.div>
      </motion.div>

      {/* ================================================
          BOTTOM DIAGONAL TRANSITION
          Navy triangle at bottom-right, creating non-flat
          transition into the next section (StatsSection)
          Inspired by EEC's 75vw border-triangle technique
          ================================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
          aria-hidden="true"
        >
          <polygon
            points="0,120 1600,120 1600,0"
            className="fill-navy-900"
          />
        </svg>
      </div>

      {/* ================================================
          SCROLL INDICATOR
          ================================================ */}
      <motion.div
        className="absolute bottom-[110px] sm:bottom-[130px] lg:bottom-[150px] left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] text-white/35 tracking-[0.35em] uppercase font-medium">
            {t("scroll")}
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-gold-400/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
