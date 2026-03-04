import SuccessStoriesHero from "@/components/sections/discover/SuccessStoriesHero";
import SuccessStoriesGrid from "@/components/sections/discover/SuccessStoriesGrid";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col">
      <SuccessStoriesHero />
      <SuccessStoriesGrid />
      <RelatedContent
        items={[
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
        ]}
      />
    </div>
  );
}
