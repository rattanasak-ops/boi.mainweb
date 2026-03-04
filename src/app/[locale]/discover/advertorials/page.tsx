import AdvertorialsHero from "@/components/sections/discover/AdvertorialsHero";
import AdvertorialsList from "@/components/sections/discover/AdvertorialsList";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function AdvertorialsPage() {
  return (
    <div className="flex flex-col">
      <AdvertorialsHero />
      <AdvertorialsList />
      <RelatedContent
        items={[
          { href: "/discover/success-stories", icon: "Trophy", translationKey: "success_stories" },
          { href: "/resources/news", icon: "Newspaper", translationKey: "news" },
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
        ]}
      />
    </div>
  );
}
