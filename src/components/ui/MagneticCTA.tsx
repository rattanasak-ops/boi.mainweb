"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * MagneticCTA — Refined Luxury Button
 *
 * Design philosophy: "Less is more" — one well-executed detail
 * beats five mediocre effects.
 *
 * Primary: Matte gold surface + subtle luminous glow on hover
 * Secondary: Glass border + gold accent on hover
 *
 * No clip-path, no magnetic pull, no shimmer sweep.
 * Just confidence and craft.
 */

type Variant = "primary" | "secondary";

interface MagneticCTAProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
}

export default function MagneticCTA({
  children,
  href = "#",
  variant = "primary",
  className = "",
  icon,
}: MagneticCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden ${
        isPrimary
          ? "px-9 py-4 rounded-sm text-[15px] font-semibold tracking-[0.02em] text-navy-950"
          : "px-9 py-4 rounded-sm text-[15px] font-medium tracking-[0.02em] text-white/80 hover:text-gold-400/90 transition-colors duration-400"
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {/* ── Primary: Gold surface ── */}
      {isPrimary && (
        <>
          {/* Base gradient — rich, not flat */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 rounded-sm" />

          {/* Hover luminosity — subtle warm glow */}
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Hover outer glow — refined, not loud */}
          <motion.div
            className="absolute -inset-px rounded-sm"
            style={{
              boxShadow: "0 0 30px rgba(197,165,114,0.35), 0 4px 20px rgba(197,165,114,0.2)",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Bottom light line — traces left to right on hover (the single WOW detail) */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/0 via-white/50 to-white/0 rounded-full"
            animate={{
              width: isHovered ? "100%" : "0%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}

      {/* ── Secondary: Glass border ── */}
      {!isPrimary && (
        <>
          {/* Border */}
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              border: "1px solid",
              borderColor: isHovered
                ? "rgba(197,165,114,0.5)"
                : "rgba(255,255,255,0.15)",
            }}
            animate={{
              borderColor: isHovered
                ? "rgba(197,165,114,0.5)"
                : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Frosted background */}
          <div className="absolute inset-0 rounded-sm bg-white/[0.04] backdrop-blur-sm" />

          {/* Hover warm tint */}
          <motion.div
            className="absolute inset-0 rounded-sm bg-gold-500/[0.06]"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}

      {/* ── Content ── */}
      <span className="relative z-10 flex items-center gap-2.5">
        {icon && (
          <span className="flex-shrink-0 opacity-80" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>

      {/* ── Primary arrow — simple, clean ── */}
      {isPrimary && (
        <motion.span
          className="relative z-10 ml-0.5"
          animate={{ x: isHovered ? 3 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M8 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}

    </motion.a>
  );
}
