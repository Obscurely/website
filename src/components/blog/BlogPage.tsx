"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Post } from "@lib/blog";
import { BlogSearch } from "./BlogSearch";
import { BlogPostCard } from "./BlogPostCard";
import { BlogHeader } from "./BlogHeader";
import { BlogTagFilter } from "./BlogTagFilter";
import { useSearchPosts } from "@hooks/blog/useSearchPosts";

interface BlogPageProps {
  initialPosts: Post[];
}

export function BlogPage({ initialPosts }: BlogPageProps) {
  const [isInView, setIsInView] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    filteredPosts,
    allTags,
  } = useSearchPosts(initialPosts);

  useEffect(() => {
    setIsInView(true);
  }, []);

  return (
    <section
      id="blog"
      className="relative min-h-screen overflow-hidden py-20 pt-32"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 blur-[100px]"></div>
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-cyan-500 opacity-10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader isInView={isInView} />

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BlogSearch
            searchQuery={searchQuery}
            setSearchQueryAction={setSearchQuery}
            isInView={isInView}
          />
          <BlogTagFilter
            tags={allTags}
            selectedTag={selectedTag}
            setSelectedTagAction={setSelectedTag}
            isInView={isInView}
          />
        </div>

        {filteredPosts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, index) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-700/30 bg-slate-800/20 p-8 text-center"
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                No posts found
              </h3>
              <p className="text-slate-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
