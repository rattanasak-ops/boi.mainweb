"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  FileText,
  Stamp,
  Globe2,
  Building2,
  Handshake,
  Calculator,
  ArrowRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Constants & Types
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

type CardVariant = "hero" | "gold" | "wide" | "dark" | "purple" | "calculator";

interface ServiceConfig {
  icon: typeof FileText;
  titleKey: string;
  descKey: string;
  statusKey: string;
  statKey: string;
  ctaKey: string;
  href: string;
  variant: CardVariant;
  counterTarget?: number;
  displayText?: string;
  imageSrc: string;
}

/* ═══════════════════════════════════════════════════════════════
   Card Background per variant — every card looks different
   ═══════════════════════════════════════════════════════════════ */
const CARD_BG: Record<CardVariant, React.CSSProperties> = {
  hero: {
    background:
      "linear-gradient(135deg, rgba(27,42,74,0.7) 0%, rgba(7,11,23,0.82) 50%, rgba(27,42,74,0.65) 100%)",
  },
  wide: {
    background:
      "linear-gradient(160deg, rgba(22,34,64,0.65) 0%, rgba(11,16,30,0.78) 100%)",
  },
  gold: {
    background:
      "linear-gradient(135deg, rgba(212,182,122,0.6) 0%, rgba(197,165,114,0.5) 35%, rgba(176,143,92,0.65) 100%)",
  },
  dark: {
    background:
      "linear-gradient(180deg, rgba(7,11,23,0.6) 0%, rgba(12,18,38,0.72) 100%)",
  },
  purple: {
    background:
      "linear-gradient(135deg, rgba(22,26,50,0.68) 0%, rgba(35,22,55,0.58) 50%, rgba(12,18,38,0.72) 100%)",
  },
  calculator: {
    background:
      "linear-gradient(135deg, rgba(22,34,64,0.65) 0%, rgba(7,11,23,0.75) 60%, rgba(60,48,20,0.3) 100%)",
  },
};

/* Text protection scrim — heavy at bottom where text lives, transparent at top */
const TEXT_SCRIM: Record<CardVariant, React.CSSProperties> = {
  hero: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(7,11,23,0.15) 30%, rgba(7,11,23,0.55) 70%, rgba(7,11,23,0.8) 100%)",
  },
  wide: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(11,16,30,0.2) 35%, rgba(11,16,30,0.6) 75%, rgba(11,16,30,0.85) 100%)",
  },
  gold: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(176,143,92,0.15) 35%, rgba(176,143,92,0.45) 75%, rgba(160,125,75,0.7) 100%)",
  },
  dark: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(7,11,23,0.2) 35%, rgba(7,11,23,0.6) 75%, rgba(7,11,23,0.85) 100%)",
  },
  purple: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(22,18,40,0.2) 35%, rgba(22,18,40,0.6) 75%, rgba(12,18,38,0.85) 100%)",
  },
  calculator: {
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(7,11,23,0.15) 35%, rgba(7,11,23,0.55) 75%, rgba(7,11,23,0.8) 100%)",
  },
};

/* ═══════════════════════════════════════════════════════════════
   Services Configuration
   ═══════════════════════════════════════════════════════════════ */
