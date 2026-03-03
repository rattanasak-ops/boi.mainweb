"use client";

/**
 * BOILogo — Interactive Thailand Board of Investment Logo
 *
 * Act As:
 *  P1 (SVG Illustrator): 3 golden intertwining loops with metallic gradients
 *  P2 (Motion Engineer): Stroke draw on load, spring-based depth separation
 *  P3 (Interaction Designer): Mouse-driven 3D parallax + gold shimmer trail
 *
 * Variants: header | header-white | footer | loading
 */

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ── Types ── */
type BOILogoVariant = "header" | "header-white" | "footer" | "loading";

type BOILogoProps = {
  variant?: BOILogoVariant;
  className?: string;
  interactive?: boolean;
};

/* ── Constants ── */
const NAVY = "#1B2A4A";
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SIZES: Record<BOILogoVariant, { w: number; h: number }> = {
  header: { w: 240, h: 60 },
  "header-white": { w: 240, h: 60 },
  footer: { w: 280, h: 72 },
  loading: { w: 360, h: 96 },
};

export default function BOILogo({
  variant = "header",
  className,
  interactive: interactiveProp,
}: BOILogoProps) {
  const interactive = interactiveProp ?? variant !== "loading";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* ── Mouse tracking — normalized -1..1 ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Smooth spring follow (P3: lerp interpolation) */
  const springCfg = { stiffness: 150, damping: 20 };
  const sx = useSpring(mouseX, springCfg);
  const sy = useSpring(mouseY, springCfg);

  /* ── 3D Depth Separation (P3) ──
     Each loop layer moves at different rate/direction
     Creates convincing parallax depth when mouse moves */
  const l1x = useTransform(sx, [-1, 1], [-6, 6]);
  const l1y = useTransform(sy, [-1, 1], [-5, 5]);
  const l2x = useTransform(sx, [-1, 1], [-2, 2]);
  const l2y = useTransform(sy, [-1, 1], [-1.5, 1.5]);
  const l3x = useTransform(sx, [-1, 1], [4, -4]);
  const l3y = useTransform(sy, [-1, 1], [3, -3]);

  /* ── Gold shimmer offset (P3) ── */
  const shX = useTransform(sx, [-1, 1], [-22, 22]);
  const shY = useTransform(sy, [-1, 1], [-18, 18]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !interactive) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [interactive, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const isWhite = variant === "header-white" || variant === "footer";
  const textFill = isWhite ? "#ffffff" : NAVY;
  const { w, h } = SIZES[variant];
  const isLoading = variant === "loading";

  /* Unique ID prefix — prevents SVG gradient conflicts when multiple instances */
  const uid = `boi-${variant}`;

  /* Stroke draw transition for loading variant (P2) */
  const drawTransition = (delay: number) => ({
    duration: 1.8,
    delay,
    ease: EASE_OUT,
  });

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none ${interactive ? "cursor-pointer" : ""} ${className ?? ""}`}
      style={{ width: w, height: h }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={interactive ? { scale: 1.03 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <svg
        viewBox="0 0 340 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Thailand Board of Investment"
        role="img"
      >
        <defs>
          {/* ── Gold metallic gradients — different angle per loop for 3D depth (P1) ── */}
          <linearGradient
            id={`${uid}-g1`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F5D76E" />
            <stop offset="30%" stopColor="#E8C547" />
            <stop offset="65%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient
            id={`${uid}-g2`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="35%" stopColor="#F5D76E" />
            <stop offset="70%" stopColor="#E8C547" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient
            id={`${uid}-g3`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E8C547" />
            <stop offset="45%" stopColor="#F5D76E" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>

          {/* Shimmer blur filter (P3) */}
          <filter id={`${uid}-blur`}>
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* Clip shimmer to mark area only */}
          <clipPath id={`${uid}-mc`}>
            <rect x="0" y="0" width="100" height="86" />
          </clipPath>
        </defs>

        {/* ═══════════════════════════════════════
            LOGO MARK: 3 Golden Intertwining Loops
            P1 (SVG Illustrator): Elliptical curves with
            metallic gold gradients, separated into 3
            animatable layers for depth effect
            ═══════════════════════════════════════ */}
        <g transform="translate(6, 3)">
          {/* Loop 1 (back — largest, deepest) */}
          <motion.g
            style={interactive ? { x: l1x, y: l1y } : undefined}
          >
            <motion.ellipse
              cx="40"
              cy="50"
              rx="34"
              ry="20"
              transform="rotate(-42 40 50)"
              fill="none"
              stroke={`url(#${uid}-g1)`}
              strokeWidth="7"
              strokeLinecap="round"
              {...(isLoading
                ? {
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: drawTransition(0.2),
                  }
                : {})}
            />
          </motion.g>

          {/* Loop 2 (middle) */}
          <motion.g
            style={interactive ? { x: l2x, y: l2y } : undefined}
          >
            <motion.ellipse
              cx="46"
              cy="42"
              rx="27"
              ry="16"
              transform="rotate(-28 46 42)"
              fill="none"
              stroke={`url(#${uid}-g2)`}
              strokeWidth="6.5"
              strokeLinecap="round"
              {...(isLoading
                ? {
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: drawTransition(0.5),
                  }
                : {})}
            />
          </motion.g>

          {/* Loop 3 (front — smallest, closest) */}
          <motion.g
            style={interactive ? { x: l3x, y: l3y } : undefined}
          >
            <motion.ellipse
              cx="52"
              cy="35"
              rx="21"
              ry="13"
              transform="rotate(-14 52 35)"
              fill="none"
              stroke={`url(#${uid}-g3)`}
              strokeWidth="6"
              strokeLinecap="round"
              {...(isLoading
                ? {
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: drawTransition(0.8),
                  }
                : {})}
            />
          </motion.g>

          {/* ── Gold shimmer (P3) ──
              Blurred circle that follows mouse cursor
              Clipped to mark area, creates metallic light reflection */}
          <AnimatePresence>
            {isHovered && interactive && (
              <g clipPath={`url(#${uid}-mc)`}>
                <motion.circle
                  cx="46"
                  cy="42"
                  r="24"
                  fill="rgba(255,255,240,0.35)"
                  filter={`url(#${uid}-blur)`}
                  style={{ x: shX, y: shY }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </g>
            )}
          </AnimatePresence>
        </g>

        {/* ═══════════════════════════════════════
            TEXT: THAILAND BOARD OF INVESTMENT
            P1: Tracked navy text, matches brand guidelines
            Loading variant: fades in after strokes complete
            ═══════════════════════════════════════ */}
        <motion.g
          {...(isLoading
            ? {
                initial: { opacity: 0, x: 12 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 1.8, ease: EASE_OUT },
              }
            : {})}
        >
          <text
            x="112"
            y="30"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontSize="16"
            fontWeight="800"
            fill={textFill}
            letterSpacing="2.5"
          >
            THAILAND
          </text>
          <text
            x="112"
            y="52"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontSize="16"
            fontWeight="800"
            fill={textFill}
            letterSpacing="2.5"
          >
            BOARD OF
          </text>
          <text
            x="112"
            y="74"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontSize="16"
            fontWeight="800"
            fill={textFill}
            letterSpacing="2.5"
          >
            INVESTMENT
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
