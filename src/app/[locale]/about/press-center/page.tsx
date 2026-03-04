import PressCenterHero from "@/components/sections/about/PressCenterHero";
import PressCenterContent from "@/components/sections/about/PressCenterContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function PressCenterPage() {
  return (
    <div className="flex flex-col">
      <PressCenterHero />
      <PressCenterContent />
      <RelatedContent
        items={[
          { href: "/resources/news", icon: "Newspaper", translationKey: "news" },
          { href: "/resources/multimedia", icon: "Video", translationKey: "multimedia" },
          { href: "/about/overview", icon: "Shield", translationKey: "overview" },
        ]}
      />
    </div>
  );
}
