"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  Eye,
  Video,
  Image as ImageIcon,
  BarChart2,
  Presentation,
  Film,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const CATEGORIES = [
  "all",
  "videos",
  "photos",
  "infographics",
  "presentations",
] as const;

const CATEGORY_ICONS = {
  videos: Video,
  photos: ImageIcon,
  infographics: BarChart2,
  presentations: Presentation,
};

const MOCK_MEDIA = [
  {
    key: "media_1",
    type: "videos" as const,
    gradient: "from-navy-950 via-navy-800 to-navy-600",
    duration: "12:34",
  },
  {
    key: "media_2",
    type: "photos" as const,
    gradient: "from-gold-500 via-gold-600 to-navy-800",
    duration: null,
  },
  {
    key: "media_3",
    type: "infographics" as const,
    gradient: "from-navy-800 via-gold-500 to-gold-400",
    duration: null,
  },
  {
    key: "media_4",
    type: "videos" as const,
    gradient: "from-navy-600 via-navy-950 to-gold-600",
    duration: "8:45",
  },
  {
    key: "media_5",
    type: "presentations" as const,
    gradient: "from-gold-600 via-navy-800 to-navy-950",
    duration: null,
  },
  {
    key: "media_6",
    type: "photos" as const,
    gradient: "from-navy-950 via-gold-500 to-gold-400",
    duration: null,
  },
];

export default function MultimediaGallery() {
  const t = useTranslations("multimedia_page.gallery");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = MOCK_MEDIA.filter(
    (item) => activeCategory === "all" || item.type === activeCategory
  );

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-gold-100/20 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-navy-600 text-white"
                  : "bg-white border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t(`category_${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => {
            const TypeIcon =
              CATEGORY_ICONS[item.type as keyof typeof CATEGORY_ICONS] || Film;
            const isVideo = item.type === "videos";

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * i,
                  ease: EASE_OUT,
                }}
              >
                <div
                  className="group h-full bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500 overflow-hidden"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  {/* Media Placeholder */}
                  <div
                    className={`relative h-52 bg-gradient-to-br ${item.gradient} overflow-hidden cursor-pointer`}
                  >
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isVideo ? (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                          <Play
                            className="h-7 w-7 text-white ml-1"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <TypeIcon
                          className="h-12 w-12 text-white/30"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-600 text-xs font-bold tracking-wide uppercase"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        <TypeIcon className="h-3 w-3" aria-hidden="true" />
                        {t(`type_${item.type}`)}
                      </span>
                    </div>

                    {/* Duration badge for videos */}
                    {item.duration && (
                      <div className="absolute bottom-4 right-4">
                        <span className="px-2.5 py-1 bg-navy-950/80 backdrop-blur-sm text-white text-xs font-medium tracking-wide">
                          {item.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                      {t(`${item.key}_title`)}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-5">
                      {t(`${item.key}_desc`)}
                    </p>

                    <button
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:gap-3 transition-all duration-300"
                    >
                      {isVideo ? (
                        <>
                          <Play className="h-4 w-4" aria-hidden="true" />
                          {t("play_video")}
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          {t("view_media")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
