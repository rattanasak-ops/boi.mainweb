"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import NoiseGrain from "@/components/ui/NoiseGrain";
import Image from "next/image";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const milestones = [
  { year: "1966", key: "m1966", side: "left" as const },
  { year: "1977", key: "m1977", side: "right" as const },
  { year: "1993", key: "m1993", side: "left" as const },
  { year: "2001", key: "m2001", side: "right" as const },
  { year: "2015", key: "m2015", side: "left" as const },
  { year: "2017", key: "m2017", side: "right" as const },
  { year: "2019", key: "m2019", side: "left" as const },
  { year: "2022", key: "m2022", side: "right" as const },
  { year: "2025", key: "m2025", side: "left" as const },
];

function TimelineNode({
  milestone,
  t,
}: {
  milestone: (typeof milestones)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  const isLeft = milestone.side === "left";

  return (
    <div className="relative flex items-center justify-center">
      {/* Desktop: alternating left/right */}
      <div
        className={`hidden lg:grid grid-cols-[1fr_80px_1fr] w-full items-center gap-0`}
      >
        {/* Left content or spacer */}
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: EASE_OUT,
            }}
            className="text-right pr-10"
          >
            <div className="inline-block bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] p-6 sm:p-8 max-w-md ml-auto hover:border-gold-500/20 transition-all duration-500 group"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
              }}
            >
              <h4 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                {t(`${milestone.key}_title`)}
              </h4>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                {t(`${milestone.key}_desc`)}
              </p>
            </div>
          </motion.div>
        ) : (
          <div />
        )}

        {/* Center — year dot */}
        <div className="flex flex-col items-center relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: EASE_OUT,
            }}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy-950 border-2 border-gold-500/50 shadow-[0_0_30px_rgba(197,165,114,0.15)]"
          >
            <span className="text-sm font-bold text-gold-400">
              {milestone.year}
            </span>
          </motion.div>
        </div>

        {/* Right content or spacer */}
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: EASE_OUT,
            }}
            className="text-left pl-10"
          >
            <div className="inline-block bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] p-6 sm:p-8 max-w-md hover:border-gold-500/20 transition-all duration-500 group"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
              }}
            >
              <h4 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                {t(`${milestone.key}_title`)}
              </h4>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                {t(`${milestone.key}_desc`)}
              </p>
            </div>
          </motion.div>
        ) : (
          <div />
        )}
      </div>

      {/* Mobile/Tablet: left-aligned */}
      <div className="lg:hidden flex items-start gap-4 w-full">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-950 border-2 border-gold-500/50 shadow-[0_0_20px_rgba(197,165,114,0.15)]"
        >
          <span className="text-xs font-bold text-gold-400">
            {milestone.year}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="flex-1 bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] p-5 sm:p-6"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
          }}
        >
          <h4 className="text-base font-bold text-white">
            {t(`${milestone.key}_title`)}
          </h4>
          <p className="mt-1.5 text-sm text-white/50 leading-relaxed">
            {t(`${milestone.key}_desc`)}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const t = useTranslations("about_page.timeline");
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
          src="/images/stats/bangkok-night.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-16 sm:mb-24"
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
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop center */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px]">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: EASE_OUT }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Vertical line — mobile left */}
          <div className="lg:hidden absolute left-7 top-0 bottom-0 w-[2px]">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.5, ease: EASE_OUT }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Milestone nodes */}
          <div className="flex flex-col gap-10 lg:gap-16">
            {milestones.map((milestone) => (
              <TimelineNode
                key={milestone.year}
                milestone={milestone}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom diagonal transition */}
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
