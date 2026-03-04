import VisaHero from "@/components/sections/services/VisaHero";
import VisaContent from "@/components/sections/services/VisaContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function VisaPage() {
  return (
    <div className="flex flex-col">
      <VisaHero />
      <VisaContent />
      <RelatedContent
        items={[
          { href: "/services/smart-visa", icon: "Sparkles", translationKey: "smart_visa" },
          { href: "/services/osos", icon: "Building2", translationKey: "osos" },
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
        ]}
      />
    </div>
  );
}
