"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SuccessStoriesHero() {
  const t = useTranslations("success_stories_page.hero");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] sm:min-h-[55vh] flex items-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero/smart-factory.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 bg-navy-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
      <NoiseGrain opacity={0.02} />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-24 pt-32"
      >
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
              <Link
                href="/discover"
                className="hover:text-gold-400 transition-colors"
              >
                {t("breadcrumb_discover")}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <span className="text-gold-400">{t("breadcrumb")}</span>
            </li>
          </ol>
        </motion.nav>

        <motion.p
          className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl"
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
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-8 h-[2px] w-24 origin-left"
          style={{
            background:
              "linear-gradient(to right, rgba(197,165,114,0.8), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE_OUT }}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1600 80"
          preserveAspectRatio="none"
          className="block w-full h-[40px] sm:h-[60px] lg:h-[80px]"
          aria-hidden="true"
        >
          <polygon points="0,80 1600,80 1600,0" className="fill-surface" />
        </svg>
      </div>
    </section>
  );
}
