import PressCenterHero from "@/components/sections/about/PressCenterHero";
import PressCenterContent from "@/components/sections/about/PressCenterContent";

export default function PressCenterPage() {
  return (
    <div className="flex flex-col">
      <PressCenterHero />
      <PressCenterContent />
    </div>
  );
}
