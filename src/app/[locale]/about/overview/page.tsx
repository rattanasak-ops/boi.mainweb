import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import VisionMissionSection from "@/components/sections/about/VisionMissionSection";
import TimelineSection from "@/components/sections/about/TimelineSection";
import LeadershipSection from "@/components/sections/about/LeadershipSection";
import AboutCTASection from "@/components/sections/about/AboutCTASection";

export default function AboutOverviewPage() {
  return (
    <div className="flex flex-col">
      <AboutHeroSection />
      <VisionMissionSection />
      <TimelineSection />
      <LeadershipSection />
      <AboutCTASection />
    </div>
  );
}
