import ActivitiesHero from "@/components/sections/invest/ActivitiesHero";
import ActivitiesList from "@/components/sections/invest/ActivitiesList";

export default function EligibleActivitiesPage() {
  return (
    <div className="flex flex-col">
      <ActivitiesHero />
      <ActivitiesList />
    </div>
  );
}
