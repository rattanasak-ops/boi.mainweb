"use client";

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

export default function ServicesV2() {
  const t = useTranslations("services");

  return (
    <section className="w-full bg-[#F8FAFC] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1B2A4A] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-[#1B2A4A]/60">{t("tagline")}</p>
        </motion.div>

        {/* Two-column icon list */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.titleKey}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_OUT }}
              >
                <Link
                  href={svc.href}
                  className="group flex items-start gap-4 rounded-xl border border-[#1B2A4A]/10 bg-white p-5 transition-all duration-300 hover:border-[#C5A572]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1B2A4A]/5 text-[#C5A572] transition-colors group-hover:bg-[#C5A572]/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1B2A4A] group-hover:text-[#C5A572] transition-colors">
                      {t(svc.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#1B2A4A]/60">
                      {t(svc.descKey)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#C5A572] opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
