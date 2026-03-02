"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const news = [
  {
    categoryKey: "category_policy",
    date: "28 Feb 2026",
    titleKey: "news_1_title",
    excerptKey: "news_1_excerpt",
    image: "/images/news/ev-charging.jpg",
    featured: true,
  },
  {
    categoryKey: "category_event",
    date: "15 Mar 2026",
    titleKey: "news_2_title",
    excerptKey: "news_2_excerpt",
    image: "/images/news/conference.jpg",
    featured: false,
  },
  {
    categoryKey: "category_announcement",
    date: "20 Feb 2026",
    titleKey: "news_3_title",
    excerptKey: "news_3_excerpt",
    image: "/images/news/digital-zone.jpg",
    featured: false,
  },
  {
    categoryKey: "category_success",
    date: "10 Feb 2026",
    titleKey: "news_4_title",
    excerptKey: "news_4_excerpt",
    image: "/images/news/auto-factory.jpg",
    featured: false,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

export default function LatestNewsSection() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            HEADER — Split layout: title left, CTA right
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="flex items-end justify-between mb-14 sm:mb-20"
        >
          <div>
            <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-600 tracking-tight">
              {t("title")}
            </h2>
            <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gold-600 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-50 transition-all duration-300"
            style={{ clipPath: BRAND_SHAPE_SM }}
          >
            {tCommon("view_all")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        {/* ================================================
            NEWS GRID — Editorial magazine layout
            Featured story full-width left + 3 cards stacked right
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured article — large editorial card (3 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-3 group"
          >
            <a
              href="#"
              className="block h-full overflow-hidden border border-border hover:border-gold-300/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/[0.06]"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden">
                <Image
                  src={news[0].image}
                  alt={t(news[0].titleKey)}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

                {/* Content overlay — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <span
                    className="inline-block px-4 py-1.5 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase mb-4"
                    style={{ clipPath: BRAND_SHAPE_SM }}
                  >
                    {t(news[0].categoryKey)}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug group-hover:text-gold-200 transition-colors duration-300">
                    {t(news[0].titleKey)}
                  </h3>
                  <p className="mt-3 text-base text-white/55 line-clamp-2 max-w-lg">
                    {t(news[0].excerptKey)}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {news[0].date}
                  </div>
                </div>
              </div>
            </a>
          </motion.article>

          {/* Side cards — 3 stacked (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {news.slice(1).map((item, i) => (
              <motion.article
                key={item.titleKey}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: EASE_OUT,
                }}
                className="group flex-1"
              >
                <a
                  href="#"
                  className="flex gap-5 p-5 h-full border border-border hover:border-gold-300/60 transition-all duration-300 bg-white hover:shadow-lg hover:shadow-gold-500/[0.04]"
                  style={{ clipPath: BRAND_SHAPE_SM }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-full w-28 sm:w-32 shrink-0 overflow-hidden rounded-none">
                    <Image
                      src={item.image}
                      alt={t(item.titleKey)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="128px"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-gold-600 uppercase tracking-wide">
                          {t(item.categoryKey)}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-navy-600 leading-snug line-clamp-2 group-hover:text-navy-700 transition-colors">
                        {t(item.titleKey)}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {item.date}
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <div className="mt-10 text-center sm:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gold-600 font-semibold text-sm"
          >
            {tCommon("view_all")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
