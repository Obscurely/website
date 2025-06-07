import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterHook {
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Custom hook to manage filtering of blog posts based on tags, years, search queries, and featured status.
 *
 * @param selectedTag - The currently selected tag for filtering blog posts.
 * @param setSelectedTag - Function to update the selected tag.
 * @param searchQuery - The current search query for filtering blog posts.
 * @param setSearchQuery - Function to update the search query.
 * @returns
 */
export const useFilter = ({
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery,
}: FilterHook) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const yearParam = searchParams.get("year");
    const searchParam = searchParams.get("search");
    const featuredParam = searchParams.get("featured");

    if (tagParam) setSelectedTag(tagParam);
    if (yearParam) setSelectedYear(yearParam);
    if (searchParam) setSearchQuery(searchParam);

    setIsFeatured(featuredParam === "true");
  }, [searchParams, setSearchQuery, setSelectedTag]);

  // Apply filters
  const applyFilters = (overrideSearchQuery?: string) => {
    const currentSearchQuery =
      typeof overrideSearchQuery === "string"
        ? overrideSearchQuery
        : searchQuery;
    const params = new URLSearchParams();

    if (selectedTag) params.set("tag", selectedTag);
    if (selectedYear) params.set("year", selectedYear);
    if (
      currentSearchQuery &&
      typeof currentSearchQuery === "string" &&
      currentSearchQuery.trim()
    )
      params.set("search", currentSearchQuery.trim());
    if (isFeatured) params.set("featured", "true");

    router.push(`/blog?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSelectedYear(null);
    setIsFeatured(false);
    router.push("/blog");
  };

  return {
    selectedYear,
    setSelectedYear,
    isFeatured,
    setIsFeatured,
    applyFilters,
    clearFilters,
  };
};
