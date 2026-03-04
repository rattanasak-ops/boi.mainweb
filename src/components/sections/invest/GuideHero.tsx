"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function GuideHero() {
  return (
    <StandardHero
      ns="guide_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_invest", href: "/invest/incentives" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
