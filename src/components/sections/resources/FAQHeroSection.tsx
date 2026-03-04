"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

export default function FAQHeroSection() {
  const t = useTranslations("faq_page.hero");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-gold-500/5" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pt-32 pb-16 sm:pb-20">
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
              <span className="text-gold-400">{t("breadcrumb")}</span>
            </li>
          </ol>
        </motion.nav>

        <div className="max-w-3xl mx-auto text-center">
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
            {t("title_1")}
            <br />
            <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-white/60 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Search */}
          <motion.div
            className="mt-8 relative max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold-500/40 focus:bg-white/10 transition-all"
              style={{ clipPath: BRAND_SHAPE }}
            />
          </motion.div>
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
  );
}
