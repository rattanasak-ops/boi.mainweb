import NewsHeroSection from "@/components/sections/resources/NewsHeroSection";
import NewsListSection from "@/components/sections/resources/NewsListSection";

export default function NewsPage() {
  return (
    <div className="flex flex-col">
      <NewsHeroSection />
      <NewsListSection />
    </div>
  );
}
