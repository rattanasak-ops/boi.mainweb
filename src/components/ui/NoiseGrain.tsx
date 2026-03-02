"use client";

interface NoiseGrainProps {
  /** opacity of the grain texture (0.01 = very subtle, 0.05 = visible) */
  opacity?: number;
  className?: string;
}

/**
 * Noise grain texture overlay for dark sections.
 * Adds premium depth like Stripe/Vercel.
 * Uses inline SVG data URI — no external file needed.
 */
export default function NoiseGrain({ opacity = 0.03, className = "" }: NoiseGrainProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px",
      }}
    />
  );
}
