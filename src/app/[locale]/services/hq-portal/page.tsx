import HqPortalHero from "@/components/sections/services/HqPortalHero";
import HqPortalContent from "@/components/sections/services/HqPortalContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function HqPortalPage() {
  return (
    <div className="flex flex-col">
      <HqPortalHero />
      <HqPortalContent />
      <RelatedContent
        items={[
          { href: "/services/e-investment", icon: "Monitor", translationKey: "e_investment" },
          { href: "/about/offices", icon: "MapPin", translationKey: "offices" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
        ]}
      />
    </div>
  );
}
