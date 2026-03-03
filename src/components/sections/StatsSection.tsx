"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { TrendingUp, Landmark, Globe2, Users, ArrowRight } from "lucide-react";
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
    hoverKey: "hover_projects",
    ringPercent: 85,
  },
  {
    icon: TrendingUp,
    target: 850,
    prefix: "฿",
    suffix: "B",
    labelKey: "total_investment",
    contextKey: "context_investment",
    hoverKey: "hover_investment",
    ringPercent: 92,
  },
  {
    icon: Globe2,
    target: 50,
    suffix: "+",
    labelKey: "countries",
    contextKey: "context_countries",
    hoverKey: "hover_countries",
    ringPercent: 50,
  },
  {
    icon: Users,
    target: 500,
    suffix: "K+",
    labelKey: "jobs",
    contextKey: "context_jobs",
    hoverKey: "hover_jobs",
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

  /* ── 3D Tilt — mouse-reactive on the stats panel ── */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -5);
    rotateY.set(x * 5);
  };

  const handlePanelMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ================================================
          BACKGROUND — Parallax Bangkok at night (LIGHTER)
          ================================================ */}
      <motion.div
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/stats/bangkok-night.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Cinematic overlays — LIGHTER: เห็นแสงไฟกรุงเทพจริง */}
      <div className="absolute inset-0 bg-navy-900/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-800/70 via-transparent to-navy-800/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,165,114,0.08)_0%,transparent_60%)]" />
      <NoiseGrain opacity={0.02} />

      {/* ================================================
          CONTENT
          ================================================ */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-24 sm:py-32">
        {/* ── Section header — Gate Opening title reveal ── */}
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
          {/* Gate Opening — title reveals from center outward */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        {/* ── Stats panel — 3D Tilt glass card ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          className="relative p-8 sm:p-10 lg:p-14 bg-navy-900/40 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
            transformPerspective: 1200,
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
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

          {/* Traveling light sweep — connects all stats visually */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <motion.div
              className="absolute top-0 bottom-0 w-[300px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(197,165,114,0.06), transparent)",
              }}
              initial={{ x: "-300px" }}
              whileInView={{ x: "2000px" }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
            />
          </div>

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

                {/* Number — Gate Opening reveal + Gold gradient text */}
                <motion.div
                  initial={{ clipPath: "inset(0 50% 0 50%)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.2,
                    ease: EASE_OUT,
                  }}
                >
                  <p className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-none">
                    <span className="inline-block bg-gradient-to-b from-gold-200 via-white via-60% to-gold-200 bg-clip-text text-transparent">
                      <AnimatedCounter
                        target={stat.target}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2.5}
                        delay={0.6 + i * 0.2}
                      />
                    </span>
                  </p>
                </motion.div>

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

                {/* Hover comparison — reveals on hover */}
                <p className="mt-1.5 text-[11px] sm:text-xs text-gold-300/80 font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {t(stat.hoverKey)}
                </p>

                {/* Vertical divider — enhanced with glow dots */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/4 h-1/2 w-px">
                    <motion.div
                      className="h-full w-full bg-gradient-to-b from-transparent via-gold-400/25 to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + i * 0.15,
                        ease: EASE_OUT,
                      }}
                    />
                    {/* Glow dot at center of divider */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-400/40 shadow-[0_0_6px_rgba(197,165,114,0.3)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: [0, 1.5, 1] }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 1.2 + i * 0.15,
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

        {/* ── CTA — Open Full Report ── */}
        <motion.div
          className="text-center mt-10 sm:mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.5, ease: EASE_OUT }}
        >
          <a
            href="#"
            className="group/cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-semibold text-sm shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />
            <span className="relative">{t("cta")}</span>
            <ArrowRight className="relative w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
          </a>
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
