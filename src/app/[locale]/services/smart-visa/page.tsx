import SmartVisaHero from "@/components/sections/services/SmartVisaHero";
import SmartVisaContent from "@/components/sections/services/SmartVisaContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function SmartVisaPage() {
  return (
    <div className="flex flex-col">
      <SmartVisaHero />
      <SmartVisaContent />
      <RelatedContent
        items={[
          { href: "/services/visa", icon: "Stamp", translationKey: "visa" },
          { href: "/services/osos", icon: "Building2", translationKey: "osos" },
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
        ]}
      />
    </div>
  );
}
