import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CurrentFilters {
  search?: string;
  tag?: string;
  year?: string;
  featured?: string;
}

/**
 * Custom hook to manage filtering of blog posts based on tags, years, search queries, and featured status.
 */
export const useFilter = (currentFilters: CurrentFilters) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(currentFilters.search || "");
  const [selectedTag, setSelectedTag] = useState<string | null>(
    currentFilters.tag || null
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(
    currentFilters.year || null
  );
  const [isFeatured, setIsFeatured] = useState(
    currentFilters.featured === "true"
  );
  const [drawerOpen, setDrawerOpen] = useState(false); // handle mobile drawer state

  // Update state when current filters change
  useEffect(() => {
    setSearchQuery(currentFilters.search || "");
    setSelectedTag(currentFilters.tag || null);
    setSelectedYear(currentFilters.year || null);
    setIsFeatured(currentFilters.featured === "true");
  }, [currentFilters]);

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
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedYear,
    setSelectedYear,
    isFeatured,
    setIsFeatured,
    drawerOpen,
    setDrawerOpen,
    applyFilters,
    clearFilters,
  };
};
