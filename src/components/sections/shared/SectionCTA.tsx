"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

/* ── Types ── */
interface SectionCTAProps {
  /** Translation namespace — reads .eyebrow, .title, .description, .cta_primary, .cta_secondary */
  ns: string;
  primaryHref: string;
  primaryIcon?: LucideIcon;
  secondaryHref?: string;
  secondaryIcon?: LucideIcon;
}

/**
 * SectionCTA — Reusable page-end call-to-action.
 *
 * P-B (Component Engineer): follows ServicesCTASection pattern.
 * P-C (Motion Designer): cinematic dark bg + gold CTA buttons + BRAND_SHAPE.
 *
 * Translation keys expected at `{ns}`:
 *   .eyebrow, .title, .description, .cta_primary, .cta_secondary (optional)
 */
export default function SectionCTA({
  ns,
  primaryHref,
  primaryIcon: PrimaryIcon,
  secondaryHref,
  secondaryIcon: SecondaryIcon,
}: SectionCTAProps) {
  const t = useTranslations(ns);

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          >
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_30px_rgba(197,165,114,0.3)]"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {PrimaryIcon && (
                <PrimaryIcon className="h-5 w-5" aria-hidden="true" />
              )}
              {t("cta_primary")}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {secondaryHref && (
              <Link
                href={secondaryHref}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold text-lg hover:bg-white/5 hover:border-gold-500/40 transition-all duration-300"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {SecondaryIcon && (
                  <SecondaryIcon className="h-5 w-5" aria-hidden="true" />
                )}
                {t("cta_secondary")}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
