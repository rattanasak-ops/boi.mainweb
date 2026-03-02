import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import WhyThailandSection from "@/components/sections/WhyThailandSection";
import QuickServicesSection from "@/components/sections/QuickServicesSection";
import LatestNewsSection from "@/components/sections/LatestNewsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <WhyThailandSection />
      <QuickServicesSection />
      <LatestNewsSection />
      <CTASection />
    </div>
  );
}
