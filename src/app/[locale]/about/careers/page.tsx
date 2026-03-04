import CareersHero from "@/components/sections/about/CareersHero";
import CareersContent from "@/components/sections/about/CareersContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      <CareersHero />
      <CareersContent />
      <RelatedContent
        items={[
          { href: "/about/overview", icon: "Shield", translationKey: "overview" },
          { href: "/about/offices", icon: "MapPin", translationKey: "offices" },
          { href: "/contact", icon: "Phone", translationKey: "contact" },
        ]}
      />
    </div>
  );
}
