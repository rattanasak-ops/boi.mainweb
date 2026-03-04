"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── Types ── */
export interface BreadcrumbItem {
  /** Already-translated label text */
  label: string;
  /** Link href — last item should have no href (current page) */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Disable entrance animation (for use inside already-animated heroes) */
  noAnimation?: boolean;
}

/**
 * Breadcrumb — Standalone reusable breadcrumb navigation.
 *
 * P-B (Component Engineer): extracted from StandardHero pattern.
 * WCAG 2.4.8: `<nav aria-label="Breadcrumb">` + proper structure.
 *
 * Usage:
 * <Breadcrumb items={[
 *   { label: "Home", href: "/" },
 *   { label: "Invest", href: "/invest" },
 *   { label: "Getting Started" },
 * ]} />
 */
export default function Breadcrumb({
  items,
  className = "",
  noAnimation = false,
}: BreadcrumbProps) {
  const Wrapper = noAnimation ? "nav" : motion.nav;
  const wrapperProps = noAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.2, ease: EASE_OUT },
      };

  return (
    <Wrapper
      aria-label="Breadcrumb"
      className={`mb-8 ${className}`}
      {...wrapperProps}
    >
      <ol className="flex items-center gap-2 text-sm text-white/50 flex-wrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <ChevronRight
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gold-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gold-400">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </Wrapper>
  );
}
