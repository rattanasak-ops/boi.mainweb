import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.boi.go.th";
const locales = ["th", "en", "ja", "zh", "ko", "de", "fr"];

const pages = [
  // Home
  "",
  // Discover Thailand (6)
  "/discover",
  "/discover/thailand-overview",
  "/discover/industries",
  "/discover/special-zones",
  "/discover/success-stories",
  "/discover/advertorials",
  // Invest Now (8)
  "/invest/incentives",
  "/invest/getting-started",
  "/invest/eligibility-checker",
  "/invest/eligible-activities",
  "/invest/procedures",
  "/invest/forms",
  "/invest/announcements",
  "/invest/guide",
  // Services (10)
  "/services",
  "/services/apply",
  "/services/e-investment",
  "/services/visa",
  "/services/smart-visa",
  "/services/osos",
  "/services/consultation",
  "/services/matchmaking",
  "/services/after-promotion",
  "/services/hq-portal",
  // Resources (7)
  "/resources/news",
  "/resources/events",
  "/resources/faq",
  "/resources/data",
  "/resources/company-database",
  "/resources/publications",
  "/resources/multimedia",
  // About BOI (5)
  "/about/overview",
  "/about/offices",
  "/about/careers",
  "/about/press-center",
  "/about/procurement",
  // Other (3)
  "/contact",
  "/search",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {};
      for (const alt of locales) {
        alternates[alt] = `${BASE_URL}/${alt}${page}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority:
          page === ""
            ? 1.0
            : page.startsWith("/invest") || page.startsWith("/services")
              ? 0.9
              : page.startsWith("/discover")
                ? 0.8
                : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
