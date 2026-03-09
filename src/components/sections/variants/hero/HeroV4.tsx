"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/* ── Floating shape config ── */
const SHAPES = [
  { type: "circle", size: 180, x: "10%", y: "20%", delay: 0 },
  { type: "square", size: 120, x: "85%", y: "15%", delay: 0.5 },
  { type: "circle", size: 80, x: "75%", y: "70%", delay: 1.0 },
  { type: "square", size: 60, x: "15%", y: "75%", delay: 1.5 },
  { type: "circle", size: 140, x: "50%", y: "85%", delay: 0.8 },
] as const;

export default function HeroV4() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "linear-gradient(160deg, #1B2A4A 0%, #162240 40%, #0d1a33 100%)",
      }}
    >
      {/* ── Floating geometric shapes ── */}
      {SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.type === "circle" ? "50%" : "16%",
            border: "1px solid rgba(197,165,114,0.12)",
            background:
              "radial-gradient(circle, rgba(197,165,114,0.06) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
            rotate: shape.type === "square" ? [0, 45, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay },
            scale: { duration: 0.8, delay: shape.delay },
            y: {
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 12 + i,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Tagline */}
        <motion.span
          className="inline-block px-4 py-1.5 text-sm font-medium tracking-wider uppercase rounded-full border mb-8"
          style={{
            color: "#C5A572",
            borderColor: "rgba(197,165,114,0.4)",
            backgroundColor: "rgba(197,165,114,0.08)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("tagline")}
        </motion.span>

        {/* Headline with gold gradient */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="text-white">
            {t("slides.gateway.headline_1")}
          </span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #C5A572 0%, #E8D5B0 50%, #C5A572 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("slides.gateway.headline_2")}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t("slides.gateway.subheadline")}
        </motion.p>

        {/* Single prominent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <Link
            href="/eligibility"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
            style={{
              backgroundColor: "#C5A572",
              color: "#1B2A4A",
              boxShadow: "0 4px 24px rgba(197,165,114,0.3)",
            }}
          >
            {t("cta_eligibility")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(197,165,114,0.07), transparent)",
        }}
      />
    </section>
  );
}
