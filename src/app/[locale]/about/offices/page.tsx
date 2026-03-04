import OfficesHero from "@/components/sections/about/OfficesHero";
import OfficesContent from "@/components/sections/about/OfficesContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function OfficesPage() {
  return (
    <div className="flex flex-col">
      <OfficesHero />
      <OfficesContent />
      <RelatedContent
        items={[
          { href: "/contact", icon: "Phone", translationKey: "contact" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
          { href: "/about/overview", icon: "Shield", translationKey: "overview" },
        ]}
      />
    </div>
  );
}
