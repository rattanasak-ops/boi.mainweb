"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function OfficesHero() {
  return (
    <StandardHero
      ns="offices_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_about", href: "/about/overview" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
