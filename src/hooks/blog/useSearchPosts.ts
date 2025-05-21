"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Post } from "@lib/blog";

export function useSearchPosts(posts: Post[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Setup Fuse.js for search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        "frontmatter.title",
        "frontmatter.description",
        "frontmatter.tags",
      ],
      threshold: 0.4,
      includeMatches: true,
    });
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    // First filter by tag if selected
    let result = selectedTag
      ? posts.filter((post) => post.frontmatter.tags.includes(selectedTag))
      : posts;

    // Then search if query exists
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      result = searchResults.map((result) => result.item);
    }

    return result;
  }, [posts, searchQuery, selectedTag, fuse]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    filteredPosts,
    allTags,
  };
}
