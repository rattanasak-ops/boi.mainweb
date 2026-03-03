import IncentivesHeroSection from "@/components/sections/invest/IncentivesHeroSection";
import TaxIncentivesSection from "@/components/sections/invest/TaxIncentivesSection";
import NonTaxIncentivesSection from "@/components/sections/invest/NonTaxIncentivesSection";
import IncentivesCTASection from "@/components/sections/invest/IncentivesCTASection";

export default function IncentivesPage() {
  return (
    <div className="flex flex-col">
      <IncentivesHeroSection />
      <TaxIncentivesSection />
      <NonTaxIncentivesSection />
      <IncentivesCTASection />
    </div>
  );
}
