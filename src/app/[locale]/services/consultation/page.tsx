import ConsultationHero from "@/components/sections/services/ConsultationHero";
import ConsultationContent from "@/components/sections/services/ConsultationContent";

export default function ConsultationPage() {
  return (
    <div className="flex flex-col">
      <ConsultationHero />
      <ConsultationContent />
    </div>
  );
}
