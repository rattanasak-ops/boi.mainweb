"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  FileText,
  Stamp,
  Globe2,
  Building2,
  Handshake,
  Calculator,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  { titleKey: "einvestment", descKey: "einvestment_desc", href: "/services/e-investment", icon: FileText },
  { titleKey: "visa", descKey: "visa_desc", href: "/services/visa", icon: Stamp },
  { titleKey: "smart_visa", descKey: "smart_visa_desc", href: "/services/smart-visa", icon: Globe2 },
  { titleKey: "osos", descKey: "osos_desc", href: "/services/osos", icon: Building2 },
  { titleKey: "matchmaking", descKey: "matchmaking_desc", href: "/services/matchmaking", icon: Handshake },
  { titleKey: "incentive_calc", descKey: "incentive_calc_desc", href: "/invest/incentives", icon: Calculator },
] as const;

export default function ServicesV4() {
  const t = useTranslations("services");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#1B2A4A] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header + nav arrows */}
        <div className="mb-10 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
              {t("subtitle")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-white/50">{t("tagline")}</p>
          </motion.div>

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.titleKey}
                className="w-[280px] shrink-0 snap-start md:w-[320px]"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
              >
                <Link
                  href={svc.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#C5A572]/40 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C5A572]/10 text-[#C5A572]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#C5A572] transition-colors">
                    {t(svc.titleKey)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                    {t(svc.descKey)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#C5A572]">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
