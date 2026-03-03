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
  name: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MegaMenuSection = {
  key: string;
  featured: {
    image: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
  };
  items: MenuItem[];
};

const megaMenuData: MegaMenuSection[] = [
  {
    key: "discover",
    featured: {
      image: "/images/why-thailand/aerial-city.jpg",
      title: "Explore Investment Opportunities",
      desc: "Discover why Thailand is Southeast Asia's top investment destination",
      href: "/discover",
      cta: "Explore Now",
    },
    items: [
      { name: "Thailand Overview", desc: "Economic data & competitive advantages", href: "/discover/thailand-overview", icon: Globe2 },
      { name: "Target Industries", desc: "10 promoted industry sectors", href: "/discover/industries", icon: Factory },
      { name: "Special Economic Zones", desc: "EEC, SEZ & industrial estates", href: "/discover/special-zones", icon: MapPin },
      { name: "Success Stories", desc: "Real investor experiences", href: "/discover/success-stories", icon: Star },
      { name: "Advertorials", desc: "Latest articles & insights", href: "/discover/advertorials", icon: FileText },
    ],
  },
  {
    key: "invest",
    featured: {
      image: "/images/why-thailand/finance.jpg",
      title: "Start Your Investment Journey",
      desc: "Step-by-step guide from eligibility to approval",
      href: "/invest/getting-started",
      cta: "Get Started",
    },
    items: [
      { name: "Getting Started", desc: "Investment journey overview & checklist", href: "/invest/getting-started", icon: Rocket },
      { name: "Eligibility Checker", desc: "Interactive eligibility assessment", href: "/invest/eligibility-checker", icon: CheckCircle },
      { name: "Investment Incentives", desc: "Tax & non-tax benefits", href: "/invest/incentives", icon: TrendingUp },
      { name: "Procedures & Timeline", desc: "Application process step-by-step", href: "/invest/procedures", icon: CalendarClock },
      { name: "Forms & Downloads", desc: "Application & operating forms", href: "/invest/forms", icon: FileText },
      { name: "Eligible Activities", desc: "Searchable list of activities", href: "/invest/eligible-activities", icon: Zap },
    ],
  },
  {
    key: "services",
    featured: {
      image: "/images/why-thailand/handshake.jpg",
      title: "One-Stop Investment Services",
      desc: "Apply online, track applications, manage permits",
      href: "/services/apply",
      cta: "Apply Online",
    },
    items: [
      { name: "e-Investment", desc: "Online promotion application", href: "/services/e-investment", icon: FileText },
      { name: "Visa & Work Permit", desc: "For BOI-promoted companies", href: "/services/visa", icon: Stamp },
      { name: "Smart Visa", desc: "For talents & experts", href: "/services/smart-visa", icon: Sparkles },
      { name: "OSOS", desc: "One Start One Stop center", href: "/services/osos", icon: Building2 },
      { name: "Business Matching", desc: "Find partners & suppliers", href: "/services/matchmaking", icon: Handshake },
      { name: "Book Consultation", desc: "Schedule with BOI advisor", href: "/services/consultation", icon: Phone },
    ],
  },
  {
    key: "resources",
    featured: {
      image: "/images/why-thailand/digital-tech.jpg",
      title: "Investment Data Dashboard",
      desc: "Interactive charts, statistics & export tools",
      href: "/resources/data",
      cta: "View Dashboard",
    },
    items: [
      { name: "News & Updates", desc: "Latest BOI announcements", href: "/resources/news", icon: Newspaper },
      { name: "Events Calendar", desc: "Seminars, exhibitions & webinars", href: "/resources/events", icon: CalendarClock },
      { name: "Data & Statistics", desc: "Interactive investment data", href: "/resources/data", icon: BarChart3 },
      { name: "Company Database", desc: "Search promoted companies", href: "/resources/company-database", icon: Users },
      { name: "Publications", desc: "Reports, reviews & brochures", href: "/resources/publications", icon: BookOpen },
      { name: "FAQ", desc: "Frequently asked questions", href: "/resources/faq", icon: HelpCircle },
    ],
  },
  {
    key: "about",
    featured: {
      image: "/images/why-thailand/temple.jpg",
      title: "About BOI Thailand",
      desc: "Promoting investment since 1966",
      href: "/about/overview",
      cta: "Learn More",
    },
    items: [
      { name: "Overview & Mission", desc: "Vision, strategy & board members", href: "/about/overview", icon: Shield },
      { name: "Our Offices", desc: "Head office, regional & overseas", href: "/about/offices", icon: MapPin },
      { name: "Careers", desc: "Join the BOI team", href: "/about/careers", icon: Briefcase },
      { name: "Press Center", desc: "Press kit & media contact", href: "/about/press-center", icon: Newspaper },
    ],
  },
];

/* ── Search quick actions ── */
const searchQuickActions = [
  { name: "Check Eligibility", icon: CheckCircle, href: "/invest/eligibility-checker", color: "text-emerald-500" },
  { name: "Calculate Incentives", icon: Calculator, href: "/services/incentive-calculator", color: "text-gold-500" },
  { name: "Apply Online", icon: FileText, href: "/services/apply", color: "text-blue-500" },
  { name: "Book Consultation", icon: CalendarClock, href: "/services/consultation", color: "text-purple-500" },
];

const searchTrending = [
  "EV Industry Incentives",
  "Smart Visa Application",
  "Tax Holiday 13 Years",
  "EEC Special Zone",
  "Work Permit Process",
];

/* ──────────────────────────────────────────
   HEADER COMPONENT
   ────────────────────────────────────────── */
export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
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
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border/80 shadow-sm"
        role="banner"
      >
        {/* Scroll progress — gold gradient */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 z-50"
          style={{ width: progressWidth }}
        />

        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
          <div className="flex h-16 lg:h-[72px] items-center justify-between">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="BOI Thailand - Home">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/images/boi-logo.svg"
                  alt="BOI Thailand"
                  width={160}
                  height={44}
                  priority
                  className="h-10 w-auto"
                />
              </motion.div>
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

              <div className="bg-white/98 backdrop-blur-xl border-b border-border shadow-2xl shadow-navy-900/10">
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
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">
                                      {item.desc}
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
                              alt={menu.featured.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="400px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h4 className="text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                                {menu.featured.title}
                              </h4>
                              <p className="mt-1 text-sm text-white/60">{menu.featured.desc}</p>
                              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
                                {menu.featured.cta}
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
              className="lg:hidden overflow-hidden border-t border-border bg-white"
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
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {searchQuickActions.map((action, i) => (
                    <motion.a
                      key={action.name}
                      href={action.href}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                      className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.1] hover:border-gold-500/20 transition-all duration-300"
                      onClick={() => setSearchOpen(false)}
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-xs font-medium text-white/60 group-hover:text-white/90 text-center transition-colors">
                        {action.name}
                      </span>
                    </motion.a>
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
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchTrending.map((term, i) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                      className="px-4 py-2 text-sm text-white/50 bg-white/[0.05] border border-white/[0.08] rounded-full hover:bg-gold-500/10 hover:border-gold-500/20 hover:text-gold-300 transition-all duration-300"
                      style={{ clipPath: BRAND_SHAPE_SM }}
                    >
                      {term}
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
                <span>AI-powered search coming soon — find the right incentives instantly</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
