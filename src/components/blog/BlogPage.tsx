"use client";

import { useRef } from "react";
import { Post } from "@lib/blog";
import { useSearchPosts } from "@hooks/blog/useSearchPosts";
import { BlogSidebar } from "./BlogSidebar";
import { BlogContent } from "./BlogContent";
import { BlogFilterSidebar } from "./BlogFilterSidebar";
import { useInView } from "framer-motion";

interface BlogPageProps {
  initialPosts: Post[];
}

export function BlogPage({ initialPosts }: BlogPageProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    allTags,
    allYears,
  } = useSearchPosts(initialPosts);

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Sidebar - Fixed */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-1/4">
            <BlogSidebar />
          </div>

          {/* Middle Content - Scrollable */}
          <div className="mt-8 lg:mt-0 lg:w-2/4">
            <div ref={headerRef}>
              <BlogContent posts={initialPosts} isInView={isInView} />
            </div>
          </div>

          {/* Right Sidebar - Filters */}
          <div className="mt-8 lg:sticky lg:top-24 lg:mt-0 lg:h-[calc(100vh-6rem)] lg:w-1/4">
            <BlogFilterSidebar
              searchQuery={searchQuery}
              setSearchQueryAction={setSearchQuery}
              tags={allTags}
              selectedTag={selectedTag}
              setSelectedTagAction={setSelectedTag}
              years={allYears}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
