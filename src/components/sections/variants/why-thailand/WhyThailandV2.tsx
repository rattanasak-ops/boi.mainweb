"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Cpu,
  BadgePercent,
  Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Data ─── */

interface Advantage {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

const advantages: Advantage[] = [
  { titleKey: "strategic_location", descKey: "strategic_location_desc", icon: MapPin },
  { titleKey: "workforce", descKey: "workforce_desc", icon: GraduationCap },
  { titleKey: "digital_infra", descKey: "digital_infra_desc", icon: Cpu },
  { titleKey: "incentives", descKey: "incentives_desc", icon: BadgePercent },
  { titleKey: "quality_of_life", descKey: "quality_of_life_desc", icon: Plane },
];

/* ─── Timeline Node ─── */

function TimelineNode({
  advantage,
  index,
  t,
}: {
  advantage: Advantage;
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const Icon = advantage.icon;

  return (
    <div ref={ref} className="relative flex items-center w-full">
      {/* Left spacer or card */}
      <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 inline-block text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1B2A4A]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B2A4A]">
                {t(advantage.titleKey)}
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(advantage.descKey)}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full bg-[#C5A572] border-4 border-white shadow-md"
      />

      {/* Right spacer or card */}
      <div className={`w-1/2 ${!isLeft ? "pl-12" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 inline-block text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1B2A4A]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B2A4A]">
                {t(advantage.titleKey)}
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(advantage.descKey)}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function WhyThailandV2() {
  const t = useTranslations("why_thailand");
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-[#C5A572] mb-3">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">
            {t("title_1")} <span className="text-[#C5A572]">{t("title_2")}</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#C5A572]/20 via-[#C5A572]/40 to-[#C5A572]/20 -translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {advantages.map((adv, i) => (
              <TimelineNode key={adv.titleKey} advantage={adv} index={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
