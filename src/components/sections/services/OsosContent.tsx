"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  Building2,
  Stamp,
  Globe,
  Headphones,
  MapPin,
  Clock,
  Phone,
  Handshake,
} from "lucide-react";

/* ── Easing curves ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape ── */
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

/* ── Services list ── */
const serviceItems = [
  { key: "service1", icon: FileText },
  { key: "service2", icon: UserCheck },
  { key: "service3", icon: Building2 },
  { key: "service4", icon: Stamp },
  { key: "service5", icon: Globe },
  { key: "service6", icon: Headphones },
] as const;

/* ── Partners ── */
const partners = ["partner1", "partner2", "partner3", "partner4"] as const;

export default function OsosContent() {
  const t = useTranslations("osos_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/15 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            ABOUT SECTION
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("about_eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-600 leading-[1.1] tracking-tight mb-6">
            {t("about_title")}
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-6" />
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {t("about_description")}
          </p>
        </motion.div>

        {/* ================================================
            SERVICES LIST — 6 items in 2x3 grid
            ================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {serviceItems.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: EASE_OUT,
              }}
              className="group"
            >
              <div
                className="relative h-full p-8 sm:p-10 bg-white border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/[0.06] overflow-hidden"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/50 group-hover:to-gold-100/30 transition-all duration-500 pointer-events-none" />

                {/* Top gold accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Icon */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300 mb-6">
                  <service.icon
                    className="h-6 w-6 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-navy-950 transition-colors duration-300">
                  {t(`${service.key}_title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-text-secondary leading-relaxed">
                  {t(`${service.key}_desc`)}
                </p>

                {/* Bottom corner accent */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="w-5 h-[1px] bg-gold-400/40" />
                  <div className="w-[1px] h-5 bg-gold-400/40 ml-auto -mt-px" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================================================
            LOCATION CARD + PARTNER AGENCIES
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="group"
          >
            <div
              className="relative h-full p-8 sm:p-10 bg-navy-950 overflow-hidden"
              style={{ clipPath: BRAND_SHAPE }}
            >
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-navy-950 to-navy-950" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(197,165,114,0.06)_0%,transparent_60%)]" />

              {/* Top gold accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
                style={{ transformOrigin: "left" }}
              />

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-6">
                  <MapPin
                    className="h-6 w-6 text-gold-400"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  {t("location_title")}
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold-400/70 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-base text-white/60 leading-relaxed">
                      {t("location_address")}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold-400/70 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-base text-white/60 leading-relaxed">
                      {t("location_hours")}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gold-400/70 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-base text-white/60 leading-relaxed">
                      {t("location_phone")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partner Agencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("partners_eyebrow")}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy-600 mb-6">
              {t("partners_title")}
            </h3>
            <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8" />

            <div className="flex flex-col gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                  className="group flex items-center gap-4 p-5 bg-white border border-border hover:border-gold-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/[0.06]"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-950/[0.06] border border-navy-950/10 group-hover:bg-gold-500/10 group-hover:border-gold-400/30 transition-all duration-300">
                    <Handshake
                      className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy-600 group-hover:text-navy-950 transition-colors duration-300">
                      {t(`${partner}_name`)}
                    </h4>
                    <p className="mt-0.5 text-sm text-text-secondary">
                      {t(`${partner}_desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
