import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesGridSection from "@/components/sections/services/ServicesGridSection";
import ServicesCTASection from "@/components/sections/services/ServicesCTASection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <ServicesHeroSection />
      <ServicesGridSection />
      <ServicesCTASection />
    </div>
  );
}
