import PublicationsHero from "@/components/sections/resources/PublicationsHero";
import PublicationsList from "@/components/sections/resources/PublicationsList";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function PublicationsPage() {
  return (
    <div className="flex flex-col">
      <PublicationsHero />
      <PublicationsList />
      <RelatedContent
        items={[
          { href: "/resources/data", icon: "BarChart3", translationKey: "data" },
          { href: "/invest/guide", icon: "BookOpen", translationKey: "guide" },
          { href: "/resources/faq", icon: "HelpCircle", translationKey: "faq" },
        ]}
      />
    </div>
  );
}
