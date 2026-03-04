"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NoiseGrain from "@/components/ui/NoiseGrain";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ThailandOverviewHero() {
  const t = useTranslations("thailand_overview.hero");
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax — BG image moves slower than content */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] overflow-hidden bg-navy-950"
    >
      {/* ── Background Image with Parallax ── */}
      <motion.div
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero/bangkok-aerial-night.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 bg-navy-950/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-navy-950/60 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,11,23,0.4)_100%)] z-[1]" />
      <NoiseGrain opacity={0.03} />

      {/* ── Animated gold accent line ── */}
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

      {/* ── Content ── */}
      <motion.div
        className="relative z-20 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pt-32 pb-20 sm:pb-24 lg:pb-28 flex flex-col justify-end min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="flex items-center gap-2 text-sm text-white/40 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-gold-400 transition-colors duration-200"
          >
            {t("breadcrumb_home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" aria-hidden="true" />
          <Link
            href="/discover"
            className="hover:text-gold-400 transition-colors duration-200"
          >
            {t("breadcrumb_discover")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" aria-hidden="true" />
          <span className="text-gold-400/70">{t("breadcrumb")}</span>
        </motion.nav>

        {/* Eyebrow */}
        <motion.p
          className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          {t("eyebrow")}
        </motion.p>

        {/* Title — Gate Opening reveal from center */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl"
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 sm:mt-6 text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Decorative gold line */}
        <motion.div
          className="mt-8 h-[2px] w-24 bg-gradient-to-r from-gold-500 to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Bottom diagonal transition ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg
          viewBox="0 0 1600 80"
          preserveAspectRatio="none"
          className="block w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          aria-hidden="true"
        >
          <polygon points="0,80 1600,80 1600,0" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
