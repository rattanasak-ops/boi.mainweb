"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  TrendingUp,
  Briefcase,
  BookOpen,
  Building2,
  MoreHorizontal,
  ChevronRight,
  ArrowRight,
  Compass,
  Rocket,
  Gift,
  ClipboardCheck,
  Calculator,
  ClipboardList,
  FileDown,
  Newspaper as NewsIcon,
  FileText,
  Monitor,
  Stamp,
  Sparkles,
  Handshake,
  Phone,
  Headphones,
  BarChart3,
  CalendarClock,
  HelpCircle,
  Video,
  Users,
  Shield,
  MapPin,
  Briefcase as BriefcaseIcon,
  Megaphone,
  ShoppingCart,
  Search,
  Lock,
  ScrollText,
  Accessibility,
  type LucideIcon,
} from "lucide-react";
import NoiseGrain from "@/components/ui/NoiseGrain";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── Icon map for sub-items ── */
const ICONS: Record<string, LucideIcon> = {
  overview: Compass,
  thailand_overview: Globe,
  industries: TrendingUp,
  special_zones: MapPin,
  success_stories: ClipboardCheck,
  advertorials: FileText,
  getting_started: Rocket,
  incentives: Gift,
  eligible_activities: ClipboardList,
  eligibility_checker: Calculator,
  procedures: ClipboardList,
  forms: FileDown,
  announcements: NewsIcon,
  guide: BookOpen,
  e_investment: Monitor,
  visa: Stamp,
  smart_visa: Sparkles,
  osos: Building2,
  matchmaking: Handshake,
  apply: FileText,
  consultation: Headphones,
  after_promotion: Briefcase,
  hq_portal: Monitor,
  news: NewsIcon,
  events: CalendarClock,
  data: BarChart3,
  publications: BookOpen,
  faq: HelpCircle,
  multimedia: Video,
  company_database: Users,
  about_boi: Shield,
  offices: MapPin,
  careers: BriefcaseIcon,
  press_center: Megaphone,
  procurement: ShoppingCart,
  contact: Phone,
  search: Search,
  privacy: Lock,
  terms: ScrollText,
  accessibility: Accessibility,
};

/* ── Section icons + colors ── */
const SECTION_META: Record<
  string,
  { icon: LucideIcon; gradient: string }
> = {
  discover: { icon: Globe, gradient: "from-emerald-500/20 to-emerald-500/5" },
  invest: { icon: TrendingUp, gradient: "from-gold-500/20 to-gold-500/5" },
  services: { icon: Briefcase, gradient: "from-blue-500/20 to-blue-500/5" },
  resources: { icon: BookOpen, gradient: "from-purple-500/20 to-purple-500/5" },
  about: { icon: Building2, gradient: "from-rose-500/20 to-rose-500/5" },
  other: { icon: MoreHorizontal, gradient: "from-gray-500/20 to-gray-500/5" },
};

/* ── Site links data ── */
const siteLinks = [
  {
    sectionKey: "discover",
    links: [
      { href: "/discover", labelKey: "overview" },
      { href: "/discover/thailand-overview", labelKey: "thailand_overview" },
      { href: "/discover/industries", labelKey: "industries" },
      { href: "/discover/special-zones", labelKey: "special_zones" },
      { href: "/discover/success-stories", labelKey: "success_stories" },
      { href: "/discover/advertorials", labelKey: "advertorials" },
    ],
  },
  {
    sectionKey: "invest",
    links: [
      { href: "/invest", labelKey: "overview" },
      { href: "/invest/getting-started", labelKey: "getting_started" },
      { href: "/invest/incentives", labelKey: "incentives" },
      { href: "/invest/eligible-activities", labelKey: "eligible_activities" },
      { href: "/invest/eligibility-checker", labelKey: "eligibility_checker" },
      { href: "/invest/procedures", labelKey: "procedures" },
      { href: "/invest/forms", labelKey: "forms" },
      { href: "/invest/announcements", labelKey: "announcements" },
      { href: "/invest/guide", labelKey: "guide" },
    ],
  },
  {
    sectionKey: "services",
    links: [
      { href: "/services", labelKey: "overview" },
      { href: "/services/e-investment", labelKey: "e_investment" },
      { href: "/services/visa", labelKey: "visa" },
      { href: "/services/smart-visa", labelKey: "smart_visa" },
      { href: "/services/osos", labelKey: "osos" },
      { href: "/services/matchmaking", labelKey: "matchmaking" },
      { href: "/services/apply", labelKey: "apply" },
      { href: "/services/consultation", labelKey: "consultation" },
      { href: "/services/after-promotion", labelKey: "after_promotion" },
      { href: "/services/hq-portal", labelKey: "hq_portal" },
    ],
  },
  {
    sectionKey: "resources",
    links: [
      { href: "/resources", labelKey: "overview" },
      { href: "/resources/news", labelKey: "news" },
      { href: "/resources/events", labelKey: "events" },
      { href: "/resources/data", labelKey: "data" },
      { href: "/resources/publications", labelKey: "publications" },
      { href: "/resources/faq", labelKey: "faq" },
      { href: "/resources/multimedia", labelKey: "multimedia" },
      { href: "/resources/company-database", labelKey: "company_database" },
    ],
  },
  {
    sectionKey: "about",
    links: [
      { href: "/about", labelKey: "overview" },
      { href: "/about/overview", labelKey: "about_boi" },
      { href: "/about/offices", labelKey: "offices" },
      { href: "/about/careers", labelKey: "careers" },
      { href: "/about/press-center", labelKey: "press_center" },
      { href: "/about/procurement", labelKey: "procurement" },
    ],
  },
  {
    sectionKey: "other",
    links: [
      { href: "/contact", labelKey: "contact" },
      { href: "/search", labelKey: "search" },
      { href: "/privacy", labelKey: "privacy" },
      { href: "/terms", labelKey: "terms" },
      { href: "/accessibility", labelKey: "accessibility" },
    ],
  },
] as const;

