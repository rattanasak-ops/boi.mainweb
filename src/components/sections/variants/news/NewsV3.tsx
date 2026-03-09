"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const news = [
  { categoryKey: "category_policy", date: "28 Feb 2026", titleKey: "news_1_title", excerptKey: "news_1_excerpt", image: "/images/news/ev-charging.jpg" },
  { categoryKey: "category_event", date: "15 Mar 2026", titleKey: "news_2_title", excerptKey: "news_2_excerpt", image: "/images/news/conference.jpg" },
  { categoryKey: "category_announcement", date: "20 Feb 2026", titleKey: "news_3_title", excerptKey: "news_3_excerpt", image: "/images/news/digital-zone.jpg" },
  { categoryKey: "category_success", date: "10 Feb 2026", titleKey: "news_4_title", excerptKey: "news_4_excerpt", image: "/images/news/auto-factory.jpg" },
] as const;

export default function NewsV3() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");

  return (
    <section className="w-full bg-[#F8FAFC] py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C5A572]">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1B2A4A] md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-[#1B2A4A]/10 md:left-1/2 md:-translate-x-px" />

          {news.map((item, i) => (
            <motion.div
              key={item.titleKey}
              className="relative mb-10 last:mb-0 pl-12 md:pl-0"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE_OUT }}
            >
              {/* Timeline node */}
              <div className="absolute left-[12px] top-1.5 h-4 w-4 rounded-full border-[3px] border-[#C5A572] bg-white md:left-1/2 md:-translate-x-1/2" />

              {/* Card — alternating sides on desktop */}
              <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}`}>
                <Link
                  href={`/news/${i + 1}`}
                  className="group block rounded-xl border border-[#1B2A4A]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#C5A572]/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#C5A572]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#C5A572]">
                      {t(item.categoryKey)}
                    </span>
                    <span className="text-xs text-[#1B2A4A]/40">{item.date}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[#1B2A4A] group-hover:text-[#C5A572] transition-colors">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1B2A4A]/60 line-clamp-2">
                    {t(item.excerptKey)}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1B2A4A]/20 px-6 py-2.5 text-sm font-medium text-[#1B2A4A] transition-colors hover:border-[#C5A572] hover:text-[#C5A572]"
          >
            {tCommon("view_all")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
