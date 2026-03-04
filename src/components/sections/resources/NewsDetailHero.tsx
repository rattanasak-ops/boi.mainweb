"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Tag, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function NewsDetailHero() {
  const t = useTranslations("news_page.detail");

  return (
    <section className="relative bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-gold-500/5" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pt-32 pb-12 sm:pb-16">
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
          aria-label="Breadcrumb"
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-white/50">
            <li>
              <Link href="/" className="hover:text-gold-400 transition-colors">
                {t("breadcrumb_home")}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <Link
                href="/resources/news"
                className="hover:text-gold-400 transition-colors"
              >
                {t("breadcrumb_news")}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <span className="text-gold-400 line-clamp-1">
                {t("sample_title")}
              </span>
            </li>
          </ol>
        </motion.nav>

        {/* Category & Meta */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase">
            <Tag className="h-3 w-3" aria-hidden="true" />
            {t("sample_category")}
          </span>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {t("sample_date")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {t("reading_time")}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        >
          {t("sample_title")}
        </motion.h1>

        <motion.div
          className="mt-8 h-[2px] w-24 origin-left"
          style={{
            background:
              "linear-gradient(to right, rgba(197,165,114,0.8), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE_OUT }}
        />
      </div>

      {/* Bottom transition */}
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
  );
}