const services: ServiceConfig[] = [
  {
    icon: FileText,
    titleKey: "einvestment",
    descKey: "einvestment_desc",
    statusKey: "einvestment_status",
    statKey: "einvestment_stat",
    ctaKey: "einvestment_cta",
    href: "/services/e-investment",
    variant: "hero",
    counterTarget: 10000,
    imageSrc: "/images/services/e-investment.jpg",
  },
  {
    icon: Stamp,
    titleKey: "visa",
    descKey: "visa_desc",
    statusKey: "visa_status",
    statKey: "visa_stat",
    ctaKey: "visa_cta",
    href: "/services/visa",
    variant: "wide",
    displayText: "24/7",
    imageSrc: "/images/services/visa-workpermit.jpg",
  },
  {
    icon: Globe2,
    titleKey: "smart_visa",
    descKey: "smart_visa_desc",
    statusKey: "smart_visa_status",
    statKey: "smart_visa_stat",
    ctaKey: "smart_visa_cta",
    href: "/services/smart-visa",
    variant: "gold",
    imageSrc: "/images/services/smart-visa.jpg",
  },
  {
    icon: Building2,
    titleKey: "osos",
    descKey: "osos_desc",
    statusKey: "osos_status",
    statKey: "osos_stat",
    ctaKey: "osos_cta",
    href: "/services/osos",
    variant: "dark",
    displayText: "ONE STOP",
    imageSrc: "/images/services/osos.jpg",
  },
  {
    icon: Handshake,
    titleKey: "matchmaking",
    descKey: "matchmaking_desc",
    statusKey: "matchmaking_status",
    statKey: "matchmaking_stat",
    ctaKey: "matchmaking_cta",
    href: "/services/matchmaking",
    variant: "purple",
    displayText: "500+",
    imageSrc: "/images/services/business-matching.jpg",
  },
  {
    icon: Calculator,
    titleKey: "incentive_calc",
    descKey: "incentive_calc_desc",
    statusKey: "incentive_calc_status",
    statKey: "incentive_calc_stat",
    ctaKey: "incentive_calc_cta",
    href: "/services/incentive-calculator",
    variant: "calculator",
    imageSrc: "/images/services/incentive-calculator.jpg",
  },
];

/* ═══════════════════════════════════════════════════════════════
   Decorative SVGs — unique visual identity per card
   ═══════════════════════════════════════════════════════════════ */

