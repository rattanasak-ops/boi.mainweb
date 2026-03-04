import ProcurementHero from "@/components/sections/about/ProcurementHero";
import ProcurementContent from "@/components/sections/about/ProcurementContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function ProcurementPage() {
  return (
    <div className="flex flex-col">
      <ProcurementHero />
      <ProcurementContent />
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
