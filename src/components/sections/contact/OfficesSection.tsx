"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe2 } from "lucide-react";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const OFFICES = [
  { key: "headquarters", icon: MapPin, featured: true },
  { key: "tokyo", icon: Globe2, featured: false },
  { key: "beijing", icon: Globe2, featured: false },
  { key: "new_york", icon: Globe2, featured: false },
  { key: "frankfurt", icon: Globe2, featured: false },
  { key: "seoul", icon: Globe2, featured: false },
];

export default function OfficesSection() {
  const t = useTranslations("contact_page.offices");

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
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
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* HQ Featured + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {OFFICES.map((office, i) => (
            <motion.div
              key={office.key}
              className={office.featured ? "lg:col-span-3" : ""}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <div
                className={`h-full p-6 sm:p-8 border transition-all duration-500 ${
                  office.featured
                    ? "bg-gradient-to-r from-navy-950/80 to-navy-900/60 backdrop-blur-xl border-gold-500/20"
                    : "bg-navy-950/60 backdrop-blur-xl border-white/[0.07] hover:border-gold-500/20"
                }`}
                style={{ clipPath: BRAND_SHAPE }}
              >
                {office.featured ? (
                  /* HQ — horizontal layout */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30">
                          <office.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-gold-400 text-xs font-semibold uppercase tracking-wide">
                            {t("hq_badge")}
                          </p>
                          <h3 className="text-xl font-bold text-white">
                            {t(`${office.key}_name`)}
                          </h3>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">
                        {t(`${office.key}_address`)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                        {t(`${office.key}_phone`)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
                        {t(`${office.key}_email`)}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Overseas offices — vertical layout */
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-4">
                      <office.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {t(`${office.key}_name`)}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-3">
                      {t(`${office.key}_address`)}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Phone className="h-3.5 w-3.5 text-gold-400/60" aria-hidden="true" />
                      {t(`${office.key}_phone`)}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
