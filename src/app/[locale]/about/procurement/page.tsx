import ProcurementHero from "@/components/sections/about/ProcurementHero";
import ProcurementContent from "@/components/sections/about/ProcurementContent";

export default function ProcurementPage() {
  return (
    <div className="flex flex-col">
      <ProcurementHero />
      <ProcurementContent />
    </div>
  );
}
