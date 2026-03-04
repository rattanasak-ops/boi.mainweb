import SpecialZonesHero from "@/components/sections/discover/SpecialZonesHero";
import SpecialZonesContent from "@/components/sections/discover/SpecialZonesContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function SpecialZonesPage() {
  return (
    <div className="flex flex-col">
      <SpecialZonesHero />
      <SpecialZonesContent />
      <RelatedContent
        items={[
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
        ]}
      />
    </div>
  );
}
