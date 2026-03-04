"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Printer,
  ArrowLeft,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

export default function NewsDetailContent() {
  const t = useTranslations("news_page.detail");

  return (
    <section className="relative py-12 sm:py-16 bg-surface overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Content */}
          <motion.article
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {/* Hero Image */}
            <div
              className="relative h-64 sm:h-80 lg:h-96 mb-8 overflow-hidden"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <Image
                src="/images/news/ev-charging.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:text-navy-600 prose-headings:font-bold prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-600">
              <p className="text-xl leading-relaxed text-text-secondary">
                {t("sample_lead")}
              </p>

              <h2>{t("sample_heading_1")}</h2>
              <p>{t("sample_paragraph_1")}</p>

              {/* Highlight Box */}
              <div
                className="not-prose my-8 p-6 sm:p-8 bg-navy-950 border border-gold-500/20"
                style={{ clipPath: BRAND_SHAPE }}
              >
                <p className="text-gold-400 font-medium text-sm tracking-[0.15em] uppercase mb-3">
                  {t("highlight_label")}
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  {t("sample_highlight")}
                </p>
              </div>

              <h2>{t("sample_heading_2")}</h2>
              <p>{t("sample_paragraph_2")}</p>

              <p>{t("sample_paragraph_3")}</p>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm font-semibold text-navy-600 mb-3">
                {t("tags_label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["EV", "Incentives", "Policy", "2026"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-navy-600/5 border border-navy-600/10 text-navy-600 text-xs font-medium hover:border-gold-500/30 hover:bg-gold-500/5 transition-all cursor-pointer"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-8">
              <Link
                href="/resources/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:gap-3 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("back_to_news")}
              </Link>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            {/* Share */}
            <div
              className="p-6 bg-white border border-border mb-6"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-600 mb-4">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {t("share_label")}
              </p>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "X (Twitter)" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Printer, label: "Print" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center justify-center h-10 w-10 bg-navy-600/5 border border-navy-600/10 text-navy-600 hover:bg-gold-500/10 hover:border-gold-500/20 hover:text-gold-600 transition-all"
                    style={{ clipPath: BRAND_SHAPE }}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Topics */}
            <div
              className="p-6 bg-white border border-border mb-6"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <p className="text-sm font-semibold text-navy-600 mb-4">
                {t("related_topics")}
              </p>
              <div className="space-y-3">
                {[
                  { href: "/invest/incentives", key: "topic_incentives" },
                  { href: "/discover/industries", key: "topic_ev" },
                  { href: "/invest/eligible-activities", key: "topic_activities" },
                ].map((topic) => (
                  <Link
                    key={topic.key}
                    href={topic.href}
                    className="block text-sm text-text-secondary hover:text-gold-600 transition-colors"
                  >
                    {t(topic.key)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div
              className="p-6 bg-navy-950 border border-gold-500/20"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <p className="text-gold-400 font-medium text-sm tracking-[0.15em] uppercase mb-2">
                {t("newsletter_eyebrow")}
              </p>
              <p className="text-white font-bold text-lg mb-2">
                {t("newsletter_title")}
              </p>
              <p className="text-white/50 text-sm mb-4">
                {t("newsletter_desc")}
              </p>
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                className="w-full px-4 py-3 mb-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold-500/40 transition-all"
                style={{ clipPath: BRAND_SHAPE }}
              />
              <button
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all"
                style={{ clipPath: BRAND_SHAPE }}
              >
                {t("newsletter_cta")}
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
