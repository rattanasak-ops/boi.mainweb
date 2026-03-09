"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowRight, TrendingUp, Globe2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import NoiseGrain from "@/components/ui/NoiseGrain";
import { useRef, useState, useCallback, type MouseEvent } from "react";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */
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

/* ────────────────────────────────────────────
   CONSTANTS
   ──────────────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)";
const BRAND_SHAPE_PANEL =
  "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)";

/* ────────────────────────────────────────────
   WORD SPLIT REVEAL — Cinematic text entrance
   ──────────────────────────────────────────── */
function SplitTitle({
  text,
  isGold = false,
  delay = 0,
}: {
  text: string;
  isGold?: boolean;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: EASE_OUT,
          }}
          className={
            isGold
              ? "bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent"
              : "text-white"
          }
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ────────────────────────────────────────────
   STATS PANEL — Magnetic Tilt + Cursor Glow
   ──────────────────────────────────────────── */
function StatsPanel({
  t,
}: {
  t: ReturnType<typeof useTranslations>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 200,
    damping: 25,
  });

  // Cursor glow
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(350px circle at ${x}% ${y}%, rgba(197,165,114,0.12), transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [mouseX, mouseY, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
      className="relative"
    >
      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative p-8 sm:p-10 lg:p-12 bg-navy-950/60 backdrop-blur-xl border border-white/[0.06] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ clipPath: BRAND_SHAPE_PANEL }}
        >
          {/* Top gold accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

          {/* Cursor glow overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: glowBg }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="space-y-8 sm:space-y-10 relative z-20">
            {ctaStats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.15,
                  ease: EASE_OUT,
                }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-6 relative"
              >
                {/* Icon with spin-in animation */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold-500/20"
                >
                  <stat.icon
                    className="h-7 w-7 text-gold-400"
                    aria-hidden="true"
                  />
                </motion.div>

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

                {/* Hover glow behind stat row */}
                <div className="absolute -inset-3 rounded-xl bg-gold-500/0 group-hover:bg-gold-500/[0.03] transition-colors duration-300 -z-10" />

                {/* Divider */}
                {i < ctaStats.length - 1 && (
                  <div className="absolute left-0 right-0 -bottom-4 sm:-bottom-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panel outer glow on hover */}
        <motion.div
          className="absolute -inset-[1px] pointer-events-none z-[-1]"
          style={{ clipPath: BRAND_SHAPE_PANEL }}
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(197,165,114,0.12), 0 25px 80px rgba(197,165,114,0.06)"
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   MAIN CTA SECTION
   ──────────────────────────────────────────── */
export default function CTASection() {
  const t = useTranslations("cta");

  // Parallax background
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* ================================================
          BACKGROUND — Parallax temple image
          ================================================ */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero/golden-arch.jpg"
          alt=""
          fill
          className="object-cover scale-110"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/40" />

      {/* Atmospheric layers */}
      <FloatingOrbs variant="section" />
      <NoiseGrain opacity={0.03} />

      {/* Top gold accent line — expand animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent origin-center"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            TWO-COLUMN LAYOUT — Text left, Stats right
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Message */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {/* Subtitle badge with shimmer */}
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2 border border-gold-500/20 text-gold-400 text-sm font-medium"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                background:
                  "linear-gradient(110deg, rgba(197,165,114,0.1) 0%, rgba(217,190,134,0.15) 25%, rgba(240,228,204,0.2) 50%, rgba(217,190,134,0.15) 75%, rgba(197,165,114,0.1) 100%)",
                backgroundSize: "200% 100%",
                animation: "cta-shimmer 4s ease-in-out infinite",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("subtitle")}
            </motion.span>

            {/* Title — Split word reveal */}
            <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <SplitTitle
                text={t("title").split(" ").slice(0, -1).join(" ")}
                delay={0.3}
              />
              <SplitTitle
                text={t("title").split(" ").slice(-1).join("")}
                isGold
                delay={0.3 + t("title").split(" ").length * 0.08}
              />
            </h2>

            {/* Gold line — expand from left */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
              className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
              className="mt-6 text-lg text-white/55 max-w-lg leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTA Button — with animated glow ring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10"
            >
              <div className="relative inline-block">
                {/* Glow ring pulse behind button */}
                <div
                  className="absolute -inset-1 opacity-70"
                  style={{
                    clipPath: BRAND_SHAPE,
                    background:
                      "linear-gradient(135deg, rgba(197,165,114,0.4), rgba(217,190,134,0.2))",
                    animation: "cta-glow-pulse 3s ease-in-out infinite",
                  }}
                />
                <Link
                  href="/invest/getting-started"
                  className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.03] active:scale-[0.97]"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {t("cta_button")}
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Stats panel */}
          <StatsPanel t={t} />
        </div>
      </div>
    </section>
  );
}
