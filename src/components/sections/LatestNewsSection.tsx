"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef, useState, useCallback, type MouseEvent } from "react";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */
const news = [
  {
    categoryKey: "category_policy",
    date: "28 Feb 2026",
    titleKey: "news_1_title",
    excerptKey: "news_1_excerpt",
    image: "/images/news/ev-charging.jpg",
    readMin: 4,
    featured: true,
  },
  {
    categoryKey: "category_event",
    date: "15 Mar 2026",
    titleKey: "news_2_title",
    excerptKey: "news_2_excerpt",
    image: "/images/news/conference.jpg",
    readMin: 3,
    featured: false,
  },
  {
    categoryKey: "category_announcement",
    date: "20 Feb 2026",
    titleKey: "news_3_title",
    excerptKey: "news_3_excerpt",
    image: "/images/news/digital-zone.jpg",
    readMin: 5,
    featured: false,
  },
  {
    categoryKey: "category_success",
    date: "10 Feb 2026",
    titleKey: "news_4_title",
    excerptKey: "news_4_excerpt",
    image: "/images/news/auto-factory.jpg",
    readMin: 3,
    featured: false,
  },
];

/* ────────────────────────────────────────────
   CONSTANTS
   ──────────────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

/* ────────────────────────────────────────────
   FEATURED CARD — with Magnetic Tilt 3D,
   Cursor Glow, Shine Sweep, Ken Burns
   ──────────────────────────────────────────── */
