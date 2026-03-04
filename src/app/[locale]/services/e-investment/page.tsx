import EInvestmentHero from "@/components/sections/services/EInvestmentHero";
import EInvestmentContent from "@/components/sections/services/EInvestmentContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function EInvestmentPage() {
  return (
    <div className="flex flex-col">
      <EInvestmentHero />
      <EInvestmentContent />
      <RelatedContent
        items={[
          { href: "/services/apply", icon: "FileText", translationKey: "apply" },
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
        ]}
      />
    </div>
  );
}
