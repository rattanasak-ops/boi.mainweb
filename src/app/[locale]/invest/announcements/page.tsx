import AnnouncementsHero from "@/components/sections/invest/AnnouncementsHero";
import AnnouncementsList from "@/components/sections/invest/AnnouncementsList";
import RelatedContent from "@/components/sections/shared/RelatedContent";

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col">
      <AnnouncementsHero />
      <AnnouncementsList />
      <RelatedContent
        items={[
          { href: "/resources/news", icon: "Newspaper", translationKey: "news" },
          { href: "/invest/eligible-activities", icon: "ClipboardCheck", translationKey: "eligible_activities" },
          { href: "/invest/incentives", icon: "Gift", translationKey: "incentives" },
        ]}
      />
    </div>
  );
}