function FeaturedCard({ item, t }: { item: (typeof news)[0]; t: ReturnType<typeof useTranslations> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic tilt values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 25,
  });

  // Cursor glow position (percentage-based)
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Pre-compute glow background (hook at top level, not conditional)
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, rgba(197,165,114,0.15), transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [mouseX, mouseY, glowX, glowY]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="lg:col-span-3 group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <Link
          href="/resources/news"
          className="block h-full overflow-hidden border border-border transition-all duration-500"
          style={{ clipPath: BRAND_SHAPE }}
        >
          {/* ── Animated gradient border glow ── */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(197,165,114,0.3), transparent 40%, transparent 60%, rgba(197,165,114,0.2))",
                clipPath: BRAND_SHAPE,
              }}
            />
          )}

          <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden">
            {/* ── Ken Burns animated image ── */}
            <Image
              src={item.image}
              alt={t(item.titleKey)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{
                animation: "news-kenburns 20s ease-in-out infinite",
              }}
            />

            {/* ── Cursor glow overlay ── */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: glowBackground }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* ── Shine sweep on hover ── */}
            <div
              className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
              style={{ clipPath: BRAND_SHAPE }}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 70%)",
                  animation: isHovered
                    ? "news-shine-sweep 1.5s ease-in-out"
                    : "none",
                }}
              />
            </div>

            {/* ── Cinematic gradient overlay ── */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

            {/* ── Content overlay — bottom ── */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              {/* Category badge with shimmer */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
                className="inline-block px-4 py-1.5 text-navy-950 text-xs font-bold tracking-wide uppercase mb-4 relative overflow-hidden"
                style={{
                  clipPath: BRAND_SHAPE_SM,
                  background:
                    "linear-gradient(110deg, #C5A572 0%, #d9be86 25%, #f0e4cc 50%, #d9be86 75%, #C5A572 100%)",
                  backgroundSize: "200% 100%",
                  animation: "news-badge-shimmer 3s ease-in-out infinite",
                }}
              >
                {t(item.categoryKey)}
              </motion.span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug group-hover:text-gold-200 transition-colors duration-300">
                {t(item.titleKey)}
              </h3>
              <p className="mt-3 text-base text-white/55 line-clamp-2 max-w-lg">
                {t(item.excerptKey)}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.date}
                </span>
                {/* ── Reading time indicator ── */}
                <span className="flex items-center gap-1 text-gold-400/60">
                  <span aria-hidden="true">·</span>
                  {item.readMin} min read
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── Hover border glow (outside clip-path) ── */}
        <motion.div
          className="absolute -inset-[1px] rounded-none pointer-events-none z-[-1]"
          style={{ clipPath: BRAND_SHAPE }}
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(197,165,114,0.15), 0 20px 60px rgba(197,165,114,0.08)"
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────
   SIDE CARD — with Slide Reveal, Number Index
   ──────────────────────────────────────────── */
function SideCard({
  item,
  index,
  t,
}: {
  item: (typeof news)[0];
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt for side cards
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.article
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: EASE_OUT,
      }}
      className="group flex-1"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0.5);
          mouseY.set(0.5);
        }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformPerspective: 600,
        }}
      >
        <Link
          href="/resources/news"
          className="flex gap-5 p-5 h-full border border-border bg-white transition-all duration-300 relative overflow-hidden"
          style={{ clipPath: BRAND_SHAPE_SM }}
        >
          {/* ── Animated gradient border on hover ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "inset 0 0 0 1.5px rgba(197,165,114,0.4), 0 8px 32px rgba(197,165,114,0.08)"
                : "inset 0 0 0 0px transparent, 0 0 0 transparent",
            }}
            transition={{ duration: 0.3 }}
            style={{ clipPath: BRAND_SHAPE_SM }}
          />

          {/* ── Shine sweep on hover ── */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(197,165,114,0.04) 45%, rgba(197,165,114,0.08) 50%, rgba(197,165,114,0.04) 55%, transparent 70%)",
              animation: isHovered ? "news-shine-sweep 1.8s ease-in-out" : "none",
            }}
          />

          {/* ── Number Index — editorial ── */}
          <div className="absolute top-2 right-3 pointer-events-none select-none">
            <span
              className="text-[2.5rem] font-black leading-none transition-colors duration-300"
              style={{
                color: isHovered
                  ? "rgba(197,165,114,0.15)"
                  : "rgba(27,42,74,0.05)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── Thumbnail (fixed height) ── */}
          <div className="relative w-28 sm:w-32 shrink-0 overflow-hidden rounded-none self-stretch min-h-[90px]">
            <Image
              src={item.image}
              alt={t(item.titleKey)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="128px"
            />
          </div>

          {/* ── Text content ── */}
          <div className="flex-1 min-w-0 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-wide">
                  {t(item.categoryKey)}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-navy-600 leading-snug line-clamp-2 group-hover:text-navy-800 transition-colors duration-300">
                {t(item.titleKey)}
              </h3>
            </div>

            {/* ── Slide Reveal excerpt (absolute overlay, no layout shift) ── */}
            <div className="relative">
              <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {item.date}
                </span>
                <span className="text-gold-500/70">
                  {item.readMin} min read
                </span>
              </div>
              {/* Excerpt overlays on top of date when hovered — no height change */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 6,
                }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm pointer-events-none"
              >
                <p className="text-xs text-text-secondary line-clamp-2">
                  {t(item.excerptKey)}
                </p>
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────
   MAIN SECTION
   ──────────────────────────────────────────── */
export default function LatestNewsSection() {
  const t = useTranslations("news");
  const tCommon = useTranslations("common");

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-navy-900 relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ================================================
            HEADER — Split layout: title left, CTA right
            ================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex items-end justify-between mb-14 sm:mb-20"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="text-gold-600 font-medium text-sm tracking-[0.2em] uppercase mb-4"
            >
              {t("subtitle")}
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy-600 tracking-tight">
              {t("title")}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
              className="mt-4 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent origin-left"
            />
          </div>
          <Link
            href="/resources/news"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gold-600 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-50 hover:shadow-lg hover:shadow-gold-500/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            style={{ clipPath: BRAND_SHAPE_SM }}
          >
            {tCommon("view_all")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* ================================================
            NEWS GRID — Editorial magazine layout
            Featured story full-width left + 3 cards stacked right
            ================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured article — large editorial card (3 cols) */}
          <FeaturedCard item={news[0]} t={t} />

          {/* Side cards — 3 stacked (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {news.slice(1).map((item, i) => (
              <SideCard key={item.titleKey} item={item} index={i} t={t} />
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/resources/news"
            className="inline-flex items-center gap-2 text-gold-600 font-semibold text-sm"
          >
            {tCommon("view_all")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
