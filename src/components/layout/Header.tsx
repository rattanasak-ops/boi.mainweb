"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Search,
  X,
  Menu,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Factory,
  MapPin,
  Star,
  FileText,
  Rocket,
  CheckCircle,
  Calculator,
  Stamp,
  Building2,
  Handshake,
  CalendarClock,
  BarChart3,
  Users,
  Newspaper,
  HelpCircle,
  BookOpen,
  Shield,
  Briefcase,
  Phone,
  Sparkles,
  TrendingUp,
  Zap,
  Command,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import BOILogo from "@/components/ui/BOILogo";
import QuickMenu from "./QuickMenu";

/* ── Brand Shape ── */
const BRAND_SHAPE_SM =
  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

/* ── Easing ── */
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ──────────────────────────────────────────
   MEGA MENU DATA
   Based on sitemap_new.md — 5 main sections
   ────────────────────────────────────────── */
type MenuItem = {
  tKey: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MegaMenuSection = {
  key: string;
  featured: {
    image: string;
    href: string;
  };
  items: MenuItem[];
};

const megaMenuData: MegaMenuSection[] = [
  {
    key: "discover",
    featured: {
      image: "/images/why-thailand/shipping-port.jpg",
      href: "/discover",
    },
    items: [
      { tKey: "thailand_overview", href: "/discover/thailand-overview", icon: Globe2 },
      { tKey: "target_industries", href: "/discover/industries", icon: Factory },
      { tKey: "special_zones", href: "/discover/special-zones", icon: MapPin },
      { tKey: "success_stories", href: "/discover/success-stories", icon: Star },
      { tKey: "advertorials", href: "/discover/advertorials", icon: FileText },
    ],
  },
  {
    key: "invest",
    featured: {
      image: "/images/why-thailand/investment-growth.jpg",
      href: "/invest/getting-started",
    },
    items: [
      { tKey: "getting_started", href: "/invest/getting-started", icon: Rocket },
      { tKey: "eligibility_checker", href: "/invest/eligibility-checker", icon: CheckCircle },
      { tKey: "incentives", href: "/invest/incentives", icon: TrendingUp },
      { tKey: "procedures", href: "/invest/procedures", icon: CalendarClock },
      { tKey: "forms", href: "/invest/forms", icon: FileText },
      { tKey: "eligible_activities", href: "/invest/eligible-activities", icon: Zap },
    ],
  },
  {
    key: "services",
    featured: {
      image: "/images/why-thailand/digital-workforce.jpg",
      href: "/services/apply",
    },
    items: [
      { tKey: "e_investment", href: "/services/e-investment", icon: FileText },
      { tKey: "visa", href: "/services/visa", icon: Stamp },
      { tKey: "smart_visa", href: "/services/smart-visa", icon: Sparkles },
      { tKey: "osos", href: "/services/osos", icon: Building2 },
      { tKey: "matchmaking", href: "/services/matchmaking", icon: Handshake },
      { tKey: "consultation", href: "/services/consultation", icon: Phone },
    ],
  },
  {
    key: "resources",
    featured: {
      image: "/images/why-thailand/industrial-estate.jpg",
      href: "/resources/data",
    },
    items: [
      { tKey: "news", href: "/resources/news", icon: Newspaper },
      { tKey: "events", href: "/resources/events", icon: CalendarClock },
      { tKey: "data", href: "/resources/data", icon: BarChart3 },
      { tKey: "company_database", href: "/resources/company-database", icon: Users },
      { tKey: "publications", href: "/resources/publications", icon: BookOpen },
      { tKey: "faq", href: "/resources/faq", icon: HelpCircle },
    ],
  },
  {
    key: "about",
    featured: {
      image: "/images/hero/golden-arch.jpg",
      href: "/about/overview",
    },
    items: [
      { tKey: "overview", href: "/about/overview", icon: Shield },
      { tKey: "offices", href: "/about/offices", icon: MapPin },
      { tKey: "careers", href: "/about/careers", icon: Briefcase },
      { tKey: "press_center", href: "/about/press-center", icon: Newspaper },
    ],
  },
];

/* ── Search quick actions ── */
const searchQuickActions = [
  { tKey: "check_eligibility", icon: CheckCircle, href: "/invest/eligibility-checker", color: "text-emerald-500" },
  { tKey: "calculate_incentives", icon: Calculator, href: "/invest/incentives", color: "text-gold-500" },
  { tKey: "apply_online", icon: FileText, href: "/services/apply", color: "text-blue-500" },
  { tKey: "book_consultation", icon: CalendarClock, href: "/services/consultation", color: "text-purple-500" },
];

const searchTrendingKeys = [
  "trending_ev",
  "trending_smart_visa",
  "trending_tax",
  "trending_eec",
  "trending_work_permit",
];

/* ──────────────────────────────────────────
   HEADER COMPONENT
   ────────────────────────────────────────── */
export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tMega = useTranslations("mega_menu");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Scroll progress */
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Auto-focus search */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [searchOpen]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveMenu(null);
      }
      /* Cmd/Ctrl + K = open search */
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Mega menu hover handlers with delay */
  const handleMenuEnter = useCallback((key: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(key);
  }, []);

  const handleMenuLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const navItems = megaMenuData.map((m) => ({ key: m.key, href: `/${m.key === "invest" ? "invest" : m.key}` }));

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-b border-border/80 dark:border-navy-700/80 shadow-sm"
        role="banner"
      >
        {/* Scroll progress — gold gradient */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 z-50"
          style={{ width: progressWidth }}
        />

        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
          <div className="flex h-16 lg:h-[72px] items-center justify-between">
            {/* ── Logo — Interactive BOI Mark ── */}
            <Link href="/" className="flex items-center shrink-0" aria-label="BOI Thailand - Home">
              <BOILogo variant="header" className="h-11 w-auto" />
            </Link>

            {/* ── Desktop Navigation with Mega Menu triggers ── */}
            <nav className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(item.key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={item.href}
                    className={`relative px-5 py-2.5 text-sm font-medium group transition-colors duration-200 ${
                      activeMenu === item.key ? "text-gold-600" : "text-navy-600 hover:text-gold-600"
                    }`}
                  >
                    <span className="relative z-10">{t(item.key)}</span>
                    {/* Active/hover underline */}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-transform duration-300 origin-left ${
                        activeMenu === item.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {/* Quick Menu — 3-group shortcut panel */}
              <QuickMenu />

              {/* Search — shows Cmd+K hint */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-navy-500 hover:bg-gold-50 hover:text-gold-600 transition-all duration-200"
                onClick={() => setSearchOpen(true)}
                aria-label={t("search")}
              >
                <Search className="h-4.5 w-4.5" aria-hidden="true" />
                <span className="hidden lg:flex items-center gap-1 text-xs text-navy-400">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-mono">
                    <Command className="inline h-2.5 w-2.5" />K
                  </kbd>
                </span>
              </motion.button>

              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* CTA */}
              <motion.div className="hidden lg:block" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/invest"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 shadow-md shadow-gold-500/20 hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
                  style={{ clipPath: BRAND_SHAPE_SM }}
                >
                  {t("invest")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Mobile menu */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-lg text-navy-600 hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? tCommon("close_menu") : tCommon("open_menu")}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MEGA MENU PANEL — drops down on hover
            Animated scale-Y from top (EEC-inspired)
            ════════════════════════════════════════════ */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="absolute left-0 right-0 top-full z-40 overflow-hidden"
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              {/* Top gold accent line */}
              <div className="h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

              <div className="bg-white/98 dark:bg-navy-900/98 backdrop-blur-xl border-b border-border dark:border-navy-700 shadow-2xl shadow-navy-900/10 dark:shadow-black/30">
                <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-8">
                  {megaMenuData
                    .filter((m) => m.key === activeMenu)
                    .map((menu) => (
                      <div key={menu.key} className="grid grid-cols-12 gap-8">
                        {/* Links — 8 columns */}
                        <div className="col-span-8">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                            {menu.items.map((item, i) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                              >
                                <Link
                                  href={item.href}
                                  className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gold-50/60 transition-colors duration-200"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 group-hover:bg-gold-100 transition-colors duration-200">
                                    <item.icon className="h-5 w-5 text-navy-400 group-hover:text-gold-600 transition-colors" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-navy-700 group-hover:text-gold-700 transition-colors">
                                      {tMega(`${menu.key}.${item.tKey}`)}
                                    </p>
                                    <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">
                                      {tMega(`${menu.key}.${item.tKey}_desc`)}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Featured card — 4 columns */}
                        <motion.div
                          className="col-span-4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <Link
                            href={menu.featured.href}
                            className="group block relative h-full min-h-[220px] rounded-xl overflow-hidden"
                            onClick={() => setActiveMenu(null)}
                          >
                            <Image
                              src={menu.featured.image}
                              alt={tMega(`${menu.key}.featured_title`)}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="400px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h4 className="text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                                {tMega(`${menu.key}.featured_title`)}
                              </h4>
                              <p className="mt-1 text-sm text-white/60">{tMega(`${menu.key}.featured_desc`)}</p>
                              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
                                {tMega(`${menu.key}.featured_cta`)}
                                <ArrowUpRight className="h-4 w-4" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="lg:hidden overflow-hidden border-t border-border dark:border-navy-700 bg-white dark:bg-navy-900"
              role="navigation"
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
                      <ArrowRight className="h-4 w-4 text-gold-400" />
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

      {/* ════════════════════════════════════════════
          FULL-SCREEN SEARCH OVERLAY — WOW Edition
          Scale from center + staggered content reveal
          ════════════════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
          >
            {/* Backdrop — dark blur */}
            <motion.div
              className="absolute inset-0 bg-navy-950/85 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
            />

            {/* Search content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto px-6 pt-[12vh] sm:pt-[15vh]">
              {/* Search box — scales in */}
              <motion.div
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="w-full"
              >
                {/* Glow */}
                <div className="absolute -inset-6 bg-gold-500/[0.06] rounded-3xl blur-3xl" />

                <div
                  className="relative bg-white border border-gold-200/60 shadow-2xl shadow-navy-900/20 overflow-hidden"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
                >
                  {/* Top gold line */}
                  <div className="h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

                  <div className="flex items-center gap-4 px-6 py-5">
                    <Search className="h-6 w-6 text-gold-500 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t("search_placeholder")}
                      className="flex-1 text-lg text-navy-600 placeholder:text-navy-300 bg-transparent border-none outline-none"
                      aria-label={t("search")}
                    />
                    <div className="flex items-center gap-2">
                      <kbd className="hidden sm:flex px-2 py-1 rounded border border-border bg-surface text-[10px] font-mono text-navy-400">
                        ESC
                      </kbd>
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-surface-alt transition-colors"
                        aria-label={tCommon("close")}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions — staggered reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT }}
                className="w-full mt-6"
              >
                <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">
                  {tMega("search.quick_actions_label")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {searchQuickActions.map((action, i) => (
                    <motion.div
                      key={action.tKey}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                    >
                      <Link
                        href={action.href}
                        className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.1] hover:border-gold-500/20 transition-all duration-300 h-full"
                        onClick={() => setSearchOpen(false)}
                      >
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                        <span className="text-xs font-medium text-white/60 group-hover:text-white/90 text-center transition-colors">
                          {tMega(`search.${action.tKey}`)}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trending searches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT }}
                className="w-full mt-8"
              >
                <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {tMega("search.trending_label")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchTrendingKeys.map((key, i) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                      className="px-4 py-2 text-sm text-white/50 bg-white/[0.05] border border-white/[0.08] rounded-full hover:bg-gold-500/10 hover:border-gold-500/20 hover:text-gold-300 transition-all duration-300"
                      style={{ clipPath: BRAND_SHAPE_SM }}
                    >
                      {tMega(`search.${key}`)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* AI hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-xs text-white/25"
              >
                <Sparkles className="h-3.5 w-3.5 text-gold-500/50" />
                <span>{tMega("search.ai_hint")}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
