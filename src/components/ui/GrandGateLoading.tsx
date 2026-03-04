"use client";

/**
 * GrandGateLoading — Cinematic Gate Opener Intro
 *
 * PERFORMANCE RULE: Animate ONLY transform + opacity (GPU compositor)
 * ZERO boxShadow / filter / width / height animations = 60fps guaranteed
 *
 * 4 steps, ~5.6s total (cinematic pacing):
 *   Step 0 (0–1.5s):   Logo stroke draw + text fade in
 *   Step 1 (1.5–2.4s): Glow intensifies (opacity on pre-rendered glow divs)
 *   Step 2 (2.4–4.8s): Curtain reveal — skewX + translateX (bottom opens wider)
 *   Step 3 (4.8–5.6s): Overlay fades out (opacity) → hero visible
 *
 * Shows once per session (sessionStorage).
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "boi-grand-gate-seen";

/* Premium easing — slow start, dramatic decel */
const EASE = [0.25, 1, 0.5, 1] as [number, number, number, number];
/* Extra-cinematic easing for curtain reveal */
const CURTAIN_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function GrandGateLoading() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const t = timerRef.current;
    t.push(setTimeout(() => setStep(1), 1500));
    t.push(setTimeout(() => setStep(2), 2400));
    t.push(setTimeout(() => setStep(3), 4800));
    t.push(setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setStep(4);
    }, 5600));
    return () => t.forEach(clearTimeout);
  }, [dismissed]);

  if (dismissed || step >= 4) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999]"
      style={{
        willChange: "opacity",
        pointerEvents: step >= 3 ? "none" : "auto",
      }}
      animate={{ opacity: step >= 3 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden="true"
    >
      {/* ════════════════════════════════════════
          LEFT DOOR
          ════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 left-0 w-[50.5%] h-full bg-[#0B1122]"
        style={{ willChange: "transform" }}
        animate={{
          x: step >= 2 ? "-105%" : "0%",
          skewX: step >= 2 ? -12 : 0,
        }}
        transition={{ duration: 2.2, ease: CURTAIN_EASE }}
      >
        {/* Static subtle pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(280, ${80 + i * 130})`}>
              <path d="M0,-28 L18,0 L0,28 L-18,0 Z" fill="none" stroke="#C5A572" strokeWidth="0.4" />
              <path d="M0,-14 L9,0 L0,14 L-9,0 Z" fill="none" stroke="#C5A572" strokeWidth="0.25" />
            </g>
          ))}
        </svg>

        {/* Gold edge line (static) */}
        <div
          className="absolute top-0 right-0 w-px h-full"
          style={{
            background: "linear-gradient(to bottom, transparent 15%, rgba(197,165,114,0.4) 50%, transparent 85%)",
          }}
        />

        {/* Pre-rendered glow — toggle with opacity only */}
        <motion.div
          className="absolute top-0 right-0 w-[60px] h-full"
          style={{
            background: "linear-gradient(to left, rgba(245,215,110,0.15) 0%, transparent 100%)",
          }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </motion.div>

      {/* ════════════════════════════════════════
          RIGHT DOOR
          ════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 right-0 w-[50.5%] h-full bg-[#0B1122]"
        style={{ willChange: "transform" }}
        animate={{
          x: step >= 2 ? "105%" : "0%",
          skewX: step >= 2 ? 12 : 0,
        }}
        transition={{ duration: 2.2, ease: CURTAIN_EASE }}
      >
        {/* Static subtle pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} transform={`translate(120, ${80 + i * 130})`}>
              <path d="M0,-28 L18,0 L0,28 L-18,0 Z" fill="none" stroke="#C5A572" strokeWidth="0.4" />
              <path d="M0,-14 L9,0 L0,14 L-9,0 Z" fill="none" stroke="#C5A572" strokeWidth="0.25" />
            </g>
          ))}
        </svg>

        {/* Gold edge line (static) */}
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{
            background: "linear-gradient(to bottom, transparent 15%, rgba(197,165,114,0.4) 50%, transparent 85%)",
          }}
        />

        {/* Pre-rendered glow — toggle with opacity only */}
        <motion.div
          className="absolute top-0 left-0 w-[60px] h-full"
          style={{
            background: "linear-gradient(to right, rgba(245,215,110,0.15) 0%, transparent 100%)",
          }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </motion.div>

      {/* ════════════════════════════════════════
          CENTER SEAM — thin gold line
          ════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 left-1/2 h-full z-10"
        style={{
          width: 2,
          marginLeft: -1,
          background: "linear-gradient(to bottom, transparent 8%, rgba(197,165,114,0.6) 35%, rgba(245,215,110,0.85) 50%, rgba(197,165,114,0.6) 65%, transparent 92%)",
        }}
        animate={{ opacity: step >= 2 ? 0 : step >= 1 ? 1 : 0.4 }}
        transition={{ duration: step >= 2 ? 0.3 : 0.6, ease: EASE }}
      />

      {/* Seam glow (pre-rendered, opacity only) */}
      <motion.div
        className="absolute top-0 left-1/2 h-full z-[9]"
        style={{
          width: 80,
          marginLeft: -40,
          background: "radial-gradient(ellipse at center, rgba(245,215,110,0.2) 0%, transparent 70%)",
        }}
        animate={{ opacity: step === 1 ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* ════════════════════════════════════════
          CENTER CONTENT — Logo + Text
          All animations: transform + opacity ONLY
          ════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        style={{ willChange: "transform, opacity" }}
        animate={{
          opacity: step >= 2 ? 0 : 1,
          scale: step >= 2 ? 0.9 : 1,
          y: step >= 2 ? -20 : 0,
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* BOI Logo — stroke draw (pathLength is GPU-friendly) */}
        <svg viewBox="0 0 100 86" className="w-24 h-20 sm:w-32 sm:h-28" fill="none">
          <defs>
            <linearGradient id="gl-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D76E" />
              <stop offset="50%" stopColor="#E8C547" />
              <stop offset="100%" stopColor="#D4A017" />
            </linearGradient>
          </defs>
          <motion.ellipse
            cx="40" cy="50" rx="34" ry="20" transform="rotate(-42 40 50)"
            stroke="url(#gl-g)" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          />
          <motion.ellipse
            cx="46" cy="42" rx="27" ry="16" transform="rotate(-28 46 42)"
            stroke="url(#gl-g)" strokeWidth="4.5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          />
          <motion.ellipse
            cx="52" cy="35" rx="21" ry="13" transform="rotate(-14 52 35)"
            stroke="url(#gl-g)" strokeWidth="4" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />
        </svg>

        {/* Title — single element, no letter-by-letter */}
        <motion.p
          className="mt-6 text-sm sm:text-base tracking-[0.3em] uppercase font-semibold text-gold-400/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        >
          Board of Investment
        </motion.p>

        {/* Gold divider — use scaleX instead of width (GPU only) */}
        <motion.div
          className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-3 text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/30 font-medium"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
        >
          Thailand Opens for You
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
