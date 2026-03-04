import MatchmakingHero from "@/components/sections/services/MatchmakingHero";
import MatchmakingContent from "@/components/sections/services/MatchmakingContent";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function MatchmakingPage() {
  return (
    <div className="flex flex-col">
      <MatchmakingHero />
      <MatchmakingContent />
      <RelatedContent
        items={[
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
          { href: "/services/consultation", icon: "Headphones", translationKey: "consultation" },
          { href: "/invest/getting-started", icon: "Rocket", translationKey: "getting_started" },
        ]}
      />
    </div>
  );
}
