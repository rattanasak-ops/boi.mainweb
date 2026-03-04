"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Building2, Globe2, TrendingUp } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const INDUSTRIES = ["all", "ev", "digital", "manufacturing", "food", "medical"] as const;

const STORIES = [
  {
    slug: "toyota-ev-manufacturing",
    image: "/images/news/auto-factory.jpg",
    industry: "ev",
    country: "Japan",
    featured: true,
  },
  {
    slug: "delta-electronics-smart-factory",
    image: "/images/hero/smart-factory.jpg",
    industry: "manufacturing",
    country: "Taiwan",
    featured: true,
  },
  {
    slug: "google-cloud-data-center",
    image: "/images/news/digital-zone.jpg",
    industry: "digital",
    country: "USA",
    featured: false,
  },
  {
    slug: "cp-foods-innovation-center",
    image: "/images/why-thailand/shipping-port.jpg",
    industry: "food",
    country: "Thailand",
    featured: false,
  },
  {
    slug: "siemens-healthineers-hub",
    image: "/images/why-thailand/digital-workforce.jpg",
    industry: "medical",
    country: "Germany",
    featured: false,
  },
  {
    slug: "byd-ev-assembly-plant",
    image: "/images/news/ev-charging.jpg",
    industry: "ev",
    country: "China",
    featured: false,
  },
];

export default function SuccessStoriesGrid() {
  const t = useTranslations("success_stories_page.grid");
  const [activeIndustry, setActiveIndustry] = useState<string>("all");

  const filtered = STORIES.filter(
    (s) => activeIndustry === "all" || s.industry === activeIndustry
  );

  const featured = filtered.filter((s) => s.featured);
  const regular = filtered.filter((s) => !s.featured);

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeIndustry === ind
                  ? "bg-navy-600 text-white"
                  : "bg-white border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t(`filter_${ind}`)}
            </button>
          ))}
        </motion.div>

        {/* Featured Stories — 2-column */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {featured.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE_OUT }}
              >
                <Link
                  href="/discover/success-stories"
                  className="group block h-full"
                >
                  <div
                    className="relative h-full overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={story.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span
                          className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase"
                          style={{ clipPath: BRAND_SHAPE }}
                        >
                          {t(`filter_${story.industry}`)}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <Globe2 className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
                        <span className="text-xs text-white/60">
                          {story.country}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                        {t(`stories.${story.slug}.title`)}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                        {t(`stories.${story.slug}.excerpt`)}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Building2 className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
                          {t(`stories.${story.slug}.investment`)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <TrendingUp className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
                          {t(`stories.${story.slug}.jobs`)}
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                        {t("read_story")}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Regular Stories — 3-column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((story, i) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE_OUT }}
            >
              <Link
                  href="/discover/success-stories"
                  className="group block h-full"
                >
                  <div
                    className="relative h-full overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-navy-600 text-xs font-semibold uppercase"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {t(`filter_${story.industry}`)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                      <Globe2 className="h-3 w-3" aria-hidden="true" />
                      {story.country}
                    </div>

                    <h3 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                      {t(`stories.${story.slug}.title`)}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                      {t(`stories.${story.slug}.excerpt`)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                      {t("read_story")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
