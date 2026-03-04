import EligibilityHero from "@/components/sections/invest/EligibilityHero";
import EligibilityChecker from "@/components/sections/invest/EligibilityChecker";

export default function EligibilityCheckerPage() {
  return (
    <div className="flex flex-col">
      <EligibilityHero />
      <EligibilityChecker />
    </div>
  );
}
