"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  { titleKey: "einvestment", descKey: "einvestment_desc", href: "/services/e-investment", image: "/images/services/e-investment.jpg" },
  { titleKey: "visa", descKey: "visa_desc", href: "/services/visa", image: "/images/services/visa-workpermit.jpg" },
  { titleKey: "smart_visa", descKey: "smart_visa_desc", href: "/services/smart-visa", image: "/images/services/smart-visa.jpg" },
  { titleKey: "osos", descKey: "osos_desc", href: "/services/osos", image: "/images/services/osos.jpg" },
  { titleKey: "matchmaking", descKey: "matchmaking_desc", href: "/services/matchmaking", image: "/images/services/business-matching.jpg" },
  { titleKey: "incentive_calc", descKey: "incentive_calc_desc", href: "/invest/incentives", image: "/images/services/incentive-calculator.jpg" },
] as const;

export default function ServicesV3() {
  const t = useTranslations("services");

  return (
    <section className="w-full bg-[#1B2A4A] py-20">
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
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("tagline")}</p>
        </motion.div>

        {/* 2x3 Mega Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
            >
              <Link
                href={svc.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
              >
                {/* Background image */}
                <Image
                  src={svc.image}
                  alt={t(svc.titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-colors duration-300 group-hover:from-black/90" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">
                    {t(svc.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">
                    {t(svc.descKey)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#C5A572] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Gold top-border accent */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-[#C5A572] transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
