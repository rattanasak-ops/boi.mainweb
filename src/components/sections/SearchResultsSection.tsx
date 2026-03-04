"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Briefcase,
  HelpCircle,
  Building2,
  ChevronRight,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

type ResultCategory =
  | "all"
  | "incentives"
  | "services"
  | "news"
  | "events"
  | "faq";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<ResultCategory, "all">;
  url: string;
  date?: string;
}

const CATEGORY_ICONS: Record<Exclude<ResultCategory, "all">, typeof FileText> =
  {
    incentives: Briefcase,
    services: Building2,
    news: FileText,
    events: Calendar,
    faq: HelpCircle,
  };

// Demo mock results
const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    title: "BOI Promotion Categories & Tax Incentives",
    excerpt:
      "Comprehensive guide to A1-A4, B1-B2 promotion categories with corporate income tax exemptions up to 13 years...",
    category: "incentives",
    url: "/invest/incentives",
    date: "2026-02-15",
  },
  {
    id: "2",
    title: "Smart Visa Application for Tech Professionals",
    excerpt:
      "Smart Visa allows highly skilled professionals to work in Thailand with special benefits including 4-year visa...",
    category: "services",
    url: "/services",
    date: "2026-02-10",
  },
  {
    id: "3",
    title: "Thailand Attracts Record Foreign Investment in 2025",
    excerpt:
      "BOI approves record 832 billion baht in investment applications, marking a 46% increase from previous year...",
    category: "news",
    url: "/resources/news",
    date: "2026-01-20",
  },
  {
    id: "4",
    title: "BOI Investment Seminar — Tokyo 2026",
    excerpt:
      "Join us for a comprehensive investment seminar covering Thailand's latest incentive packages and success stories...",
    category: "events",
    url: "/resources/events",
    date: "2026-03-15",
  },
  {
    id: "5",
    title: "How to Apply for BOI Promotion?",
    excerpt:
      "Step-by-step guide: Submit online via e-Investment portal, provide project details, wait for Board approval (60-90 days)...",
    category: "faq",
    url: "/resources/faq",
  },
  {
    id: "6",
    title: "EEC Special Economic Zone Benefits",
    excerpt:
      "Enhanced incentives in the Eastern Economic Corridor: additional tax holidays, land ownership, streamlined permits...",
    category: "incentives",
    url: "/invest/incentives",
    date: "2026-01-30",
  },
  {
    id: "7",
    title: "One Start One Stop (OSOS) Service Center",
    excerpt:
      "Single point of contact for all investment-related permits and approvals. Located at Chamchuri Square, Bangkok...",
    category: "services",
    url: "/services",
  },
  {
    id: "8",
    title: "EV Industry Investment Package Announced",
    excerpt:
      "BOI launches comprehensive EV incentive package with up to 90% corporate income tax exemption for manufacturers...",
    category: "news",
    url: "/resources/news",
    date: "2026-02-28",
  },
  {
    id: "9",
    title: "What Documents Are Required for BOI Application?",
    excerpt:
      "Complete document checklist: company registration, project feasibility study, financial projections, environmental assessment...",
    category: "faq",
    url: "/resources/faq",
  },
  {
    id: "10",
    title: "BOI After-Sales Service & Compliance",
    excerpt:
      "Post-promotion support including import duty exemption management, foreign worker quotas, and annual compliance reporting...",
    category: "services",
    url: "/services",
    date: "2026-02-05",
  },
];

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-gold-200/60 text-navy-800 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchResultsSection() {
  const t = useTranslations("search");
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<ResultCategory>("all");

  const FILTERS: { key: ResultCategory; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "incentives", label: t("filter_incentives") },
    { key: "services", label: t("filter_services") },
    { key: "news", label: t("filter_news") },
    { key: "events", label: t("filter_events") },
    { key: "faq", label: t("filter_faq") },
  ];

  const filteredResults = useMemo(() => {
    let results = MOCK_RESULTS;
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.excerpt.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== "all") {
      results = results.filter((r) => r.category === activeFilter);
    }
    return results;
  }, [query, activeFilter]);

  const categoryCounts = useMemo(() => {
    const base = query.trim()
      ? MOCK_RESULTS.filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.excerpt.toLowerCase().includes(query.toLowerCase())
        )
      : MOCK_RESULTS;
    const counts: Record<string, number> = { all: base.length };
    base.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [query]);

  return (
    <section className="relative bg-surface min-h-screen">
      {/* Hero search bar */}
      <div className="bg-navy-950 pt-32 pb-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gold-400 transition-colors"
                  >
                    {t("breadcrumb_home")}
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <li>
                  <span className="text-gold-400">{t("breadcrumb")}</span>
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              {t("title")}
            </h1>

            <div className="relative max-w-3xl">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full pl-14 pr-12 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-lg focus:outline-none focus:border-gold-500/60 focus:bg-white/15 transition-all duration-300"
                style={{ clipPath: BRAND_SHAPE }}
                aria-label={t("placeholder")}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  aria-label={t("clear")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter bar + results */}
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20 py-10">
        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
        >
          <Filter className="h-4 w-4 text-text-secondary" aria-hidden="true" />
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-navy-950 text-white shadow-md"
                  : "bg-white text-text-secondary border border-border hover:border-gold-500/30 hover:text-navy-600"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-60">
                ({categoryCounts[f.key] || 0})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.p
          className="text-sm text-text-secondary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {t("results_count", { count: filteredResults.length })}
          {query && (
            <span>
              {" "}
              {t("results_for")}{" "}
              <strong className="text-navy-600">&quot;{query}&quot;</strong>
            </span>
          )}
        </motion.p>

        {/* Results list */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredResults.map((result, i) => {
              const Icon = CATEGORY_ICONS[result.category];
              return (
                <motion.div
                  key={result.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: EASE_OUT,
                  }}
                >
                  <Link href={result.url} className="block group">
                    <div
                      className="p-6 bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_10px_40px_rgba(27,42,74,0.06)] transition-all duration-400"
                      style={{ clipPath: BRAND_SHAPE }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-400/20 group-hover:bg-gold-500/20 transition-colors duration-300">
                          <Icon
                            className="h-5 w-5 text-gold-500"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                              {t(`filter_${result.category}`)}
                            </span>
                            {result.date && (
                              <span className="text-xs text-text-secondary">
                                {result.date}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-navy-600 group-hover:text-gold-600 transition-colors duration-300 mb-1">
                            {highlightText(result.title, query)}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                            {highlightText(result.excerpt, query)}
                          </p>
                        </div>

                        <ChevronRight
                          className="flex-shrink-0 h-5 w-5 text-text-secondary/30 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-300 mt-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {filteredResults.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <Search
                className="h-12 w-12 text-text-secondary/30 mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-navy-600 mb-2">
                {t("no_results_title")}
              </h3>
              <p className="text-text-secondary text-sm">
                {t("no_results_desc")}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
