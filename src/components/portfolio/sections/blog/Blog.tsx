"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { getAllPosts, Post } from "@lib/blog";
import { LOADING_POSTS } from "./utils";
import { BlogCard } from "./BlogCard";

/**
 * Blog component that fetches and displays the latest blog posts.
 *
 * @returns The Blog component that displays the latest blog posts.
 */
export const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
      return `${baseClasses} mx-auto max-w-md grid-cols-1`;
    } else if (latestPosts.length === 2) {
      return `${baseClasses} mx-auto max-w-4xl grid-cols-1 md:grid-cols-2`;
    } else {
      return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
    }
  }, [latestPosts.length]);

  return (
    <section
      id="blog"
      ref={ref}
      className="bg-main-bg-light relative z-0 overflow-hidden pt-16 pb-20"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-0.5 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
            Latest Posts
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Practical tutorials, in-depth guides and insights on software
            development, Linux, servers and more.
          </p>
        </motion.div>

        {/* Blog posts grid */}
        <div className="mb-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {LOADING_POSTS.map((post, index) => (
                <div key={post.slug}>
                  <BlogCard post={post} index={index} isInView={isInView} />
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
                  <BlogCard post={post} index={index} isInView={isInView} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-slate-400">
                No blog posts available yet.
              </p>
            </div>
          )}
        </div>

        {/* View all posts button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <Link href="/blog" passHref>
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20">
              <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
                View All Posts
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 will-change-transform group-hover:opacity-100"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
