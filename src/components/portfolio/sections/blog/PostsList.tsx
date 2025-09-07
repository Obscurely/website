"use client";

import { useEffect, useMemo, useState } from "react";

import { Post, getAllPosts } from "@lib/blog";
import { LOADING_POSTS } from "@utils/portfolio/blog";

import { BlogCard } from "./BlogCard";

/**
 * PostsList component fetches and displays the latest blog posts.
 */
export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const latestPosts = useMemo(() => posts.slice(0, 3), [posts]);

  const gridClassName = useMemo(() => {
    const baseClasses = "grid gap-8";
    if (latestPosts.length === 1) {
      return `${baseClasses} mx-auto max-w-[475px] grid-cols-1`;
    } else if (latestPosts.length === 2) {
      return `${baseClasses} mx-auto max-w-4xl grid-cols-1 md:grid-cols-2`;
    } else {
      return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
    }
  }, [latestPosts.length]);

  // HACK: for loading posts if there are 3 add this:
  // /* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> */

  return (
    <div className="mb-12">
      {loading ? (
        <div className="grid gap-8 mx-auto max-w-[475px] grid-cols-1">
          {LOADING_POSTS.map((post) => (
            <div key={post.slug}>
              <BlogCard post={post} isLoadingCard={true} />
            </div>
          ))}
        </div>
      ) : latestPosts.length > 0 ? (
        <div className={gridClassName}>
          {latestPosts.map((post, index) => (
            <div
              key={post.slug}
              className={
                latestPosts.length === 3 && index === 2
                  ? "md:col-span-2 md:mx-auto md:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none"
                  : ""
              }
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-slate-400">No blog posts available yet.</p>
        </div>
      )}
    </div>
  );
};
