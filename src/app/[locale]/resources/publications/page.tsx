import PublicationsHero from "@/components/sections/resources/PublicationsHero";
import PublicationsList from "@/components/sections/resources/PublicationsList";

export default function PublicationsPage() {
  return (
    <div className="flex flex-col">
      <PublicationsHero />
      <PublicationsList />
    </div>
  );
}
