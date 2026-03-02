"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

/**
 * Card with a cursor-tracking glow border + subtle inner light.
 * The glow follows the mouse position around the card edges.
 */
export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(197, 165, 114, 0.4)",
  borderRadius = "1rem",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const opacity = useMotionValue(0);
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });

  // Reactive gradient backgrounds using useMotionTemplate
  const outerGlow = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${glowColor}, transparent 40%)`;
  const innerGlow = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, rgba(197, 165, 114, 0.06), transparent 40%)`;

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    opacity.set(1);
  };

  const handleLeave = () => {
    opacity.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`relative group ${className}`}
      style={{ borderRadius }}
    >
      {/* Outer glow border */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0"
        style={{
          borderRadius,
          opacity: springOpacity,
          background: outerGlow,
        }}
      />

      {/* Inner glow spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius,
          opacity: springOpacity,
          background: innerGlow,
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}
