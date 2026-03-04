"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND_SHAPE =
  "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

const FILTERS = ["all", "upcoming", "seminar", "workshop", "conference"] as const;

const MOCK_EVENTS = [
  {
    slug: "thailand-investment-conference-2026",
    image: "/images/news/conference.jpg",
    type: "conference",
    date: "2026-04-15",
    upcoming: true,
    featured: true,
  },
  {
    slug: "ev-industry-workshop",
    image: "/images/news/ev-charging.jpg",
    type: "workshop",
    date: "2026-04-08",
    upcoming: true,
    featured: true,
  },
  {
    slug: "digital-economy-seminar",
    image: "/images/news/digital-zone.jpg",
    type: "seminar",
    date: "2026-03-25",
    upcoming: true,
    featured: false,
  },
  {
    slug: "smart-manufacturing-expo",
    image: "/images/news/auto-factory.jpg",
    type: "conference",
    date: "2026-03-18",
    upcoming: true,
    featured: false,
  },
  {
    slug: "investor-briefing-q1-2026",
    image: "/images/hero/expressway-trails.jpg",
    type: "seminar",
    date: "2026-03-10",
    upcoming: false,
    featured: false,
  },
  {
    slug: "boi-international-roadshow",
    image: "/images/hero/golden-arch.jpg",
    type: "conference",
    date: "2026-02-28",
    upcoming: false,
    featured: false,
  },
];

export default function EventsListSection() {
  const t = useTranslations("events_page.list");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredEvents = MOCK_EVENTS.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upcoming") return item.upcoming;
    return item.type === activeFilter;
  });

  const featuredEvents = filteredEvents.filter((e) => e.featured);
  const regularEvents = filteredEvents.filter((e) => !e.featured);

  return (
    <section className="relative py-16 sm:py-20 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-gold-100/30 via-gold-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-navy-600 text-white"
                  : "bg-white border border-border text-text-secondary hover:border-gold-500/30 hover:text-navy-600"
              }`}
              style={{ clipPath: BRAND_SHAPE }}
            >
              {t(`filter_${filter}`)}
            </button>
          ))}
        </motion.div>

        {/* Featured Events — large horizontal cards */}
        {featuredEvents.length > 0 && (
          <div className="space-y-6 mb-12">
            {featuredEvents.map((event, i) => (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: EASE_OUT,
                }}
              >
                <Link
                  href={`/resources/events/${event.slug}`}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                    style={{ clipPath: BRAND_SHAPE }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      {/* Image */}
                      <div className="relative lg:col-span-2 h-56 lg:h-auto overflow-hidden">
                        <Image
                          src={event.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/20 lg:bg-gradient-to-r lg:from-transparent lg:to-white/10" />

                        {/* Upcoming badge */}
                        {event.upcoming && (
                          <div className="absolute top-4 left-4">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold tracking-wide uppercase"
                              style={{ clipPath: BRAND_SHAPE }}
                            >
                              {t("upcoming")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar
                              className="h-4 w-4 text-gold-500"
                              aria-hidden="true"
                            />
                            {t(`events.${event.slug}.date`)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock
                              className="h-4 w-4 text-gold-500"
                              aria-hidden="true"
                            />
                            {t(`events.${event.slug}.time`)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin
                              className="h-4 w-4 text-gold-500"
                              aria-hidden="true"
                            />
                            {t(`events.${event.slug}.location`)}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-navy-600 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                          {t(`events.${event.slug}.title`)}
                        </h3>

                        <p className="text-text-secondary leading-relaxed mb-6 line-clamp-2">
                          {t(`events.${event.slug}.description`)}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                            {t("view_details")}
                            <ArrowRight
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </span>

                          <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Users
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {t(`events.${event.slug}.capacity`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Regular Events — 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event, i) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * i,
                ease: EASE_OUT,
              }}
            >
              <Link
                href={`/resources/events/${event.slug}`}
                className="group block h-full"
              >
                <div
                  className="relative h-full overflow-hidden bg-white border border-border hover:border-gold-500/30 hover:shadow-[0_20px_60px_rgba(27,42,74,0.08)] transition-all duration-500"
                  style={{ clipPath: BRAND_SHAPE }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />

                    {/* Date badge overlay */}
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-navy-950/80 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold">
                      <Calendar
                        className="inline h-3 w-3 mr-1.5 text-gold-400"
                        aria-hidden="true"
                      />
                      {t(`events.${event.slug}.date`)}
                    </div>

                    {event.upcoming && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 bg-gold-500 text-navy-950 text-[10px] font-bold tracking-wide uppercase">
                          {t("upcoming")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {t(`events.${event.slug}.location`)}
                      </span>
                      <span
                        className="px-2 py-0.5 bg-navy-600/5 border border-navy-600/10 text-navy-600 text-[10px] font-semibold uppercase"
                        style={{ clipPath: BRAND_SHAPE }}
                      >
                        {t(`filter_${event.type}`)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy-600 mb-2 group-hover:text-gold-600 transition-colors duration-300 line-clamp-2">
                      {t(`events.${event.slug}.title`)}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                      {t(`events.${event.slug}.description`)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 group-hover:gap-3 transition-all duration-300">
                      {t("view_details")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
