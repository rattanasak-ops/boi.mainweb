import ActivitiesHero from "@/components/sections/invest/ActivitiesHero";
import ActivitiesList from "@/components/sections/invest/ActivitiesList";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function EligibleActivitiesPage() {
  return (
    <div className="flex flex-col">
      <ActivitiesHero />
      <ActivitiesList />
      <RelatedContent
        items={[
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
          { href: "/invest/eligibility-checker", icon: "Calculator", translationKey: "eligibility_checker" },
          { href: "/discover/industries", icon: "Factory", translationKey: "industries" },
        ]}
      />
    </div>
  );
}
