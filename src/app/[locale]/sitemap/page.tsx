import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
    <main className="min-h-screen bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-600 tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary mb-12 max-w-2xl">
          {t("description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {siteLinks.map((section) => (
            <div key={section.sectionKey}>
              <h2 className="text-lg font-bold text-navy-600 mb-4 pb-2 border-b-2 border-gold-500/30">
                {t(`sections.${section.sectionKey}`)}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-gold-600 transition-colors duration-200"
                    >
                      {t(`links.${link.labelKey}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
