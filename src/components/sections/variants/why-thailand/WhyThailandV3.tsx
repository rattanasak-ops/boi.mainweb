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
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

/* ─── Data ─── */

interface Advantage {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  image: string;
}

const advantages: Advantage[] = [
  {
    titleKey: "strategic_location",
    descKey: "strategic_location_desc",
    icon: MapPin,
    image: "/images/why-thailand/shipping-port.jpg",
  },
  {
    titleKey: "workforce",
    descKey: "workforce_desc",
    icon: GraduationCap,
    image: "/images/why-thailand/digital-workforce.jpg",
  },
  {
    titleKey: "digital_infra",
    descKey: "digital_infra_desc",
    icon: Cpu,
    image: "/images/why-thailand/industrial-estate.jpg",
  },
  {
    titleKey: "incentives",
    descKey: "incentives_desc",
    icon: BadgePercent,
    image: "/images/why-thailand/investment-growth.jpg",
  },
  {
    titleKey: "quality_of_life",
    descKey: "quality_of_life_desc",
    icon: Plane,
    image: "/images/why-thailand/lifestyle-livability.jpg",
  },
];

/* ─── Main Component ─── */

export default function WhyThailandV3() {
  const t = useTranslations("why_thailand");
  const [activeIndex, setActiveIndex] = useState(0);
  const active = advantages[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-24 bg-[#1B2A4A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-[#C5A572] mb-3">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("title_1")}{" "}
            <span className="text-[#C5A572]">{t("title_2")}</span>
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Tabs */}
          <div className="flex flex-col gap-1">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              const isActive = i === activeIndex;

              return (
                <button
                  key={adv.titleKey}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative flex items-center gap-4 px-6 py-5 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border border-[#C5A572]/40"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Gold left accent */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-accent"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#C5A572]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-[#C5A572]/20" : "bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? "text-[#C5A572]" : "text-slate-400"
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-semibold transition-colors ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {t(adv.titleKey)}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-slate-400 mt-1 leading-relaxed"
                      >
                        {t(adv.descKey)}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0f1d35]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={t(active.titleKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/70 via-transparent to-transparent" />

                {/* Label overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A572]/20 backdrop-blur-sm flex items-center justify-center">
                      <ActiveIcon className="w-5 h-5 text-[#C5A572]" />
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      {t(active.titleKey)}
                    </h4>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
