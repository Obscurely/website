"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@lib/blog";
import { BlogPostRow } from "./layout/BlogPostRow";
import { searchPosts } from "@utils/blog/search";

interface BlogContentProps {
  posts: Post[];
  isInView: boolean;
}

export function BlogContent({ posts, isInView }: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const searchParams = useSearchParams();

  // Listen for URL search params to filter posts
  useEffect(() => {
    const tagFilter = searchParams.get("tag");
    const yearFilter = searchParams.get("year");
    const searchFilter = searchParams.get("search");
    const featuredFilter = searchParams.get("featured");

    let filtered = [...posts];

    if (tagFilter) {
      filtered = filtered.filter((post) =>
        post.frontmatter.tags.includes(tagFilter)
      );
    }

    if (yearFilter) {
      filtered = filtered.filter(
        (post) =>
          new Date(post.frontmatter.date).getFullYear().toString() ===
          yearFilter
      );
    }

    // Searching with fuse.js
    if (searchFilter) {
      filtered = searchPosts(filtered, searchFilter);
    }

    if (featuredFilter === "true") {
      filtered = filtered.filter((post) => post.frontmatter.featured);
    }

    setFilteredPosts(filtered);
  }, [posts, searchParams]);

  return (
    <div className="space-y-6 pb-12">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <BlogPostRow
            key={post.slug}
            post={post}
            index={index}
            isInView={isInView}
          />
        ))
      ) : (
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/20 p-8 text-center">
          <h3 className="mb-2 text-xl font-medium text-white">
            No posts found
          </h3>
          <p className="text-slate-400">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
