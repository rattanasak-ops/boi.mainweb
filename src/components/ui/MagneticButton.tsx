"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

/**
 * Magnetic hover effect — element subtly follows cursor within its bounds.
 * Inspired by Stripe/Linear interactions.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="inline-block">
      <Tag
        href={as === "a" ? href : undefined}
        onClick={onClick}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
        className={className}
      >
        {children}
      </Tag>
    </div>
  );
}
