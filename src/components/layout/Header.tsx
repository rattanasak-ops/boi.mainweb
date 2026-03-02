"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, X, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { key: "discover", href: "/discover" },
  { key: "invest", href: "/invest" },
  { key: "services", href: "/services" },
  { key: "resources", href: "/resources" },
  { key: "about", href: "/about" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
        role="banner"
      >
        {/* Scroll progress indicator — gold gradient */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 z-50"
          style={{ width: progressWidth }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-18 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              aria-label="BOI Thailand - Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/images/boi-logo.svg"
                  alt="BOI Thailand"
                  width={140}
                  height={36}
                  priority
                  className="h-9 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation — WOW hover effects */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-medium text-navy-600 group"
                >
                  {/* Text */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-gold-600">
                    {t(item.key)}
                  </span>

                  {/* Animated underline — gold gradient, slides in from left */}
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />

                  {/* Hover glow background */}
                  <span className="absolute inset-0 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-gold-50" />
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search button with spring animation */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative p-2.5 rounded-xl text-navy-600 hover:bg-gold-50 hover:text-gold-600 transition-all duration-300"
                onClick={() => setSearchOpen(true)}
                aria-label={t("search")}
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </motion.button>

              {/* Language switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* CTA Button — desktop only */}
              <motion.div
                className="hidden lg:block"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/invest"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 shadow-md shadow-gold-500/20 hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
                >
                  {t("invest")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-lg text-navy-600 hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? tCommon("close_menu") : tCommon("open_menu")}
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation — animated slide down */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-base font-medium text-navy-600 rounded-xl hover:bg-gold-50 hover:text-gold-600 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(item.key)}
                      <ArrowRight className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-border">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ====== Full-screen Search Overlay ====== */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-navy-900/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
            />

            {/* Search container */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl mx-4"
            >
              {/* Glow behind search */}
              <div className="absolute -inset-4 bg-gold-500/10 rounded-3xl blur-2xl" />

              <div className="relative bg-white rounded-2xl shadow-2xl shadow-navy-900/20 border border-gold-200/50 overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-5">
                  <Search className="h-6 w-6 text-gold-500 shrink-0" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t("search_placeholder")}
                    className="flex-1 text-lg text-navy-600 placeholder:text-navy-300 bg-transparent border-none outline-none"
                    aria-label={t("search")}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="shrink-0 p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-surface-alt transition-colors"
                    aria-label={tCommon("close_menu")}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Search suggestions */}
                <div className="border-t border-border px-6 py-4">
                  <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Investment Incentives", "Visa & Work Permit", "EV Industry", "Smart Visa", "Tax Benefits"].map((term) => (
                      <button
                        key={term}
                        className="px-3 py-1.5 text-sm text-navy-600 bg-surface-alt rounded-lg hover:bg-gold-50 hover:text-gold-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard hint */}
                <div className="px-6 py-3 bg-surface-alt flex items-center justify-between">
                  <span className="text-xs text-navy-400">
                    Press <kbd className="px-1.5 py-0.5 text-xs rounded border border-border bg-white text-navy-600 font-mono">ESC</kbd> to close
                  </span>
                  <span className="text-xs text-navy-400">
                    Press <kbd className="px-1.5 py-0.5 text-xs rounded border border-border bg-white text-navy-600 font-mono">Enter</kbd> to search
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
