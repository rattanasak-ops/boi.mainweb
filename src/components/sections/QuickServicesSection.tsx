"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FileText,
  Stamp,
  Globe2,
  Building2,
  Handshake,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

/* ── Service data with varied sizes ── */
const services = [
  {
    icon: FileText,
    titleKey: "einvestment",
    descKey: "einvestment_desc",
    href: "/services/e-investment",
    accent: "from-gold-500 to-amber-400",
    size: "featured" as const,
  },
  {
    icon: Stamp,
    titleKey: "visa",
    descKey: "visa_desc",
    href: "/services/visa",
    accent: "from-navy-500 to-navy-400",
    size: "wide" as const,
  },
  {
    icon: Globe2,
    titleKey: "smart_visa",
    descKey: "smart_visa_desc",
    href: "/services/smart-visa",
    accent: "from-gold-500 to-gold-300",
    size: "normal" as const,
  },
  {
    icon: Building2,
    titleKey: "osos",
    descKey: "osos_desc",
    href: "/services/osos",
    accent: "from-navy-500 to-navy-300",
    size: "normal" as const,
  },
  {
    icon: Handshake,
    titleKey: "matchmaking",
    descKey: "matchmaking_desc",
    href: "/services/matchmaking",
    accent: "from-gold-500 to-amber-300",
    size: "normal" as const,
  },
  {
    icon: Calculator,
    titleKey: "incentive_calc",
    descKey: "incentive_calc_desc",
    href: "/services/incentive-calculator",
    accent: "from-navy-400 to-navy-600",
    size: "wide" as const,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

export default function QuickServicesSection() {
  const t = useTranslations("services");

  /* Split services for the layout:
     Row 1: featured (tall) + wide card
     Row 2: 3 normal cards
     Row 3: wide card */
  const featured = services[0];
  const wideTop = services[1];
  const normals = services.slice(2, 5);
  const wideBottom = services[5];

  return (
    <section className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197,165,114,0.5) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Gold radial accent glow */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(197,165,114,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Animated gold vertical line — right edge */}
      <div
        className="absolute right-8 sm:right-12 lg:right-20 top-0 w-px h-full bg-gold-500/[0.06]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-gold-400/40 to-transparent"
          animate={{ top: ["100%", "-128px"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            HEADER — Left-aligned, editorial style
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 sm:mb-20 max-w-2xl"
        >
          <p className="text-gold-400 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* ================================================
            BENTO GRID — Varied card sizes
            Row 1: 1 tall featured + 1 wide
            Row 2: 3 normal
            Row 3: 1 wide
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Featured card — tall, spans 1 col x 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:row-span-2"
          >
            <ServiceCard
              service={featured}
              t={t}
              isFeatured
            />
          </motion.div>

          {/* Wide card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="lg:col-span-2"
          >
            <ServiceCard service={wideTop} t={t} />
          </motion.div>

          {/* Normal cards — 1 col each (fills remaining row-span-2 area) */}
          {normals.slice(0, 2).map((svc, i) => (
            <motion.div
              key={svc.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.16 + i * 0.08,
                ease: EASE_OUT,
              }}
            >
              <ServiceCard service={svc} t={t} />
            </motion.div>
          ))}

          {/* Third normal + wide bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE_OUT }}
          >
            <ServiceCard service={normals[2]} t={t} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
            className="lg:col-span-2"
          >
            <ServiceCard service={wideBottom} t={t} />
          </motion.div>
        </div>
      </div>

      {/* ================================================
          BOTTOM TRANSITION — diagonal to light section
          ================================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1600 80"
          preserveAspectRatio="none"
          className="block w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          aria-hidden="true"
        >
          <polygon points="0,80 1600,80 1600,0" className="fill-white" />
        </svg>
      </div>
    </section>
  );
}

/* ── Service Card Component ── */
function ServiceCard({
  service,
  t,
  isFeatured = false,
}: {
  service: (typeof services)[number];
  t: ReturnType<typeof useTranslations>;
  isFeatured?: boolean;
}) {
  return (
    <a
      href={service.href}
      className={`group relative flex flex-col justify-between h-full overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-gold-500/20 transition-all duration-500 ${
        isFeatured ? "p-8 sm:p-10 min-h-[320px] lg:min-h-0" : "p-7 lg:p-8 min-h-[180px]"
      }`}
      style={{ clipPath: BRAND_SHAPE }}
    >
      {/* Top gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div>
        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/15 transition-all duration-300 group-hover:bg-gold-500/20 group-hover:border-gold-400/30">
          <service.icon
            className="h-6 w-6 text-gold-400"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-white group-hover:text-gold-200 transition-colors duration-300 ${
            isFeatured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {t(service.titleKey)}
        </h3>

        {/* Description */}
        <p
          className={`mt-3 text-white/40 leading-relaxed ${
            isFeatured ? "text-base" : "text-sm"
          }`}
        >
          {t(service.descKey)}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-gold-400/60 group-hover:text-gold-400 transition-all duration-300">
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>

      {/* Hover glow — bottom right */}
      <div
        className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${service.accent} rounded-full opacity-0 group-hover:opacity-[0.04] blur-3xl transition-opacity duration-500`}
      />
    </a>
  );
}
