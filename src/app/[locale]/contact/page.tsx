import ContactHeroSection from "@/components/sections/contact/ContactHeroSection";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import OfficesSection from "@/components/sections/contact/OfficesSection";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <ContactHeroSection />
      <ContactFormSection />
      <OfficesSection />
    </div>
  );
}
