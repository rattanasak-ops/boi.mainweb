import EventsHeroSection from "@/components/sections/resources/EventsHeroSection";
import EventsListSection from "@/components/sections/resources/EventsListSection";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <EventsHeroSection />
      <EventsListSection />
      <RelatedContent
        items={[
          { href: "/resources/news", icon: "Newspaper", translationKey: "news" },
          { href: "/resources/multimedia", icon: "Video", translationKey: "multimedia" },
          { href: "/about/press-center", icon: "Megaphone", translationKey: "press_center" },
        ]}
      />
    </div>
  );
}
