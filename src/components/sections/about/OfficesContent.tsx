"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Printer,
  Mail,
  Clock,
  Building2,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const REGIONAL_OFFICES = [
  "region_1",
  "region_2",
  "region_3",
  "region_4",
  "region_5",
  "region_6",
  "region_7",
] as const;

const OVERSEAS_OFFICES = [
  "tokyo",
  "osaka",
  "beijing",
  "shanghai",
  "taipei",
  "seoul",
  "singapore",
  "mumbai",
  "sydney",
  "stockholm",
  "frankfurt",
  "paris",
  "new_york",
  "los_angeles",
  "riyadh",
] as const;

export default function OfficesContent() {
  const t = useTranslations("offices_page.content");

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ── HQ Featured Card ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            {t("hq_eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight mb-8">
            {t("hq_title")}
          </h2>

          <div
            className="relative bg-white border border-border p-8 sm:p-10 lg:p-12 hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
            style={{ clipPath: BRAND_SHAPE }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(197,165,114,0.5) 30%, rgba(197,165,114,0.5) 70%, transparent)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Name & Address */}
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 mb-5">
                  <Building2
                    className="h-6 w-6 text-gold-500"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy-600 mb-4">
                  {t("hq_name")}
                </h3>
                <div className="flex items-start gap-3 text-text-secondary">
                  <MapPin
                    className="h-5 w-5 text-gold-500 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed">{t("hq_address")}</p>
                </div>
              </div>

              {/* Right: Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Phone
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_phone")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("hq_phone")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Printer
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_fax")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("hq_fax")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Mail
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_email")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("hq_email")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600/5">
                    <Clock
                      className="h-4 w-4 text-navy-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-0.5">
                      {t("label_hours")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {t("hq_hours")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Regional Offices ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <MapPin
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("regional_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("regional_title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {REGIONAL_OFFICES.map((region, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group h-full bg-white border border-border p-6 hover:border-gold-500/30 hover:shadow-[0_12px_30px_rgba(27,42,74,0.06)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <h4 className="text-base font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300">
                    {t(`${region}_name`)}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {t(`${region}_coverage`)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{t(`${region}_phone`)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Overseas Offices ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20">
              <Globe2
                className="h-5 w-5 text-gold-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-gold-600 font-medium text-xs tracking-[0.2em] uppercase">
                {t("overseas_eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 tracking-tight">
                {t("overseas_title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OVERSEAS_OFFICES.map((office, i) => (
              <motion.div
                key={office}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.45,
                  delay: 0.04 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group flex items-center justify-between bg-white border border-border px-5 py-4 hover:border-gold-500/30 hover:shadow-[0_8px_20px_rgba(27,42,74,0.04)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600/5 shrink-0">
                      <Globe2
                        className="h-4 w-4 text-navy-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-600 group-hover:text-gold-600 transition-colors duration-300">
                        {t(`overseas_${office}_name`)}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {t(`overseas_${office}_country`)}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-text-secondary/30 group-hover:text-gold-500 transition-colors duration-300 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
