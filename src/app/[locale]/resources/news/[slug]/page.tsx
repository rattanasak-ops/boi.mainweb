import NewsDetailHero from "@/components/sections/resources/NewsDetailHero";
import NewsDetailContent from "@/components/sections/resources/NewsDetailContent";
import RelatedNewsSection from "@/components/sections/resources/RelatedNewsSection";

export default function NewsDetailPage() {
  return (
    <div className="flex flex-col">
      <NewsDetailHero />
      <NewsDetailContent />
      <RelatedNewsSection />
    </div>
  );
}