export default function SitemapPage() {
  const t = useTranslations("sitemap_page");

  return (
    <main className="min-h-screen flex flex-col">
      {/* ── Hero ── */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-transparent to-gold-500/5" />
        <NoiseGrain opacity={0.02} />

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 pt-32 pb-16 sm:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            aria-label="Breadcrumb"
            className="mb-8"
          >
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  {t("breadcrumb_home")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-gold-400">{t("title")}</span>
              </li>
            </ol>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.p
              className="text-gold-400 font-medium text-sm tracking-[0.25em] uppercase mb-5"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              className="mt-8 h-[2px] w-24 origin-left"
              style={{
                background:
                  "linear-gradient(to right, rgba(197,165,114,0.8), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: EASE_OUT }}
            />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg
            viewBox="0 0 1600 60"
            preserveAspectRatio="none"
            className="block w-full h-[30px] sm:h-[40px] lg:h-[60px]"
            aria-hidden="true"
          >
            <polygon points="0,60 1600,60 1600,0" className="fill-surface" />
          </svg>
        </div>
      </section>

      {/* ── Tree Hierarchy Sections ── */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20 flex-1">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20">
          <div className="space-y-12 sm:space-y-16">
            {siteLinks.map((section, sIdx) => {
              const meta = SECTION_META[section.sectionKey];
              const SectionIcon = meta?.icon ?? MoreHorizontal;

              return (
                <motion.div
                  key={section.sectionKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 * sIdx,
                    ease: EASE_OUT,
                  }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${meta?.gradient ?? "from-gray-500/20 to-gray-500/5"} border border-navy-200/50`}
                    >
                      <SectionIcon
                        className="h-5 w-5 text-navy-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-navy-600 tracking-tight">
                        {t(`sections.${section.sectionKey}`)}
                      </h2>
                      <span className="text-xs font-medium text-navy-400 bg-navy-100 px-2.5 py-1 rounded-full">
                        {section.links.length}
                      </span>
                    </div>
                  </div>

                  {/* Tree lines + items */}
                  <div className="ml-5 border-l-2 border-gold-500/20 pl-8 space-y-1">
                    {section.links.map((link, lIdx) => {
                      const ItemIcon =
                        ICONS[link.labelKey] ?? ChevronRight;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.03 * lIdx,
                            ease: EASE_OUT,
                          }}
                        >
                          <Link
                            href={link.href}
                            className="group flex items-center gap-3 py-2.5 px-4 -ml-4 rounded-lg hover:bg-gold-500/5 transition-all duration-200"
                          >
                            {/* Tree branch connector */}
                            <div className="relative -ml-[2.3rem] w-6 h-px bg-gold-500/20 group-hover:bg-gold-500/40 transition-colors" />

                            <ItemIcon
                              className="h-4 w-4 text-navy-400 group-hover:text-gold-600 transition-colors shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-navy-600 group-hover:text-gold-700 transition-colors">
                              {t(`links.${link.labelKey}`)}
                            </span>
                            <ArrowRight
                              className="h-3.5 w-3.5 text-navy-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto shrink-0"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
