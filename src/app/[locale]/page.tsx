import { useTranslations } from "next-intl";
import StatsSection from "@/components/sections/StatsSection";

export default function HomePage() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col">
      {/* Hero Section — จะเปลี่ยนเป็น cinematic ใน Phase 1 */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900">
        {/* Background overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(197,165,114,0.1)_0%,transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight">
            {t("headline")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-2xl mx-auto">
            {t("subheadline")}
          </p>

          {/* CTA Buttons — 3 Pillars */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-500 text-navy-900 font-semibold text-base hover:bg-gold-400 transition-colors shadow-lg"
            >
              {t("cta_eligibility")}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-base border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {t("cta_apply")}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-base border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {t("cta_consult")}
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section — Cinematic animated counters */}
      <StatsSection />

      {/* Why Thailand — placeholder */}
      <section className="py-16 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-600">
            Why Thailand?
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Strategic location, strong infrastructure, and competitive incentives
            make Thailand the ideal investment destination in Southeast Asia.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Strategic Location",
                desc: "Gateway to ASEAN with access to 700M+ consumers",
              },
              {
                title: "Strong Infrastructure",
                desc: "World-class transportation, digital connectivity, and industrial estates",
              },
              {
                title: "Competitive Incentives",
                desc: "Tax holidays up to 13 years, duty exemptions, and non-tax benefits",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-8 shadow-sm border border-border hover:shadow-md hover:border-gold-300 transition-all"
              >
                <h3 className="text-lg font-semibold text-navy-600">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-text-secondary">{card.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-gold-600 font-medium hover:text-gold-700 transition-colors"
          >
            {tCommon("learn_more")} →
          </a>
        </div>
      </section>
    </div>
  );
}
