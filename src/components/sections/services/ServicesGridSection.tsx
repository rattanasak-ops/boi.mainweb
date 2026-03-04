"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FileText,
  Globe2,
  CreditCard,
  Users,
  Building2,
  Headphones,
  Shield,
  ArrowRight,
  Zap,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const SERVICES = [
  { key: "e_investment", icon: FileText, featured: true },
  { key: "visa_work_permit", icon: Globe2, featured: true },
  { key: "smart_visa", icon: Zap, featured: false },
  { key: "osos", icon: Users, featured: false },
  { key: "hq_portal", icon: Building2, featured: false },
  { key: "after_promotion", icon: Shield, featured: false },
  { key: "consultation", icon: Headphones, featured: false },
  { key: "tax_calculator", icon: CreditCard, featured: false },
];

export default function ServicesGridSection() {
  const t = useTranslations("services_page.grid");

  const featuredServices = SERVICES.filter((s) => s.featured);
  const otherServices = SERVICES.filter((s) => !s.featured);

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* Featured services — 2-column large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featuredServices.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE_OUT }}
            >
              <TiltCard className="h-full">
                <div
                  className="relative h-full p-8 sm:p-10 bg-navy-950 border border-gold-500/20 shadow-[0_30px_80px_rgba(27,42,74,0.15)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Gold accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(197,165,114,0.8), rgba(212,184,150,1), rgba(197,165,114,0.8))",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE_OUT }}
                  />

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 mb-6">
                    <service.icon className="h-7 w-7 text-gold-400" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t(`${service.key}_name`)}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {t(`${service.key}_desc`)}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:gap-3 transition-all duration-300 cursor-pointer">
                    {t("access_service")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other services — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE_OUT }}
            >
              <div
                className="group h-full p-6 sm:p-8 bg-white border border-border hover:border-gold-500/20 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                  <service.icon
                    className="h-6 w-6 text-gold-500 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                  {t(`${service.key}_name`)}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {t(`${service.key}_desc`)}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300 cursor-pointer">
                  {t("access_service")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
