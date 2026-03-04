import CompanyDbHero from "@/components/sections/resources/CompanyDbHero";
import CompanyDbSearch from "@/components/sections/resources/CompanyDbSearch";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function CompanyDatabasePage() {
  return (
    <div className="flex flex-col">
      <CompanyDbHero />
      <CompanyDbSearch />
      <RelatedContent
        items={[
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
          { href: "/resources/data", icon: "BarChart3", translationKey: "data" },
          { href: "/services/matchmaking", icon: "Handshake", translationKey: "matchmaking" },
        ]}
      />
    </div>
  );
}
