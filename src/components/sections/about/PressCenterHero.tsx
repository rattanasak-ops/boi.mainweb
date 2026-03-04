"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function PressCenterHero() {
  return (
    <StandardHero
      ns="press_center_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_about", href: "/about/overview" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
