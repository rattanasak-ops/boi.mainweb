import IndustriesHero from "@/components/sections/discover/IndustriesHero";
import IndustriesGrid from "@/components/sections/discover/IndustriesGrid";

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      <IndustriesHero />
      <IndustriesGrid />
    </div>
  );
}
