"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function FormsHero() {
  return (
    <StandardHero
      ns="forms_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_invest", href: "/invest/incentives" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
