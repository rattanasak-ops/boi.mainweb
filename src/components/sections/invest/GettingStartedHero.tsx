"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function GettingStartedHero() {
  return (
    <StandardHero
      ns="getting_started.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_invest", href: "/invest/incentives" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
