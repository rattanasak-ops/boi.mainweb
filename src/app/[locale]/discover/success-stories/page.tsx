import SuccessStoriesHero from "@/components/sections/discover/SuccessStoriesHero";
import SuccessStoriesGrid from "@/components/sections/discover/SuccessStoriesGrid";

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col">
      <SuccessStoriesHero />
      <SuccessStoriesGrid />
    </div>
  );
}
