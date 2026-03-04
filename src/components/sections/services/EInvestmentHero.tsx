"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function EInvestmentHero() {
  return (
    <StandardHero
      ns="e_investment_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_services", href: "/services" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
