import IndustriesHero from "@/components/sections/discover/IndustriesHero";
import IndustriesGrid from "@/components/sections/discover/IndustriesGrid";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      <IndustriesHero />
      <IndustriesGrid />
      <RelatedContent
        items={[
          { href: "/discover/special-zones", icon: "MapPin", translationKey: "special_zones" },
          { href: "/invest/eligible-activities", icon: "ClipboardCheck", translationKey: "eligible_activities" },
          { href: "/discover/success-stories", icon: "Trophy", translationKey: "success_stories" },
        ]}
      />
    </div>
  );
}
