import OfficesHero from "@/components/sections/about/OfficesHero";
import OfficesContent from "@/components/sections/about/OfficesContent";

export default function OfficesPage() {
  return (
    <div className="flex flex-col">
      <OfficesHero />
      <OfficesContent />
    </div>
  );
}
