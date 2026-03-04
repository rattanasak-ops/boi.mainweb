import AdvertorialsHero from "@/components/sections/discover/AdvertorialsHero";
import AdvertorialsList from "@/components/sections/discover/AdvertorialsList";

export default function AdvertorialsPage() {
  return (
    <div className="flex flex-col">
      <AdvertorialsHero />
      <AdvertorialsList />
    </div>
  );
}
