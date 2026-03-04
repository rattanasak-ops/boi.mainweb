import ApplyHero from "@/components/sections/services/ApplyHero";
import ApplyContent from "@/components/sections/services/ApplyContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function ApplyPage() {
  return (
    <div className="flex flex-col">
      <ApplyHero />
      <ApplyContent />
      <RelatedContent
        items={[
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
          { href: "/services/e-investment", icon: "Monitor", translationKey: "e_investment" },
          { href: "/invest/eligibility-checker", icon: "Calculator", translationKey: "eligibility_checker" },
        ]}
      />
    </div>
  );
}
