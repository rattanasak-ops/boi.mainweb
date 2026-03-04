import ProceduresHero from "@/components/sections/invest/ProceduresHero";
import ProceduresContent from "@/components/sections/invest/ProceduresContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function ProceduresPage() {
  return (
    <div className="flex flex-col">
      <ProceduresHero />
      <ProceduresContent />
      <RelatedContent
        items={[
          { href: "/invest/forms", icon: "FileDown", translationKey: "forms" },
          { href: "/services/apply", icon: "FileText", translationKey: "apply" },
          { href: "/services/e-investment", icon: "Monitor", translationKey: "e_investment" },
        ]}
      />
    </div>
  );
}
