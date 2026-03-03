"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  /** Total count-up duration in seconds */
  duration?: number;
  /** Delay before starting (seconds) */
  delay?: number;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [done, setDone] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (value) => {
    if (target >= 1000) {
      return Math.round(value).toLocaleString();
    }
    return Math.round(value).toString();
  });

  /* Track when counter reaches target */
  const onDone = useCallback(() => {
    const unsub = spring.on("change", (v) => {
      if (Math.round(v) >= target) {
        setDone(true);
        unsub();
      }
    });
    return unsub;
  }, [spring, target]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        spring.set(target);
        setHasAnimated(true);
        onDone();
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, spring, target, delay, onDone]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      {/* Gold glow pulse when counting finishes */}
      {done && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197,165,114,0.25) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
