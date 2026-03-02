"use client";

import { motion } from "framer-motion";

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
}

interface FloatingOrbsProps {
  /** "hero" = larger, more dramatic | "section" = subtler, smaller */
  variant?: "hero" | "section";
  className?: string;
}

const heroOrbs: OrbConfig[] = [
  { size: 400, x: "10%", y: "20%", color: "rgba(197, 165, 114, 0.08)", delay: 0, duration: 20 },
  { size: 300, x: "75%", y: "15%", color: "rgba(27, 42, 74, 0.15)", delay: 2, duration: 25 },
  { size: 250, x: "60%", y: "65%", color: "rgba(197, 165, 114, 0.06)", delay: 4, duration: 22 },
  { size: 200, x: "20%", y: "70%", color: "rgba(27, 42, 74, 0.12)", delay: 1, duration: 18 },
  { size: 150, x: "85%", y: "50%", color: "rgba(197, 165, 114, 0.05)", delay: 3, duration: 24 },
];

const sectionOrbs: OrbConfig[] = [
  { size: 250, x: "5%", y: "30%", color: "rgba(197, 165, 114, 0.06)", delay: 0, duration: 22 },
  { size: 200, x: "80%", y: "20%", color: "rgba(27, 42, 74, 0.10)", delay: 3, duration: 20 },
  { size: 150, x: "50%", y: "70%", color: "rgba(197, 165, 114, 0.04)", delay: 1, duration: 25 },
];

/**
 * Floating orb decorations for premium atmosphere.
 * Soft blurred circles that float gently — like Stripe/Vercel background effects.
 */
export default function FloatingOrbs({ variant = "hero", className = "" }: FloatingOrbsProps) {
  const orbs = variant === "hero" ? heroOrbs : sectionOrbs;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
