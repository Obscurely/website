"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MDXPost } from "@lib/blog";
import { getTableOfContents } from "@lib/blogToc";
import { Badge } from "@ui/badge";
import {
  IconCalendar,
  IconClock,
  IconArrowLeft,
  IconShare,
} from "@tabler/icons-react";
import { TableOfContents } from "./TableOfContents";
import { Comments } from "./Comments";

interface PostPageProps {
  post: MDXPost;
}

/**
 * PostPage component displays a single blog post with its content, metadata, and comments.
 */
export function PostPage({ post }: PostPageProps) {
  const [isInView, setIsInView] = useState(false);
  const formattedDate = format(new Date(post.frontmatter.date), "MMMM d, yyyy");
  const toc = getTableOfContents(post.content);

  useEffect(() => {
    setIsInView(true);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: Replace with a toast notification
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400"
          >
            <IconArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to all posts</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <article className="prose prose-invert prose-slate prose-lg prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-cyan-300 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:shadow-lg prose-code:rounded prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-2xl prose-hr:border-slate-700 max-w-none">
              {/* Header */}
              <header className="not-prose mb-12">
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-600/50 bg-slate-800/40 px-3 py-1 text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-5xl lg:text-6xl">
                  {post.frontmatter.title}
                </h1>

                <p className="mb-8 text-xl leading-relaxed text-slate-400">
                  {post.frontmatter.description}
                </p>

                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <IconCalendar size={18} className="text-cyan-400" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock size={18} className="text-cyan-400" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400"
                    >
                      <IconShare size={18} />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>

                {post.frontmatter.image && (
                  <div className="relative mb-12 overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-video w-full">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>
                )}
              </header>

              {/* MDX Content */}
              <div className="mdx-content space-y-8">{post.mdxContent}</div>
            </article>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20"
            >
              <div className="mb-8 rounded-2xl border border-slate-700/30 bg-slate-800/20 p-8">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  Join the Discussion
                </h2>
                <p className="mb-6 text-slate-400">
                  Share your thoughts or provide feedback to help make these
                  posts better!
                </p>
                <Comments />
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="sticky top-32 space-y-8">
              <TableOfContents toc={toc} />

              <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  About the Author
                </h3>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src="/profile.webp"
                      alt="Adrian Crîșmaruc"
                      width={60}
                      height={60}
                      className="rounded-full ring-2 ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Adrian Crîșmaruc
                    </h4>
                    <p className="text-sm text-slate-400">
                      Full-Stack Developer
                    </p>
                    <p className="text-sm text-slate-400">
                      Founder of RekoSearch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
