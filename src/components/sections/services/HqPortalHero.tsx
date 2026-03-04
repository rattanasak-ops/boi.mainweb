"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function HqPortalHero() {
  return (
    <StandardHero
      ns="hq_portal_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_services", href: "/services" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
