"use client";

import { useEffect, useState, useCallback, useRef, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

/* ─── Section IDs (order matches homepage) ─── */
const SECTION_IDS = [
  "section-hero",
  "section-stats",
  "section-why-thailand",
  "section-services",
  "section-news",
  "section-cta",
];

/* ─── Constants ─── */
const RING_RADIUS = 18;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SCROLL_DURATION = 1.4;
const LAST_INDEX = SECTION_IDS.length - 1;

/**
 * ScrollNavigator — "Golden Compass"
 *
 * 5-slot floating nav (right side):
 *   ⏫  Go to Top      (show when section > 0)
 *   ↑   Prev section   (show when section > 0)
 *   ●   Progress ring  (always)
 *   ↓   Next section   (show when section < last)
 *   ⏬  Go to Footer   (show when section < last)
 */
export default function ScrollNavigator() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── State ─── */
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [justChanged, setJustChanged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ─── Magnetic Pull ─── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 20 });
  const springY = useSpring(my, { stiffness: 200, damping: 20 });

  /* ─── Progress Ring ─── */
  const progressSpring = useSpring(0, { stiffness: 80, damping: 30 });
  const strokeDashoffset = useTransform(
    progressSpring,
    [0, 1],
    [RING_CIRCUMFERENCE, 0]
  );

  useEffect(() => {
    progressSpring.set(scrollProgress);
  }, [scrollProgress, progressSpring]);

  /* ─── Mount (show immediately) ─── */
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ─── Scroll Tracking ─── */
  useEffect(() => {
    let prevSection = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      setScrollProgress(progress);

      // Detect current section
      let active = 0;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            active = i;
            break;
          }
        }
      }

      if (active !== prevSection) {
        prevSection = active;
        setCurrentSection(active);
        setJustChanged(true);
        setTimeout(() => setJustChanged(false), 600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Magnetic Hover ─── */
  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set((e.clientX - cx) * 0.12);
      my.set((e.clientY - cy) * 0.12);
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  }, [mx, my]);

  /* ─── Navigation Actions ─── */
  const scrollToEl = useCallback(
    (target: string | number) => {
      if (typeof target === "string") {
        const el = document.getElementById(target);
        if (el && lenis) {
          lenis.scrollTo(el, { offset: -80, duration: SCROLL_DURATION });
        } else if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        if (lenis) {
          lenis.scrollTo(target, { duration: SCROLL_DURATION });
        } else {
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      }
    },
    [lenis]
  );

  const goToTop = useCallback(() => scrollToEl(0), [scrollToEl]);

  const goToBottom = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollToEl(max);
  }, [scrollToEl]);

  const goPrev = useCallback(() => {
    if (currentSection > 0) {
      scrollToEl(SECTION_IDS[currentSection - 1]);
    }
  }, [currentSection, scrollToEl]);

  const goNext = useCallback(() => {
    if (currentSection < LAST_INDEX) {
      scrollToEl(SECTION_IDS[currentSection + 1]);
    }
  }, [currentSection, scrollToEl]);

  /* ─── Derived visibility ─── */
  const showTop = currentSection > 0;
  const showPrev = currentSection > 0;
  const showNext = currentSection < LAST_INDEX;
  const showBottom = currentSection < LAST_INDEX;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 80, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
            mass: 0.8,
          }}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
          role="navigation"
          aria-label="Page section navigation"
        >
          {/* ── Glass pill background ── */}
          <div className="absolute -inset-1.5 rounded-[28px] bg-navy-950/60 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.4)]" />

          {/* ── Ambient glow on hover ── */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.5 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -inset-3 rounded-[32px] bg-gold-500/10 blur-xl pointer-events-none"
          />

          {/* ── Content Stack ── */}
          <div className="relative z-10 flex flex-col items-center gap-1 py-2 px-1">

            {/* ⏫ GO TO TOP (double chevron) */}
            <AnimatePresence mode="wait">
              {showTop && (
                <NavButton
                  key="go-top"
                  onClick={goToTop}
                  label="Go to top"
                  direction="up"
                  variant="jump"
                >
                  <ChevronsUp className="h-4 w-4 text-gold-400" />
                </NavButton>
              )}
            </AnimatePresence>

            {/* ↑ PREV SECTION */}
            <AnimatePresence mode="wait">
              {showPrev && (
                <NavButton
                  key="prev-section"
                  onClick={goPrev}
                  label="Previous section"
                  direction="up"
                  variant="step"
                >
                  <ChevronUp className="h-4 w-4 text-white/60 group-hover:text-gold-400 transition-colors duration-200" />
                </NavButton>
              )}
            </AnimatePresence>

            {/* ● PROGRESS RING + SECTION NUMBER */}
            <div className="relative flex h-11 w-11 items-center justify-center my-0.5">
              {/* SVG ring */}
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 48 48"
              >
                {/* Track */}
                <circle
                  cx="24"
                  cy="24"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
                {/* Progress */}
                <motion.circle
                  cx="24"
                  cy="24"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#scroll-nav-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  style={{ strokeDashoffset }}
                />
                <defs>
                  <linearGradient
                    id="scroll-nav-gold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#C5A572" />
                    <stop offset="50%" stopColor="#E8D5B0" />
                    <stop offset="100%" stopColor="#C5A572" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Pulse glow on section change */}
              <AnimatePresence>
                {justChanged && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-gold-500/25 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Section number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSection}
                  initial={{ opacity: 0, y: 10, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, scale: 0.5, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="relative text-sm font-bold text-gold-400 tabular-nums select-none"
                >
                  {currentSection + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* ↓ NEXT SECTION */}
            <AnimatePresence mode="wait">
              {showNext && (
                <NavButton
                  key="next-section"
                  onClick={goNext}
                  label="Next section"
                  direction="down"
                  variant="step"
                >
                  <ChevronDown className="h-4 w-4 text-white/60 group-hover:text-gold-400 transition-colors duration-200" />
                </NavButton>
              )}
            </AnimatePresence>

            {/* ⏬ GO TO FOOTER / BOTTOM (double chevron) */}
            <AnimatePresence mode="wait">
              {showBottom && (
                <NavButton
                  key="go-bottom"
                  onClick={goToBottom}
                  label="Go to bottom"
                  direction="down"
                  variant="jump"
                >
                  <ChevronsDown className="h-4 w-4 text-gold-400" />
                </NavButton>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Reusable Nav Button ─── */
function NavButton({
  children,
  onClick,
  label,
  direction,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  direction: "up" | "down";
  variant: "step" | "jump";
}) {
  const y = direction === "up" ? -10 : 10;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.4, y }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.4, y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300"
      aria-label={label}
    >
      {/* Hover glow ring */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_16px_rgba(197,165,114,0.35)] bg-gold-500/10" />

      {/* Gold shimmer sweep */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
      </div>

      {/* Separator line for jump buttons */}
      {variant === "jump" && (
        <div
          className={`absolute ${
            direction === "up" ? "bottom-0" : "top-0"
          } left-1/2 -translate-x-1/2 w-5 h-px bg-white/[0.08]`}
        />
      )}

      {/* Icon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={label}
          initial={{ opacity: 0, y: direction === "up" ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction === "up" ? -4 : 4 }}
          transition={{ duration: 0.15 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
