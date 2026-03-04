import GuideHero from "@/components/sections/invest/GuideHero";
import GuideContent from "@/components/sections/invest/GuideContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function GuidePage() {
  return (
    <div className="flex flex-col">
      <GuideHero />
      <GuideContent />
      <RelatedContent
        items={[
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
          { href: "/invest/procedures", icon: "ClipboardList", translationKey: "procedures" },
          { href: "/resources/faq", icon: "HelpCircle", translationKey: "faq" },
        ]}
      />
    </div>
  );
}
