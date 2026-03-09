"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTAV4() {
  const t = useTranslations("cta");

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="flex flex-col items-center justify-between gap-6 border-y border-[#1B2A4A]/10 py-10 sm:flex-row"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
              {t("subtitle")}
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#1B2A4A] md:text-2xl">
              {t("title")}
            </h2>
            <p className="mt-1 text-sm text-[#1B2A4A]/60">
              {t("description")}
            </p>
          </div>

          {/* CTA button */}
          <Link
            href="/invest/getting-started"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#C5A572] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
          >
            {t("cta_button")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
