"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const news = [
  { categoryKey: "category_policy", date: "28 Feb 2026", titleKey: "news_1_title", excerptKey: "news_1_excerpt" },
  { categoryKey: "category_event", date: "15 Mar 2026", titleKey: "news_2_title", excerptKey: "news_2_excerpt" },
  { categoryKey: "category_announcement", date: "20 Feb 2026", titleKey: "news_3_title", excerptKey: "news_3_excerpt" },
  { categoryKey: "category_success", date: "10 Feb 2026", titleKey: "news_4_title", excerptKey: "news_4_excerpt" },
] as const;

export default function NewsV4() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div
          className="mb-10 flex items-end justify-between"
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
            className="hidden items-center gap-1.5 text-sm font-medium text-[#C5A572] hover:text-[#1B2A4A] transition-colors md:inline-flex"
          >
            {tCommon("view_all")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Minimal list */}
        <div className="divide-y divide-[#1B2A4A]/10 border-y border-[#1B2A4A]/10">
          {news.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_OUT }}
            >
              <Link
                href={`/news/${i + 1}`}
                className="group flex items-start gap-6 py-5 transition-colors hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg"
              >
                <div className="w-24 shrink-0 pt-0.5">
                  <span className="text-sm font-medium text-[#1B2A4A]/40">{item.date}</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#C5A572]">
                    {t(item.categoryKey)}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-[#1B2A4A] group-hover:text-[#C5A572] transition-colors">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-[#1B2A4A]/50 line-clamp-1">
                    {t(item.excerptKey)}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#1B2A4A]/20 transition-all group-hover:text-[#C5A572] group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-6 text-center md:hidden">
          <Link href="/news" className="text-sm font-medium text-[#C5A572]">
            {tCommon("view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
}
