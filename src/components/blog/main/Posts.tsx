"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@lib/blog";
import { PostRow } from "../layout/PostRow";
import { searchPosts } from "@utils/blog/search";
import { motion, AnimatePresence } from "framer-motion";

interface PostsProps {
  posts: Post[];
  isInView: boolean;
}

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
            className="rounded-lg border border-slate-700/50 bg-slate-800/20 p-8 text-center"
          >
            <h3 className="mb-2 text-xl font-medium text-white">
              No posts found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search query.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