function CircuitDecor() {
  return (
    <svg
      className="absolute right-0 bottom-0 w-[180px] h-[280px] text-gold-400/[0.07] pointer-events-none"
      viewBox="0 0 200 300"
      fill="none"
      aria-hidden="true"
    >
      <path d="M180 0v80H120v80h60v80" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="180" cy="80" r="3.5" fill="currentColor" />
      <circle cx="120" cy="160" r="3.5" fill="currentColor" />
      <path d="M160 30v90H100v80" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="160" cy="30" r="2.5" fill="currentColor" />
      <circle cx="100" cy="200" r="2.5" fill="currentColor" />
      <path
        d="M140 60v40H80v80h60v60"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

function GlobeDecor() {
  return (
    <svg
      className="absolute right-6 top-1/2 -translate-y-1/2 w-[130px] h-[130px] text-gold-400/[0.08] pointer-events-none"
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="65" stroke="currentColor" strokeWidth="0.8" />
      <ellipse cx="80" cy="80" rx="65" ry="28" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="80" cy="80" rx="28" ry="65" stroke="currentColor" strokeWidth="0.6" />
      <line x1="15" y1="80" x2="145" y2="80" stroke="currentColor" strokeWidth="0.4" />
      <line x1="80" y1="15" x2="80" y2="145" stroke="currentColor" strokeWidth="0.4" />
      <ellipse
        cx="80"
        cy="80"
        rx="65"
        ry="48"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

function DiamondDecor() {
  return (
    <svg
      className="absolute right-3 bottom-3 w-[90px] h-[90px] text-navy-900/[0.1] pointer-events-none"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="35"
        y="35"
        width="50"
        height="50"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(45 60 60)"
      />
      <rect
        x="42"
        y="42"
        width="36"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="0.7"
        transform="rotate(45 60 60)"
      />
      <circle cx="60" cy="60" r="8" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function RingsDecor() {
  return (
    <svg
      className="absolute right-2 top-1/2 -translate-y-1/2 w-[160px] h-[160px] text-gold-400/[0.05] pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function NetworkDecor() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-[120px] h-[120px] text-gold-400/[0.08] pointer-events-none"
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="35" r="4" fill="currentColor" />
      <circle cx="125" cy="28" r="3.5" fill="currentColor" />
      <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.5" />
      <circle cx="130" cy="115" r="3.5" fill="currentColor" />
      <circle cx="35" cy="125" r="4" fill="currentColor" />
      <circle cx="110" cy="70" r="2.5" fill="currentColor" />
      <line x1="40" y1="35" x2="80" y2="80" stroke="currentColor" strokeWidth="0.6" />
      <line x1="125" y1="28" x2="80" y2="80" stroke="currentColor" strokeWidth="0.6" />
      <line x1="80" y1="80" x2="130" y2="115" stroke="currentColor" strokeWidth="0.6" />
      <line x1="80" y1="80" x2="35" y2="125" stroke="currentColor" strokeWidth="0.6" />
      <line
        x1="80"
        y1="80"
        x2="110"
        y2="70"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="3 2"
      />
    </svg>
  );
}

function ChartDecor() {
  return (
    <svg
      className="absolute right-6 bottom-8 w-[130px] h-[90px] text-gold-400/[0.06] pointer-events-none"
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden="true"
    >
      <rect x="10" y="70" width="18" height="50" rx="3" fill="currentColor" />
      <rect x="38" y="40" width="18" height="80" rx="3" fill="currentColor" />
      <rect x="66" y="55" width="18" height="65" rx="3" fill="currentColor" />
      <rect x="94" y="20" width="18" height="100" rx="3" fill="currentColor" />
      <rect x="122" y="35" width="18" height="85" rx="3" fill="currentColor" />
      <line x1="5" y1="120" x2="155" y2="120" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

const DECOR_MAP: Record<CardVariant, React.FC> = {
  hero: CircuitDecor,
  wide: GlobeDecor,
  gold: DiamondDecor,
  dark: RingsDecor,
  purple: NetworkDecor,
  calculator: ChartDecor,
};

/* ═══════════════════════════════════════════════════════════════
   Animated Counter — cinematic count-up on scroll
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({
  target,
  suffix = "+",
  duration = 2.5,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const totalFrames = Math.round(duration * 60);
    let frame = 0;
    const tick = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.floor(progress * target));
      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Activity Bars — live-feel chart for hero card
   ═══════════════════════════════════════════════════════════════ */
function ActivityBars() {
  const bars = useMemo(
    () => [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.75, 0.55, 0.85],
    []
  );
  return (
    <div className="flex items-end gap-[3px] h-10" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gold-400/50"
          style={{ height: `${h * 100}%` }}
          animate={{
            height: [`${h * 100}%`, `${(h * 0.4 + 0.3) * 100}%`, `${h * 100}%`],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Floating Particles — ambient gold dots
   ═══════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: 2 + (i % 3),
        x: 8 + i * 12,
        y: 5 + ((i * 23) % 85),
        duration: 16 + i * 3,
        delay: i * 1.5,
      })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-400"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-25, 25, -25], x: [-15, 15, -15], opacity: [0.06, 0.18, 0.06] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Portal Card — 3D tilt + spotlight + variant-specific visuals
   ═══════════════════════════════════════════════════════════════ */
function PortalCard({
  service,
  t,
  index,
}: {
  service: ServiceConfig;
  t: ReturnType<typeof useTranslations>;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  /* ── Variant flags ── */
  const isGold = service.variant === "gold";
  const isHero = service.variant === "hero";
  const isDark = service.variant === "dark";
  const isPurple = service.variant === "purple";
  const isCalc = service.variant === "calculator";
  const isWide = service.variant === "wide";

  /* ── 3D Tilt ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  /* ── Spotlight ── */
  const spotX = useTransform(smoothX, [0, 1], [0, 100]);
  const spotY = useTransform(smoothY, [0, 1], [0, 100]);
  const spotlightBg = useMotionTemplate`radial-gradient(500px circle at ${spotX}% ${spotY}%, ${
    isGold ? "rgba(255,255,255,0.15)" : "rgba(197,165,114,0.14)"
  }, transparent 55%)`;

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current || prefersReduced) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, prefersReduced]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  /* ── Grid class ── */
  const gridClass = isHero
    ? "lg:row-span-2"
    : isWide || isCalc
      ? "lg:col-span-2"
      : "";

  /* ── Decor SVG ── */
  const DecorSVG = DECOR_MAP[service.variant];

  return (
    /* Layer 1: Entrance */
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { clipPath: "inset(5% 50% 5% 50%)", opacity: 0 }
      }
      whileInView={
        prefersReduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: EASE_OUT }}
      className={gridClass}
    >
      {/* Layer 2: Card wrapper */}
      <div
        className="h-full"
        style={{ perspective: 800 }}
      >
        {/* Layer 3: 3D tilt + card lift */}
        <motion.a
          ref={cardRef}
          href={service.href}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={
            prefersReduced
              ? {}
              : { rotateX, rotateY, transformStyle: "preserve-3d" as const }
          }
          animate={isHovered && !prefersReduced ? { y: -10 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl
            border transition-all duration-500
            ${
              isHovered
                ? isGold
                  ? "border-gold-700/40 shadow-[0_12px_50px_rgba(27,42,74,0.25),0_0_60px_rgba(197,165,114,0.1)]"
                  : "border-gold-500/30 shadow-[0_12px_50px_rgba(197,165,114,0.15),0_0_80px_rgba(197,165,114,0.06)]"
                : isGold
                  ? "border-gold-600/25"
                  : "border-white/[0.06]"
            }
            ${isHero ? "p-8 sm:p-10 min-h-[340px] lg:min-h-0" : "p-6 lg:p-7 min-h-[200px]"}
          `}
        >
          {/* ── Card Image BG — dims on hover for text focus ── */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <motion.img
              src={service.imageSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              animate={isHovered ? { opacity: 0.5, filter: "brightness(0.6)" } : { opacity: 1, filter: "brightness(1)" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* ── Card BG overlay (unique per variant) ── */}
          <div className="absolute inset-0 rounded-2xl" style={CARD_BG[service.variant]} />

          {/* ── Text protection scrim — bottom-heavy gradient ── */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={TEXT_SCRIM[service.variant]}
            animate={{ opacity: isHovered ? 1 : 0.85 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          />

          {/* ── Hero: extra gradient mesh ── */}
          {isHero && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 85% 15%, rgba(197,165,114,0.1) 0%, transparent 50%), radial-gradient(ellipse at 15% 85%, rgba(27,42,74,0.5) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />
          )}

          {/* ── Gold: shimmer sweep ── */}
          {isGold && !prefersReduced && (
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-0 w-[200%]"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.18) 50%, transparent 75%)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {/* ── Purple: subtle gradient overlay ── */}
          {isPurple && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 30%, rgba(120,80,200,0.06) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
          )}

          {/* ── Calculator: gold edge glow ── */}
          {isCalc && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 100%, rgba(197,165,114,0.08) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />
          )}

          {/* ── Decorative SVG (unique per card) ── */}
          <DecorSVG />

          {/* ── OSOS: Large background text ── */}
          {isDark && service.displayText && (
            <div
              className="absolute bottom-4 right-5 pointer-events-none select-none"
              aria-hidden="true"
            >
              <span className="text-5xl sm:text-6xl font-black text-white/[0.03] tracking-widest">
                {service.displayText}
              </span>
            </div>
          )}

          {/* ── Spotlight ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: spotlightBg }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* ── Top accent line ── */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              className={`h-full w-full bg-gradient-to-r ${
                isGold
                  ? "from-navy-600/50 via-navy-800/70 to-navy-600/50"
                  : "from-gold-300 via-gold-500 to-gold-300"
              }`}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            />
          </div>

          {/* ── Hero: left accent line ── */}
          {isHero && (
            <div className="absolute top-0 left-0 bottom-0 w-[2px] overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-gold-500/60 via-gold-400/20 to-transparent"
                initial={{ scaleY: 0, transformOrigin: "top" }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
              />
            </div>
          )}

          {/* ═══════════ Card Content ═══════════ */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon + Status Badge Row */}
            <div className="flex items-start justify-between mb-auto pb-4">
              <motion.div
                className={`
                  flex items-center justify-center rounded-xl border backdrop-blur-sm transition-colors duration-300
                  ${
                    isGold
                      ? "bg-navy-900/20 border-navy-900/25 group-hover:bg-navy-900/30"
                      : "bg-navy-900/40 border-gold-500/20 group-hover:bg-navy-900/50 group-hover:border-gold-400/35"
                  }
                  ${isHero ? "h-16 w-16" : "h-12 w-12"}
                `}
                animate={
                  isHovered && !prefersReduced
                    ? { y: -5, scale: 1.1, rotate: 5 }
                    : { y: 0, scale: 1, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <service.icon
                  className={`${isGold ? "text-navy-800" : "text-gold-400"} ${
                    isHero ? "h-8 w-8" : "h-5 w-5"
                  }`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Status Badge */}
              <motion.div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                  isGold
                    ? "bg-navy-900/20 border-navy-900/20"
                    : "bg-navy-900/40 border-emerald-500/15"
                }`}
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 ${
                      isGold ? "bg-navy-800" : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isGold ? "bg-navy-800" : "bg-emerald-400"
                    }`}
                  />
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-wide whitespace-nowrap ${
                    isGold ? "text-navy-800" : "text-emerald-300"
                  }`}
                >
                  {t(service.statusKey)}
                </span>
              </motion.div>
            </div>

            {/* Title — text-shadow for readability over images */}
            <motion.h3
              className={`
                font-bold transition-colors duration-300
                ${isGold ? "text-navy-900 group-hover:text-navy-950" : "text-white group-hover:text-gold-200"}
                ${isHero ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}
              `}
              style={isGold ? {} : { textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)" }}
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              {t(service.titleKey)}
            </motion.h3>

            {/* Description */}
            <p
              className={`
                mt-2 leading-relaxed transition-colors duration-300
                ${
                  isGold
                    ? "text-navy-800/80 group-hover:text-navy-900 text-sm"
                    : isHero
                      ? "text-white/60 group-hover:text-white/80 text-base"
                      : "text-white/50 group-hover:text-white/70 text-sm"
                }
              `}
              style={isGold ? {} : { textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
            >
              {t(service.descKey)}
            </p>

            {/* ── Hero: Animated Counter + Activity Bars ── */}
            {isHero && service.counterTarget && (
              <div className="mt-6 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-bold text-gold-400 tracking-tight leading-none">
                    <AnimatedCounter target={service.counterTarget} />
                  </span>
                  <span className="text-sm text-white/30 font-medium">
                    {t("einvestment_counter_label")}
                  </span>
                </div>
                <ActivityBars />
              </div>
            )}

            {/* ── Wide (Visa): Display "24/7" ── */}
            {isWide && service.displayText && (
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold text-gold-400/30 tracking-tight leading-none">
                  {service.displayText}
                </span>
                <span
                  className={`text-xs font-medium tracking-wide px-3 py-1.5 rounded-lg
                    bg-gold-500/[0.06] border border-gold-500/[0.08]
                    text-gold-400/70 group-hover:text-gold-400/90
                    group-hover:bg-gold-500/[0.1] transition-colors duration-300`}
                >
                  {t(service.statKey)}
                </span>
              </div>
            )}

            {/* ── Gold: Stat Badge ── */}
            {isGold && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900/8 border border-navy-900/10 group-hover:bg-navy-900/12 transition-colors duration-300">
                <span className="text-xs font-medium text-navy-700 group-hover:text-navy-800 tracking-wide transition-colors duration-300">
                  {t(service.statKey)}
                </span>
              </div>
            )}

            {/* ── Dark (OSOS): Stat Badge ── */}
            {isDark && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/[0.06] border border-gold-500/[0.08] group-hover:bg-gold-500/[0.1] group-hover:border-gold-500/[0.15] transition-colors duration-300">
                <span className="text-xs font-medium text-gold-400/70 group-hover:text-gold-400/90 tracking-wide transition-colors duration-300">
                  {t(service.statKey)}
                </span>
              </div>
            )}

            {/* ── Purple (Matchmaking): Display "500+" ── */}
            {isPurple && service.displayText && (
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-gold-400/25 tracking-tight leading-none">
                  {service.displayText}
                </span>
                <span
                  className={`text-xs font-medium tracking-wide px-3 py-1.5 rounded-lg
                    bg-gold-500/[0.06] border border-gold-500/[0.08]
                    text-gold-400/70 group-hover:text-gold-400/90
                    group-hover:bg-gold-500/[0.1] transition-colors duration-300`}
                >
                  {t(service.statKey)}
                </span>
              </div>
            )}

            {/* ── Calculator: Mini Preview ── */}
            {isCalc && (
              <div className="mt-5 space-y-3" aria-hidden="true">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-3 gap-2 group-hover:border-gold-500/15 transition-colors duration-300 overflow-hidden">
                    <span className="text-[11px] text-white/25 whitespace-nowrap group-hover:text-white/35 transition-colors">
                      {t("incentive_calc_placeholder")}
                    </span>
                    <span className="text-[11px] text-white/10">|</span>
                    <span className="text-[11px] text-gold-400/40 font-medium tabular-nums">
                      ฿ ---
                    </span>
                  </div>
                  <motion.div
                    className="shrink-0 px-3.5 py-2 rounded-lg bg-gold-500/15 border border-gold-500/20 group-hover:bg-gold-500/25 transition-colors duration-300"
                    animate={isHovered ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Calculator className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                  </motion.div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/[0.06] border border-gold-500/[0.08]">
                  <span className="text-xs font-medium text-gold-400/70 tracking-wide">
                    {t(service.statKey)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ── CTA Row — Glow pill on hover ── */}
          <motion.div
            className={`
              relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full
              transition-all duration-400
              ${
                isGold
                  ? "group-hover:bg-navy-900/15 group-hover:backdrop-blur-sm"
                  : "group-hover:bg-gold-500/10 group-hover:backdrop-blur-sm group-hover:shadow-[0_0_20px_rgba(197,165,114,0.15)]"
              }
            `}
            animate={isHovered && !prefersReduced ? { x: 4, y: -2 } : { x: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                isGold
                  ? "text-navy-800/70 group-hover:text-navy-900"
                  : "text-gold-400/60 group-hover:text-gold-300"
              }`}
              style={isGold ? {} : { textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              {t(service.ctaKey)}
            </span>
            <motion.span
              animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
              transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            >
              <ArrowRight
                className={`h-4 w-4 transition-colors duration-300 ${
                  isGold
                    ? "text-navy-800/70 group-hover:text-navy-900"
                    : "text-gold-400/60 group-hover:text-gold-300"
                }`}
                aria-hidden="true"
              />
            </motion.span>
          </motion.div>

          {/* ── Bottom glow ── */}
          <div
            className={`
              absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-28
              rounded-full blur-3xl pointer-events-none transition-opacity duration-700
              ${isGold ? "bg-navy-900" : "bg-gold-500"}
              ${isHovered ? "opacity-[0.06]" : "opacity-0"}
            `}
            aria-hidden="true"
          />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Section — "Your Gateways Are Open"
   ═══════════════════════════════════════════════════════════════ */
export default function QuickServicesSection() {
  const t = useTranslations("services");
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-navy-950 overflow-hidden">
      {/* ── BG: Gradient mesh ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 20%, rgba(27,42,74,0.5) 0%, transparent 50%), radial-gradient(ellipse at 75% 80%, rgba(27,42,74,0.3) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* ── BG: Grid lines ── */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,165,114,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,114,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── BG: Gold radial accent ── */}
      <div
        className="absolute top-0 left-1/4 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(197,165,114,0.07) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* ── BG: Floating particles ── */}
      {!prefersReduced && <FloatingParticles />}

      {/* ── BG: Animated vertical lines ── */}
      <div
        className="absolute right-8 sm:right-12 lg:right-20 top-0 w-px h-full bg-gold-500/[0.06]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 w-full h-40 bg-gradient-to-b from-transparent via-gold-400/40 to-transparent"
          animate={{ top: ["100%", "-160px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </div>
      <div
        className="absolute left-8 sm:left-12 lg:left-20 top-0 w-px h-full bg-gold-500/[0.04]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-gold-400/20 to-transparent"
          animate={{ top: ["-128px", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* ═══════════ HEADER ═══════════ */}
        <motion.div
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { clipPath: "inset(0 50% 0 50%)", opacity: 0 }
          }
          whileInView={
            prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0%)", opacity: 1 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mb-14 sm:mb-20 max-w-3xl"
        >
          <p className="text-gold-400 font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <motion.div
            className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          />
          <p className="mt-4 text-white/25 text-base tracking-wide">{t("tagline")}</p>
        </motion.div>

        {/* ═══════════ BENTO GRID ═══════════
            Row 1: Hero (col1, 2rows) | Visa wide (col2-3)
            Row 2: Hero continues     | Smart Visa [GOLD] | OSOS [DARK]
            Row 3: Matchmaking [PURPLE]| Calculator wide (col2-3)
            ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <PortalCard
              key={service.titleKey}
              service={service}
              t={t}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ═══════════ BOTTOM TRANSITION ═══════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1600 80"
          preserveAspectRatio="none"
          className="block w-full h-[50px] sm:h-[60px] lg:h-[80px]"
          aria-hidden="true"
        >
          <polygon points="0,80 1600,80 1600,0" className="fill-white" />
        </svg>
      </div>
    </section>
  );
}
