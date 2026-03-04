import DataHero from "@/components/sections/resources/DataHero";
import DataDashboard from "@/components/sections/resources/DataDashboard";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function DataPage() {
  return (
    <div className="flex flex-col">
      <DataHero />
      <DataDashboard />
      <RelatedContent
        items={[
          { href: "/resources/publications", icon: "BookOpen", translationKey: "publications" },
          { href: "/discover/thailand-overview", icon: "Globe", translationKey: "thailand_overview" },
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
        ]}
      />
    </div>
  );
}
