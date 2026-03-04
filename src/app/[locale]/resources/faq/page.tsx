import FAQHeroSection from "@/components/sections/resources/FAQHeroSection";
import FAQContentSection from "@/components/sections/resources/FAQContentSection";
import FAQCTASection from "@/components/sections/resources/FAQCTASection";

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      <FAQHeroSection />
      <FAQContentSection />
      <FAQCTASection />
    </div>
  );
}
