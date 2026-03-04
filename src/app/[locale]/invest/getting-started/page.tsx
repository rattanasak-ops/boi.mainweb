import GettingStartedHero from "@/components/sections/invest/GettingStartedHero";
import GettingStartedContent from "@/components/sections/invest/GettingStartedContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col">
      <GettingStartedHero />
      <GettingStartedContent />
      <RelatedContent
        items={[
          { href: "/invest/eligibility-checker", icon: "Calculator", translationKey: "eligibility_checker" },
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
        ]}
      />
    </div>
  );
}
