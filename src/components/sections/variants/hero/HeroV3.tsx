"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* ── Card data ── */
const CARDS = [
  {
    key: "gateway" as const,
    image: "/images/hero/bangkok-aerial-night.jpg",
    badge: "Gateway",
  },
  {
    key: "manufacturing" as const,
    image: "/images/hero/smart-factory.jpg",
    badge: "Manufacturing",
  },
  {
    key: "digital" as const,
    image: "/images/hero/digital-network.jpg",
    badge: "Digital",
  },
];

const ROTATE_INTERVAL = 4500;

export default function HeroV3() {
  const t = useTranslations("hero");
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-20 px-6"
      style={{
        background:
          "linear-gradient(165deg, #1B2A4A 0%, #0f1d35 50%, #0a1628 100%)",
      }}
    >
      {/* ── Header ── */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span
          className="inline-block px-4 py-1.5 text-sm font-medium tracking-wider uppercase rounded-full border mb-6"
          style={{
            color: "#C5A572",
            borderColor: "rgba(197,165,114,0.4)",
            backgroundColor: "rgba(197,165,114,0.1)",
          }}
        >
          {t("tagline")}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          {t("slides.gateway.headline_1")}{" "}
          <span style={{ color: "#C5A572" }}>
            {t("slides.gateway.headline_2")}
          </span>
        </h1>
        <p className="mt-4 text-lg text-white/60">
          {t("slides.gateway.subheadline")}
        </p>
      </motion.div>

      {/* ── Card Carousel ── */}
      <div className="relative w-full max-w-4xl mx-auto h-[320px] md:h-[380px]">
        <AnimatePresence mode="popLayout">
          {CARDS.map((card, i) => {
            const offset = ((i - activeIndex + CARDS.length) % CARDS.length);
            // Show active card centered, others smaller behind
            const isActive = offset === 0;
            const xPercent = offset === 0 ? 0 : offset === 1 ? 55 : -55;
            const scale = isActive ? 1 : 0.85;
            const zIndex = isActive ? 10 : 5;
            const opacity = isActive ? 1 : 0.5;

            return (
              <motion.div
                key={card.key}
                className="absolute inset-0 mx-auto w-[85%] md:w-[60%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{ zIndex }}
                animate={{
                  x: `${xPercent}%`,
                  scale,
                  opacity,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(i)}
              >
                <Image
                  src={card.image}
                  alt={card.badge}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 60vw"
                  priority={i === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Badge + title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2"
                    style={{
                      backgroundColor: "rgba(197,165,114,0.9)",
                      color: "#1B2A4A",
                    }}
                  >
                    {t(`slides.${card.key}.badge`)}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {t(`slides.${card.key}.headline_1`)}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Dot Indicators ── */}
      <div className="flex gap-2.5 mt-8">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="relative w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i === activeIndex ? "#C5A572" : "rgba(255,255,255,0.3)",
              transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <motion.div
        className="flex flex-wrap gap-4 mt-8 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/eligibility"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:brightness-110"
          style={{ backgroundColor: "#C5A572" }}
        >
          {t("cta_eligibility")}
        </Link>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-white/30 transition-all duration-300 hover:bg-white/10"
        >
          {t("cta_apply")}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
