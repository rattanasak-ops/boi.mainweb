"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function CompanyDbHero() {
  return (
    <StandardHero
      ns="company_db_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_resources", href: "/resources/news" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
