"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";

const flags: Record<Locale, string> = {
  th: "🇹🇭",
  en: "🇬🇧",
  ja: "🇯🇵",
  zh: "🇨🇳",
  ko: "🇰🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  function handleSelect(newLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white/80 backdrop-blur-sm text-sm text-text-primary cursor-pointer hover:border-gold-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-all duration-200"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("select")}
      >
        <Globe className="h-4 w-4 text-text-muted" aria-hidden="true" />
        <span>{flags[locale as Locale]}</span>
        <span className="hidden sm:inline">{t(locale)}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label={t("select")}
            className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-white shadow-lg shadow-navy-900/10 py-1.5 z-50 overflow-hidden"
          >
            {locales.map((loc) => (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <button
                  onClick={() => handleSelect(loc)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                    loc === locale
                      ? "bg-gold-50 text-gold-700 font-medium"
                      : "text-text-primary hover:bg-surface-alt"
                  }`}
                >
                  <span className="text-base">{flags[loc]}</span>
                  <span className="flex-1 text-left">{t(loc)}</span>
                  {loc === locale && (
                    <Check className="h-4 w-4 text-gold-500" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
