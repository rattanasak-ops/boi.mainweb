import AnnouncementsHero from "@/components/sections/invest/AnnouncementsHero";
import AnnouncementsList from "@/components/sections/invest/AnnouncementsList";

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col">
      <AnnouncementsHero />
      <AnnouncementsList />
    </div>
  );
}
