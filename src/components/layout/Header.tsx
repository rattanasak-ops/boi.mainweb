"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X, Search } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border" role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="BOI Thailand - Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600 text-white font-bold text-lg">
              B
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-navy-600 leading-tight">
                BOI
              </p>
              <p className="text-xs text-text-muted leading-tight">
                Board of Investment
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-primary rounded-lg hover:bg-surface-alt hover:text-navy-600 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right side: Search + Language + Mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg text-text-secondary hover:bg-surface-alt hover:text-navy-600 transition-colors"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-alt transition-colors"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-white"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-text-primary rounded-lg hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
