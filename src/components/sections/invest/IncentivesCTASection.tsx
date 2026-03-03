"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

export default function IncentivesCTASection() {
  const t = useTranslations("incentives_page.cta");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-gold-600 font-medium text-sm tracking-[0.25em] uppercase mb-5"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto"
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
              href="/invest/eligibility-checker"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_8px_30px_rgba(197,165,114,0.3)]"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              {t("cta_check")}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/invest/eligible-activities"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-navy-600/30 text-navy-600 font-semibold text-lg hover:bg-navy-600/5 hover:border-gold-500/40 transition-all duration-300"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              {t("cta_activities")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
