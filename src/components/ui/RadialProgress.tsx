"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RadialProgressProps {
  /** 0–100 percentage to fill */
  percent: number;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of the fill animation (seconds) */
  duration?: number;
  /** Icon or element rendered in the center */
  children: ReactNode;
}

/**
 * Animated SVG radial ring with gold gradient stroke.
 * Fills from 0 → percent when scrolled into view.
 */
export default function RadialProgress({
  percent,
  delay = 0,
  duration = 1.8,
  children,
}: RadialProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /* Circle math — radius 42 in a 100×100 viewBox */
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const target = circumference * (1 - percent / 100);

  return (
    <div ref={ref} className="relative mx-auto h-20 w-20 sm:h-24 sm:w-24">
      {/* Track ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />

        {/* Animated fill ring */}
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#gold-ring)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView ? { strokeDashoffset: target } : { strokeDashoffset: circumference }
          }
          transition={{ duration, delay, ease: EASE_OUT }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gold-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A572" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D4B896" stopOpacity="1" />
            <stop offset="100%" stopColor="#C5A572" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow pulse when animation completes */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ boxShadow: "0 0 0px rgba(197,165,114,0)" }}
        animate={
          isInView
            ? {
                boxShadow: [
                  "0 0 0px rgba(197,165,114,0)",
                  "0 0 30px rgba(197,165,114,0.3)",
                  "0 0 10px rgba(197,165,114,0.1)",
                ],
              }
            : {}
        }
        transition={{
          duration: 1.2,
          delay: delay + duration - 0.3,
          ease: "easeOut",
        }}
      />

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
