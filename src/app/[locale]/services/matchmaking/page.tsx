import MatchmakingHero from "@/components/sections/services/MatchmakingHero";
import MatchmakingContent from "@/components/sections/services/MatchmakingContent";

export default function MatchmakingPage() {
  return (
    <div className="flex flex-col">
      <MatchmakingHero />
      <MatchmakingContent />
    </div>
  );
}
