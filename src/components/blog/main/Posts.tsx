"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@lib/blog";
import { PostRow } from "../layout/PostRow";
import { searchPosts } from "@utils/blog/search";
import { motion, AnimatePresence } from "framer-motion";
import { IconFileText } from "@tabler/icons-react";

interface PostsProps {
  posts: Post[];
  isInView: boolean;
}

/**
 * Posts component displays a list of blog posts, filtering them based on URL search parameters.
 */
export function Posts({ posts, isInView }: PostsProps) {
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
    <motion.div className="space-y-6 pb-10" layout>
      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div
            key="posts-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.3 },
                }}
              >
                <PostRow post={post} index={index} isInView={isInView} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-posts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/30 transition-all duration-300 hover:border-slate-600/40 hover:shadow-xl hover:shadow-slate-500/5">
              <div className="flex h-40 flex-col items-center justify-center p-4 sm:h-48 sm:p-6 md:h-auto md:min-h-[200px]">
                <div className="space-y-3 text-center sm:space-y-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/30 sm:mb-4 sm:h-16 sm:w-16">
                    <IconFileText
                      size={24}
                      className="text-slate-400 sm:size-8"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    No posts found
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                    Try adjusting your filters or search query to find what
                    you're looking for.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
