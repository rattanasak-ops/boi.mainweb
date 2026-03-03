import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import WhyThailandSection from "@/components/sections/WhyThailandSection";
import QuickServicesSection from "@/components/sections/QuickServicesSection";
import LatestNewsSection from "@/components/sections/LatestNewsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div id="section-hero">
        <HeroSection />
      </div>
      <div id="section-stats">
        <StatsSection />
      </div>
      <div id="section-why-thailand">
        <WhyThailandSection />
      </div>
      <div id="section-services">
        <QuickServicesSection />
      </div>
      <div id="section-news">
        <LatestNewsSection />
      </div>
      <div id="section-cta">
        <CTASection />
      </div>
    </div>
  );
}
