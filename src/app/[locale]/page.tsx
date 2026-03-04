import HeroSection from "@/components/sections/HeroSection";
import HomeSections from "@/components/sections/HomeSections";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Locked: Hero — always first */}
      <div id="section-hero">
        <HeroSection />
      </div>

      {/* Reorderable sections — user can drag to rearrange */}
      <HomeSections />

      {/* Locked: CTA — always last */}
      <div id="section-cta">
        <CTASection />
      </div>
    </div>
  );
}
