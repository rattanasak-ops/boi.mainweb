"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FileDown,
  FileText,
  Gift,
  Globe,
  Handshake,
  Headphones,
  HelpCircle,
  MapPin,
  Megaphone,
  Monitor,
  Newspaper,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Stamp,
  Trophy,
  Video,
  type LucideIcon,
} from "lucide-react";
import NoiseGrain from "@/components/ui/NoiseGrain";
import GlowCard from "@/components/ui/GlowCard";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Icon map (string → component, avoids passing functions across Server/Client boundary) ── */
const ICON_MAP: Record<string, LucideIcon> = {
  BarChart3, BookOpen, Building2, Calculator, CalendarClock,
  ClipboardCheck, ClipboardList, Factory, FileDown, FileText,
  Gift, Globe, Handshake, Headphones, HelpCircle, MapPin,
  Megaphone, Monitor, Newspaper, Phone, Rocket, Shield,
  Sparkles, Stamp, Trophy, Video,
};

/* ── Types ── */
export interface RelatedItem {
  href: string;
  /** Lucide icon name as string (e.g. "Rocket", "FileText") */
  icon: string;
  /** Key into related_content.items.{key}.title / .description */
  translationKey: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  /** Max items to render (default 3) */
  maxItems?: number;
}

/**
 * RelatedContent — Dark cinematic cross-linking section.
 *
 * P-A (IA Architect): curated 3 related links per page to kill dead-ends.
 * P-B (Component Engineer): reusable across all 30+ pages, i18n-ready.
 * P-C (Motion Designer): staggered whileInView + GlowCard + BRAND_SHAPE.
 *
 * Usage:
 * <RelatedContent items={[
 *   { href: "/invest/getting-started", icon: Rocket, translationKey: "getting_started" },
 *   { href: "/services/apply", icon: FileText, translationKey: "apply" },
 *   { href: "/contact", icon: Phone, translationKey: "contact" },
 * ]} />
 */
export default function RelatedContent({
  items,
  maxItems = 3,
}: RelatedContentProps) {
  const t = useTranslations("related_content");
  const visibleItems = items.slice(0, maxItems);

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <motion.div
            className="mt-5 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          />
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Rocket;
            return (
              <motion.div
                key={item.translationKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * i,
                  ease: EASE_OUT,
                }}
              >
                <Link href={item.href} className="group block h-full">
                  <GlowCard className="h-full" borderRadius="0px">
                    <div
                      className="h-full bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] hover:border-gold-500/20 transition-all duration-500 p-6 sm:p-8 flex flex-col"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      {/* Icon */}
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 transition-colors duration-300">
                        <Icon
                          className="h-6 w-6 text-gold-400"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors duration-300">
                        {t(`items.${item.translationKey}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                        {t(`items.${item.translationKey}.description`)}
                      </p>

                      {/* Arrow link */}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:gap-3 transition-all duration-300">
                        {t("explore")}
                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
