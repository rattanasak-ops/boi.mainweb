import DiscoverHeroSection from "@/components/sections/discover/DiscoverHeroSection";
import EconomicIndicatorsSection from "@/components/sections/discover/EconomicIndicatorsSection";
import TargetIndustriesSection from "@/components/sections/discover/TargetIndustriesSection";
import SpecialZonesSection from "@/components/sections/discover/SpecialZonesSection";
import DiscoverCTASection from "@/components/sections/discover/DiscoverCTASection";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col">
      <DiscoverHeroSection />
      <EconomicIndicatorsSection />
      <TargetIndustriesSection />
      <SpecialZonesSection />
      <DiscoverCTASection />
    </div>
  );
}
