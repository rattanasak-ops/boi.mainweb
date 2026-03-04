"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Building2, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";

const zones = [
  {
    icon: Zap,
    key: "eec",
    image: "/images/hero/expressway-trails.jpg",
    featured: true,
  },
  {
    icon: MapPin,
    key: "sez",
    image: "/images/why-thailand/industrial-estate.jpg",
    featured: false,
  },
  {
    icon: Building2,
    key: "industrial",
    image: "/images/why-thailand/shipping-port.jpg",
    featured: false,
  },
];

export default function SpecialZonesSection() {
  const t = useTranslations("discover_page.zones");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-24 sm:py-32 bg-surface overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 leading-[1.1] tracking-tight">
              {t("title_1")}
              <br />
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex items-end"
          >
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* Zone cards — EEC featured + 2 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* EEC — Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="lg:row-span-2"
          >
            <div
              className="group relative h-full min-h-[400px] lg:min-h-0 overflow-hidden bg-navy-900"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <Image
                src={zones[0].image}
                alt={t(`${zones[0].key}_name`)}
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_-60px_80px_rgba(7,11,23,0.3)]" />

              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 backdrop-blur-sm mb-4">
                  <Zap
                    className="h-6 w-6 text-gold-400"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-gold-400 text-sm font-medium tracking-wide uppercase mb-2">
                  {t(`${zones[0].key}_tag`)}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-gold-200 transition-colors duration-300">
                  {t(`${zones[0].key}_name`)}
                </h3>
                <p className="text-white/60 leading-relaxed max-w-md">
                  {t(`${zones[0].key}_desc`)}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gold-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {tCommon("learn_more")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEZ + Industrial estates */}
          {zones.slice(1).map((zone, i) => (
            <motion.div
              key={zone.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: EASE_OUT,
              }}
            >
              <div
                className="group relative h-[280px] overflow-hidden bg-navy-900"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <Image
                  src={zone.image}
                  alt={t(`${zone.key}_name`)}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 backdrop-blur-sm mb-3">
                    <zone.icon
                      className="h-5 w-5 text-gold-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    {t(`${zone.key}_name`)}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                    {t(`${zone.key}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
