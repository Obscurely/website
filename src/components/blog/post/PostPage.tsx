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

  return (
    <section className="relative overflow-hidden py-20 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-cyan-400"
          >
            <IconArrowLeft size={16} />
            <span>Back to all posts</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <article className="prose prose-invert prose-slate prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-cyan-300 prose-blockquote:border-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:not-italic prose-code:text-cyan-400 prose-pre:bg-slate-900 prose-pre:shadow-md prose-img:rounded-lg prose-img:shadow-lg max-w-none">
              {/* Header */}
              <header className="not-prose mb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-700/70 bg-slate-800/30 text-slate-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {post.frontmatter.title}
                </h1>

                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <IconCalendar size={16} />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconClock size={16} />
                    <span>{post.readingTime}</span>
                  </div>
                  <button
                    className="ml-auto flex items-center gap-1 rounded-md border border-slate-700/50 bg-slate-800/30 px-3 py-1 text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-400"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                  >
                    <IconShare size={16} />
                    <span>Share</span>
                  </button>
                </div>

                {post.frontmatter.image && (
                  <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-96">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </header>

              {/* MDX Content */}
              <div className="mdx-content">{post.mdxContent}</div>
            </article>

            {/* Comments */}
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-white">Comments</h2>
              <Comments />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <TableOfContents toc={toc} />

              <div className="mt-8 rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  About the Author
                </h3>
                <div className="flex items-center gap-4">
                  <Image
                    src="/profile.webp"
                    alt="Adrian Crîșmaruc"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-white">Adrian Crîșmaruc</h4>
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
