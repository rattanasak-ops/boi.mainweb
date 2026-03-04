import EligibilityHero from "@/components/sections/invest/EligibilityHero";
import EligibilityChecker from "@/components/sections/invest/EligibilityChecker";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function EligibilityCheckerPage() {
  return (
    <div className="flex flex-col">
      <EligibilityHero />
      <EligibilityChecker />
      <RelatedContent
        items={[
          { href: "/invest/eligible-activities", icon: "ClipboardCheck", translationKey: "eligible_activities" },
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
          { href: "/services/apply", icon: "FileText", translationKey: "apply" },
        ]}
      />
    </div>
  );
}
