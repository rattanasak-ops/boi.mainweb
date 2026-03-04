"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const RELATED = [
  {
    slug: "digital-economy-zone-expansion",
    image: "/images/news/digital-zone.jpg",
  },
  {
    slug: "thailand-auto-manufacturing-milestone",
    image: "/images/news/auto-factory.jpg",
  },
  {
    slug: "international-investment-conference-2026",
    image: "/images/news/conference.jpg",
  },
];

export default function RelatedNewsSection() {
  const t = useTranslations("news_page");

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
      <NoiseGrain opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-4">
            {t("related.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t("related.title")}
          </h2>
          <motion.div
            className="mt-5 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          />
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RELATED.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 * i,
                ease: EASE_OUT,
              }}
            >
              <Link
                href={`/resources/news/${article.slug}`}
                className="group block h-full"
              >
                <div
                  className="h-full bg-navy-950/60 backdrop-blur-xl border border-white/[0.07] hover:border-gold-500/20 transition-all duration-500 overflow-hidden"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                      <Calendar
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <time>
                        {t(`list.articles.${article.slug}.date`)}
                      </time>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-300 line-clamp-2">
                      {t(`list.articles.${article.slug}.title`)}
                    </h3>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 group-hover:gap-3 transition-all duration-300">
                      {t("list.read_more")}
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
        >
          <Link
            href="/resources/news"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/30 text-gold-400 font-semibold text-sm hover:bg-gold-500/10 hover:border-gold-500/50 transition-all duration-300"
            style={{ clipPath: BRAND_SHAPE }}
          >
            {t("related.view_all")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
