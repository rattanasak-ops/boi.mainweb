import DataHero from "@/components/sections/resources/DataHero";
import DataDashboard from "@/components/sections/resources/DataDashboard";

export default function DataPage() {
  return (
    <div className="flex flex-col">
      <DataHero />
      <DataDashboard />
    </div>
  );
}
