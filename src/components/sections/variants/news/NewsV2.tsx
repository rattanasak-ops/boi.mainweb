"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const news = [
  { categoryKey: "category_policy", date: "28 Feb 2026", titleKey: "news_1_title", excerptKey: "news_1_excerpt", image: "/images/news/ev-charging.jpg" },
  { categoryKey: "category_event", date: "15 Mar 2026", titleKey: "news_2_title", excerptKey: "news_2_excerpt", image: "/images/news/conference.jpg" },
  { categoryKey: "category_announcement", date: "20 Feb 2026", titleKey: "news_3_title", excerptKey: "news_3_excerpt", image: "/images/news/digital-zone.jpg" },
  { categoryKey: "category_success", date: "10 Feb 2026", titleKey: "news_4_title", excerptKey: "news_4_excerpt", image: "/images/news/auto-factory.jpg" },
] as const;

export default function NewsV2() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");
  const [featured, ...rest] = news;

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
              {t("subtitle")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#1B2A4A] md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1.5 text-sm font-medium text-[#C5A572] transition-colors hover:text-[#1B2A4A] md:inline-flex"
          >
            {tCommon("view_all")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Magazine layout: featured (2/3) + stacked (1/3) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Link href="/news/1" className="group relative block aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={featured.image}
                alt={t(featured.titleKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-8">
                <span className="inline-block rounded-full bg-[#C5A572] px-3 py-1 text-xs font-semibold uppercase text-white">
                  {t(featured.categoryKey)}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  {t(featured.titleKey)}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/70 line-clamp-2">
                  {t(featured.excerptKey)}
                </p>
                <span className="mt-3 text-xs text-white/50">{featured.date}</span>
              </div>
            </Link>
          </motion.div>

          {/* Stacked small cards */}
          <div className="flex flex-col gap-4">
            {rest.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: EASE_OUT }}
              >
                <Link
                  href={`/news/${i + 2}`}
                  className="group flex gap-4 rounded-xl border border-[#1B2A4A]/10 bg-[#F8FAFC] p-3 transition-all duration-300 hover:border-[#C5A572]/30 hover:shadow-sm"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={t(item.titleKey)}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#C5A572]">
                      {t(item.categoryKey)}
                    </span>
                    <h4 className="mt-0.5 text-sm font-semibold text-[#1B2A4A] line-clamp-2 group-hover:text-[#C5A572] transition-colors">
                      {t(item.titleKey)}
                    </h4>
                    <span className="mt-1 text-[10px] text-[#1B2A4A]/40">{item.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile view-all link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C5A572]"
          >
            {tCommon("view_all")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
