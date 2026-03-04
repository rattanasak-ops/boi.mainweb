"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function AfterPromotionHero() {
  return (
    <StandardHero
      ns="after_promotion_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_services", href: "/services" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
