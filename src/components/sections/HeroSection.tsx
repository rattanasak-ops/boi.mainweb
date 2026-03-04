"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import NoiseGrain from "@/components/ui/NoiseGrain";
import InteractiveHeroOverlay from "@/components/ui/InteractiveHeroOverlay";
import MagneticCTA from "@/components/ui/MagneticCTA";

/* ── Easing curves (EEC-inspired) ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── BOI Brand Shape — chamfered corner motif ── */
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

const SLIDE_INTERVAL = 6000; // 6s per slide
const FIRST_SLIDE_INTERVAL = 10000; // 10s for first slide — let Big Idea land
const SUB_SLIDE_INTERVAL = 3500; // 3.5s for Slide 5 sub-images

/* ── Slide data ── */
type Slide = {
  key: string;
  image: string;
  images?: string[]; // Multi-image slides (e.g., Slide 5 Growth)
  video?: { webm: string; mp4: string }; // Video background (Slide 1)
  zoomOrigin: string;
};

/* ── Direction types for mouse-aware transitions ── */
type SlideDirection = "right" | "left" | "up" | "down";

const SLIDES: Slide[] = [
  {
    key: "gateway",
    image: "/images/hero/bangkok-aerial-night.jpg",
    video: {
      webm: "/videos/hero-bangkok.webm",
      mp4: "/videos/hero-bangkok.mp4",
    },
    zoomOrigin: "center center",
  },
  {
    key: "manufacturing",
    image: "/images/hero/smart-factory.jpg",
    zoomOrigin: "left center",
  },
  {
    key: "digital",
    image: "/images/hero/digital-network.jpg",
    zoomOrigin: "right top",
  },
  {
    key: "lifestyle",
    image: "/images/hero/golden-arch.jpg",
    zoomOrigin: "center bottom",
  },
  {
    key: "growth",
    image: "/images/hero/expressway-city.jpg",
    images: [
      "/images/hero/expressway-city.jpg",
      "/images/hero/expressway-trails.jpg",
    ],
    zoomOrigin: "center center",
  },
];

/* ── Directional slide animation variants ──
   Mouse direction determines how the new image enters/exits
   Creates a "following the mouse" wipe effect */
