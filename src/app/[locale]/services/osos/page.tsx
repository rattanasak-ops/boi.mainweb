import OsosHero from "@/components/sections/services/OsosHero";
import OsosContent from "@/components/sections/services/OsosContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function OsosPage() {
  return (
    <div className="flex flex-col">
      <OsosHero />
      <OsosContent />
      <RelatedContent
        items={[
          { href: "/services/visa", icon: "Stamp", translationKey: "visa" },
          { href: "/services/smart-visa", icon: "Sparkles", translationKey: "smart_visa" },
          { href: "/contact", icon: "Phone", translationKey: "contact" },
        ]}
      />
    </div>
  );
}
