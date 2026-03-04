import ThailandOverviewHero from "@/components/sections/discover/ThailandOverviewHero";
import ThailandOverviewContent from "@/components/sections/discover/ThailandOverviewContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function ThailandOverviewPage() {
  return (
    <div className="flex flex-col">
      <ThailandOverviewHero />
      <ThailandOverviewContent />
      <RelatedContent
        items={[
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
          { href: "/discover/special-zones", icon: "MapPin", translationKey: "special_zones" },
        ]}
      />
    </div>
  );
}
