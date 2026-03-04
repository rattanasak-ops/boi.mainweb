import AfterPromotionHero from "@/components/sections/services/AfterPromotionHero";
import AfterPromotionContent from "@/components/sections/services/AfterPromotionContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function AfterPromotionPage() {
  return (
    <div className="flex flex-col">
      <AfterPromotionHero />
      <AfterPromotionContent />
      <RelatedContent
        items={[
          { href: "/services/e-investment", icon: "Monitor", translationKey: "e_investment" },
          { href: "/services/osos", icon: "Building2", translationKey: "osos" },
          { href: "/invest/forms", icon: "FileDown", translationKey: "forms" },
        ]}
      />
    </div>
  );
}
