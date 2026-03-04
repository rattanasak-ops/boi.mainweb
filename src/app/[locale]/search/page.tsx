import { Suspense } from "react";
import SearchResultsSection from "@/components/sections/SearchResultsSection";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResultsSection />
    </Suspense>
  );
}