function getDirectionalVariants(dir: SlideDirection) {
  switch (dir) {
    case "right":
      return {
        initial: { x: "100%", y: 0 },
        animate: { x: "0%", y: 0 },
        exit: { x: "-100%", y: 0 },
      };
    case "left":
      return {
        initial: { x: "-100%", y: 0 },
        animate: { x: "0%", y: 0 },
        exit: { x: "100%", y: 0 },
      };
    case "down":
      return {
        initial: { x: 0, y: "100%" },
        animate: { x: 0, y: "0%" },
        exit: { x: 0, y: "-100%" },
      };
    case "up":
      return {
        initial: { x: 0, y: "-100%" },
        animate: { x: 0, y: "0%" },
        exit: { x: 0, y: "100%" },
      };
  }
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [gateComplete, setGateComplete] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("boi-grand-gate-seen")) {
      return true;
    }
    return false;
  });
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ── Slide 5 sub-carousel state ── */
  const [subSlide, setSubSlide] = useState(0);
  const subIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Mouse direction tracking ──
     Tracks the dominant direction of mouse movement for Slide 5
     directional wipe transitions */
  const [mouseDir, setMouseDir] = useState<SlideDirection>("right");
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseMoveAccum = useRef({ dx: 0, dy: 0, count: 0 });

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Accumulate movement to smooth out jitter
      mouseMoveAccum.current.dx += dx;
      mouseMoveAccum.current.dy += dy;
      mouseMoveAccum.current.count++;

      // Update direction every 5 moves for stability
      if (mouseMoveAccum.current.count >= 5) {
        const { dx: totalDx, dy: totalDy } = mouseMoveAccum.current;
        const absDx = Math.abs(totalDx);
        const absDy = Math.abs(totalDy);

        if (absDx > absDy) {
          setMouseDir(totalDx > 0 ? "right" : "left");
        } else if (absDy > 2) {
          setMouseDir(totalDy > 0 ? "down" : "up");
        }
        mouseMoveAccum.current = { dx: 0, dy: 0, count: 0 };
      }
    },
    []
  );

  /* ── Seamless video loop — seek back before end to avoid gray flash ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // When video is within 0.3s of the end, seek back to start
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    // Also handle the 'ended' event as a fallback
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [current]);

  /* Gate opening complete — wait for GrandGateLoading to finish, then enable carousel */
  useEffect(() => {
    if (gateComplete) return; // Already complete (session revisit)
    // Listen for GrandGateLoading completion via sessionStorage
    const check = () => {
      if (sessionStorage.getItem("boi-grand-gate-seen")) {
        setGateComplete(true);
      }
    };
    const timer = setInterval(check, 100);
    // Fallback: if loading somehow doesn't set it, open after 4s
    const fallback = setTimeout(() => setGateComplete(true), 4000);
    return () => { clearInterval(timer); clearTimeout(fallback); };
  }, [gateComplete]);

  /* Auto-advance carousel */
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    const advance = () => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(advance, next === 0 ? FIRST_SLIDE_INTERVAL : SLIDE_INTERVAL) as unknown as NodeJS.Timeout;
        return next;
      });
    };
    intervalRef.current = setTimeout(advance, current === 0 ? FIRST_SLIDE_INTERVAL : SLIDE_INTERVAL) as unknown as NodeJS.Timeout;
  }, [current]);

  useEffect(() => {
    if (!gateComplete || paused) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      return;
    }
    startTimer();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [gateComplete, paused, startTimer]);

  /* ── Slide 5 sub-carousel auto-advance ──
     When Slide 5 (growth) is active, alternate between 2 expressway images */
  const slide = SLIDES[current];
  const isMultiImage = !!(slide.images && slide.images.length > 1);

  useEffect(() => {
    if (!isMultiImage || !gateComplete) {
      if (subIntervalRef.current) clearInterval(subIntervalRef.current);
      setSubSlide(0);
      return;
    }
    subIntervalRef.current = setInterval(() => {
      setSubSlide((prev) => (prev + 1) % slide.images!.length);
    }, SUB_SLIDE_INTERVAL);
    return () => {
      if (subIntervalRef.current) clearInterval(subIntervalRef.current);
    };
  }, [current, isMultiImage, gateComplete, slide.images]);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i);
      startTimer();
    },
    [startTimer]
  );

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  }, [startTimer]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  }, [startTimer]);

  /* Parallax — content fades on scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "15%"]);

  /* Current active image (handles sub-slides for multi-image) */
  const activeImage = isMultiImage ? slide.images![subSlide] : slide.image;
  const dirVariants = getDirectionalVariants(mouseDir);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseMove={handleHeroMouseMove}
    >
      {/* Gate opening reveal moved to GrandGateLoading.tsx (layout-level) */}

      {/* ================================================
          BACKGROUND — Crossfade carousel with Ken Burns zoom
          Standard slides: crossfade + Ken Burns
          Slide 5 (Growth): Mouse-direction-aware wipe transition
          between 2 expressway images
          ================================================ */}

      {/* Layer 1: Main slide crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* For multi-image slides: show sub-carousel with directional wipe */}
          {isMultiImage ? (
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={`sub-${subSlide}`}
                  className="absolute inset-0"
                  initial={dirVariants.initial}
                  animate={dirVariants.animate}
                  exit={dirVariants.exit}
                  transition={{
                    duration: 0.8,
                    ease: EASE_OUT,
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ transformOrigin: slide.zoomOrigin }}
                    initial={{ scale: 1.0 }}
                    animate={{ scale: 1.15 }}
                    transition={{
                      duration: SUB_SLIDE_INTERVAL / 1000 + 1,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={activeImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Direction indicator — subtle gold arrow showing mouse direction */}
              <motion.div
                className="absolute bottom-[180px] sm:bottom-[200px] right-8 sm:right-12 z-20 flex items-center gap-2 text-gold-400/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="text-xs font-mono tracking-wider uppercase"
                  key={mouseDir}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {mouseDir === "right" && "→"}
                  {mouseDir === "left" && "←"}
                  {mouseDir === "up" && "↑"}
                  {mouseDir === "down" && "↓"}
                </motion.div>
                <span className="text-[10px] font-mono text-white/20">
                  INTERACTIVE
                </span>
              </motion.div>
            </div>
          ) : slide.video ? (
            /* Video background slide (Slide 1 — Gateway) */
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="metadata"
                poster={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={slide.video.webm} type="video/webm" />
                <source src={slide.video.mp4} type="video/mp4" />
              </video>
            </div>
          ) : (
            /* Standard single-image slide with Ken Burns */
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: slide.zoomOrigin }}
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.2 }}
              transition={{
                duration: SLIDE_INTERVAL / 1000 + 1.5,
                ease: "linear",
              }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={current === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-navy-950/65 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,11,23,0.5)_100%)] z-[1]" />

      {/* Interactive mouse-reactive overlay — per-slide themed effect */}
      <InteractiveHeroOverlay theme={slide.key as "gateway" | "manufacturing" | "digital" | "lifestyle" | "growth"} />

      {/* Atmospheric depth */}
      <FloatingOrbs variant="hero" />
      <NoiseGrain opacity={0.03} />

      {/* ================================================
          ANIMATED GOLD LINE — perpetual left-edge accent
          ================================================ */}
      <div
        className="absolute left-8 sm:left-12 lg:left-20 top-0 w-px h-full z-10 bg-gold-500/[0.08]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 w-full h-28 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent"
          animate={{ top: ["-112px", "100%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </div>

      {/* ================================================
          CONTENT — Structured in 3 zones so CTAs & controls never overlap
          Zone A: Center content (headline + CTAs)
          Zone B: Bottom controls (carousel nav, fixed position above diagonal)
          ================================================ */}
      <motion.div
        className="relative z-20 h-full flex flex-col mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* ── Zone A: Centered Content ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center pb-[280px] sm:pb-[300px] lg:pb-[340px]">
          {/* ── PERSISTENT TAGLINE — stays across all slides ── */}
          <motion.span
            className="block text-[11px] sm:text-xs tracking-[0.35em] uppercase font-medium text-gold-400/50 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={gateComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          >
            {t("tagline")}
          </motion.span>

          {/* Badge — changes per slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <span
                className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.08] border border-white/15 text-gold-300 text-sm font-medium backdrop-blur-md"
                style={{ clipPath: BRAND_SHAPE_SM }}
              >
                <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                {t(`slides.${slide.key}.badge`)}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* ── HEADLINE — blur-deblur + clip-path expand per slide ── */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${current}`}
              className="mt-6 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Line 1 — blur reveal */}
              <motion.span
                className="block text-[clamp(3.5rem,10vw,9rem)] font-bold text-white leading-[0.95] tracking-[-0.02em]"
                initial={{ opacity: 0, filter: "blur(14px)", y: 30 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                {t(`slides.${slide.key}.headline_1`)}
              </motion.span>

              {/* Line 2 — clip-path expand from center (gate opening motif) */}
              <motion.span
                className="block text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.95] tracking-[-0.02em] mt-1 sm:mt-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent"
                initial={{ clipPath: "inset(-10% 50% -10% 50%)" }}
                animate={{ clipPath: "inset(-10% 0% -10% 0%)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              >
                {t(`slides.${slide.key}.headline_2`)}
              </motion.span>
            </motion.h1>
          </AnimatePresence>

        </div>

        {/* ── Zone CTA: Fixed-position (same position across all banners) ── */}
        <div className="absolute bottom-[170px] sm:bottom-[195px] lg:bottom-[230px] left-0 right-0 z-30">
          <div className="flex flex-col items-center text-center px-6 sm:px-10 lg:px-20">
            {/* Subheadline — changes per slide */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t(`slides.${slide.key}.subheadline`)}
              </motion.p>
            </AnimatePresence>

            {/* Decorative gold line */}
            <motion.div
              className="mt-4 sm:mt-5 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
              initial={{ width: 0 }}
              animate={gateComplete ? { width: 120 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
              aria-hidden="true"
            />

            {/* ── CTA BUTTONS — Magnetic + Gate-Opening ── */}
            <motion.div
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-4 items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={gateComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
            >
              <MagneticCTA
                variant="primary"
                href="/invest/eligibility-checker"
                icon={<CheckCircle className="h-5 w-5" />}
              >
                {t("cta_eligibility")}
              </MagneticCTA>

              <MagneticCTA variant="secondary" href="/services/apply">
                {t("cta_apply")}
              </MagneticCTA>
            </motion.div>
          </div>
        </div>

        {/* ── Zone B: Carousel Controls (fixed above diagonal) ── */}
        <div className="absolute bottom-[90px] sm:bottom-[110px] lg:bottom-[140px] left-0 right-0 z-30">
          <div className="flex items-center justify-center gap-1.5 px-6 sm:px-10 lg:px-20">
            {/* Prev */}
            <button
              onClick={goPrev}
              className="p-2.5 rounded-full border border-white/15 text-white/40 hover:text-white hover:border-gold-400/50 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Progress bars */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => goTo(i)}
                  className={`relative h-1 rounded-full overflow-hidden transition-all duration-500 ${
                    i === current
                      ? "w-12 bg-white/20"
                      : "w-6 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: (current === 0 ? FIRST_SLIDE_INTERVAL : SLIDE_INTERVAL) / 1000,
                        ease: "linear",
                      }}
                      key={`prog-${current}`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={goNext}
              className="p-2.5 rounded-full border border-white/15 text-white/40 hover:text-white hover:border-gold-400/50 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Slide counter */}
            <span className="text-xs text-white/30 font-mono tracking-wider ml-1">
              {String(current + 1).padStart(2, "0")}
              <span className="mx-1 text-gold-500/40">/</span>
              {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ================================================
          BOTTOM DIAGONAL TRANSITION
          ================================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
          aria-hidden="true"
        >
          <polygon points="0,120 1600,120 1600,0" className="fill-navy-900" />
        </svg>
      </div>
    </section>
  );
}
