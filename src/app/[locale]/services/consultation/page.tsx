import ConsultationHero from "@/components/sections/services/ConsultationHero";
import ConsultationContent from "@/components/sections/services/ConsultationContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function ConsultationPage() {
  return (
    <div className="flex flex-col">
      <ConsultationHero />
      <ConsultationContent />
      <RelatedContent
        items={[
          { href: "/services/apply", icon: "FileText", translationKey: "apply" },
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
          { href: "/contact", icon: "Phone", translationKey: "contact" },
        ]}
      />
    </div>
  );
}
