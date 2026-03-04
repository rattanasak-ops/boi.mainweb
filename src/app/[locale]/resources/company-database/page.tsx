import CompanyDbHero from "@/components/sections/resources/CompanyDbHero";
import CompanyDbSearch from "@/components/sections/resources/CompanyDbSearch";

export default function CompanyDatabasePage() {
  return (
    <div className="flex flex-col">
      <CompanyDbHero />
      <CompanyDbSearch />
    </div>
  );
}
