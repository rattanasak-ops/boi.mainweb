"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function AnnouncementsHero() {
  return (
    <StandardHero
      ns="announcements_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_invest", href: "/invest/incentives" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
