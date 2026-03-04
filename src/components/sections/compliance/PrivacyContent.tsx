"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SECTION_KEYS = [
  "intro",
  "collection",
  "auto",
  "use",
  "sharing",
  "retention",
  "rights",
  "security",
  "contact",
] as const;

export default function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-gold-500/5" />
        <NoiseGrain opacity={0.02} />

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pt-32 pb-16">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            aria-label="Breadcrumb"
            className="mb-8"
          >
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-400 transition-colors"
                >
                  {t("breadcrumb_home")}
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <li>
                <span className="text-gold-400">{t("breadcrumb")}</span>
              </li>
            </ol>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.p
              className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.p
              className="mt-4 text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {t("last_updated")}
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg
            viewBox="0 0 1600 60"
            preserveAspectRatio="none"
            className="block w-full h-[30px] sm:h-[40px] lg:h-[60px]"
            aria-hidden="true"
          >
            <polygon points="0,60 1600,60 1600,0" className="fill-surface" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 sm:py-20 bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
          <div className="max-w-3xl mx-auto">
            {SECTION_KEYS.map((key, i) => (
              <motion.article
                key={key}
                className="mb-10 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 * i,
                  ease: EASE_OUT,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20">
                    <Shield
                      className="h-4 w-4 text-gold-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-navy-600 mb-3">
                      {t(`sections.${key}_title`)}
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                      {t(`sections.${key}_text`)}
                    </p>
                  </div>
                </div>
                {i < SECTION_KEYS.length - 1 && (
                  <div className="mt-8 h-px bg-gradient-to-r from-border via-border to-transparent" />
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
