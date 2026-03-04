import EventsHeroSection from "@/components/sections/resources/EventsHeroSection";
import EventsListSection from "@/components/sections/resources/EventsListSection";

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <EventsHeroSection />
      <EventsListSection />
    </div>
  );
}
