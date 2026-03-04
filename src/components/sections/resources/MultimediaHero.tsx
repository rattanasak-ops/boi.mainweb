"use client";

import StandardHero from "@/components/sections/shared/StandardHero";

export default function MultimediaHero() {
  return (
    <StandardHero
      ns="multimedia_page.hero"
      breadcrumbs={[
        { labelKey: "breadcrumb_home", href: "/" },
        { labelKey: "breadcrumb_resources", href: "/resources/news" },
        { labelKey: "breadcrumb" },
      ]}
    />
  );
}
