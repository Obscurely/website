import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Post } from "@lib/blog";

/**
 * Custom hook to manage search of blog posts.
 */
export function useSearchPosts(posts: Post[]) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || ""
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(() =>
    searchParams.get("tag")
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(() =>
    searchParams.get("year")
  );
  const [isFeatured, setIsFeatured] = useState(
    () => searchParams.get("featured") === "true"
  );

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Extract all years from posts
  const allYears = useMemo(() => {
    const years = new Set<string>();
    posts.forEach((post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [posts]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedYear,
    setSelectedYear,
    isFeatured,
    setIsFeatured,
    allTags,
    allYears,
  };
}
