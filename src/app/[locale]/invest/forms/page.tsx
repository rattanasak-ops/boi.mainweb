import FormsHero from "@/components/sections/invest/FormsHero";
import FormsList from "@/components/sections/invest/FormsList";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function FormsPage() {
  return (
    <div className="flex flex-col">
      <FormsHero />
      <FormsList />
      <RelatedContent
        items={[
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
          { href: "/services/apply", icon: "FileText", translationKey: "apply" },
          { href: "/services/e-investment", icon: "Monitor", translationKey: "e_investment" },
        ]}
      />
    </div>
  );
}
