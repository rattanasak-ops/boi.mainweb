"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Cpu,
  BadgePercent,
  Plane,
  ChevronDown,
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

/* ─── Accordion Item ─── */

function AccordionCard({
  advantage,
  isOpen,
  onToggle,
  t,
}: {
  advantage: Advantage;
  isOpen: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = advantage.icon;

  return (
    <div
      className={`rounded-2xl border-2 transition-colors duration-300 overflow-hidden ${
        isOpen
          ? "border-[#C5A572] bg-white shadow-lg shadow-[#C5A572]/5"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
            isOpen ? "bg-[#C5A572]/15" : "bg-[#1B2A4A]/5"
          }`}
        >
          <Icon
            className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-[#C5A572]" : "text-[#1B2A4A]"
            }`}
          />
        </div>

        <h3
          className={`flex-1 font-semibold text-lg transition-colors duration-300 ${
            isOpen ? "text-[#1B2A4A]" : "text-slate-700"
          }`}
        >
          {t(advantage.titleKey)}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-[#C5A572]" : "text-slate-400"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 pl-[4.75rem]">
              <p className="text-slate-600 leading-relaxed">
                {t(advantage.descKey)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */

export default function WhyThailandV4() {
  const t = useTranslations("why_thailand");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-[#C5A572] mb-3">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">
            {t("title_1")}{" "}
            <span className="text-[#C5A572]">{t("title_2")}</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {advantages.map((adv, i) => (
            <AccordionCard
              key={adv.titleKey}
              advantage={adv}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
