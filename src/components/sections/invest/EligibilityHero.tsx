"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function EligibilityHero() {
  return (
    <StandardHero
      ns="eligibility_checker.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_invest", href: "/invest/incentives" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
