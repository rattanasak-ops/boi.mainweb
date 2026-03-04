import MultimediaHero from "@/components/sections/resources/MultimediaHero";
import MultimediaGallery from "@/components/sections/resources/MultimediaGallery";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function MultimediaPage() {
  return (
    <div className="flex flex-col">
      <MultimediaHero />
      <MultimediaGallery />
      <RelatedContent
        items={[
          { href: "/resources/news", icon: "Newspaper", translationKey: "news" },
          { href: "/resources/events", icon: "CalendarClock", translationKey: "events" },
          { href: "/discover/success-stories", icon: "Trophy", translationKey: "success_stories" },
        ]}
      />
    </div>
  );
}
