"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MDXPost } from "@lib/blog";
import { Badge } from "@ui/badge";
import {
  IconCalendar,
  IconClock,
  IconArrowLeft,
  IconShare,
  IconArrowUp,
  IconCoffee,
} from "@tabler/icons-react";
import { Comments } from "./Comments";
import { Button } from "@ui/button";
import { useSidebarPositioning } from "@hooks/blog/useSidebarPositioning";
import { useBackToTop } from "@hooks/blog/useBackToTop";
import { usePostPage } from "@hooks/blog/usePostPage";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface PostPageProps {
  post: MDXPost;
}

/**
 * PostPage component displays a single blog post with its content, metadata, and comments.
 */
export function PostPage({ post }: PostPageProps) {
  const { sidebarState, sidebarWidth, sidebarRef, footerRef } =
    useSidebarPositioning();
  const { showBackToTop, scrollToTop } = useBackToTop();
  const { initialWidth, shareState, isMobile, handleShare } =
    usePostPage(sidebarWidth);

  // Memoized calculations
  const formattedDate = useMemo(
    () => format(new Date(post.frontmatter.date), "MMMM d, yyyy"),
    [post.frontmatter.date]
  );

  return (
    <section className="relative overflow-hidden py-20 pt-26">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to blog button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog" className="inline-block">
            <Button
              variant="link"
              className="group inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-slate-300 transition-all duration-300 hover:text-white"
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to all posts
              </span>
            </Button>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Article Header - shows first on mobile, part of main content on desktop */}
          <Header
            post={post}
            formattedDate={formattedDate}
            handleShareAction={handleShare}
            shareState={shareState}
          />

          {/* Sidebar - shows after image on mobile, right side on desktop */}
          <Sidebar
            post={post}
            sidebarState={sidebarState}
            sidebarWidth={sidebarWidth}
            initialWidth={initialWidth}
            isMobile={isMobile}
            sidebarRef={sidebarRef}
          />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-3 lg:order-1 lg:col-span-3"
          >
            <article className="prose prose-invert prose-slate prose-lg prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-cyan-300 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-slate-970 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:shadow-lg prose-code:rounded prose-code:bg-slate-970 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-2xl prose-hr:border-slate-700 max-w-none">
              {/* Header - only visible on desktop */}
              <header className="not-prose mb-12 hidden lg:block">
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.frontmatter.featured && (
                    <Badge
                      variant="outline"
                      className="border-cyan-460 bg-cyan-510 hover:bg-cyan-520 text-xs font-medium text-cyan-300"
                    >
                      Featured
                    </Badge>
                  )}
                  {post.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-650 bg-slate-730 hover:border-slate-570 hover:bg-slate-640 px-3 py-1 text-slate-300 transition-colors hover:shadow-slate-500/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-6 bg-gradient-to-r bg-clip-text text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
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
                    <a
                      href="https://ko-fi.com/Obscurely"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="border-slate-750 bg-slate-830 hover:border-cyan-590 hover:bg-slate-850 z-50 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:text-cyan-400 hover:shadow-md">
                        <IconCoffee size={18} />
                        <span className="hidden sm:inline">Coffee</span>
                      </Button>
                    </a>
                    <Button
                      onClick={handleShare}
                      className="border-slate-750 bg-slate-830 hover:border-cyan-590 hover:bg-slate-850 z-50 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:text-cyan-400 hover:shadow-md"
                    >
                      <IconShare size={18} />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>

                {post.frontmatter.image && (
                  <div className="relative mb-12 flex justify-center">
                    <div className="overflow-visible rounded-2xl">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={400}
                        height={300}
                        className="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
                        priority
                      />
                    </div>
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 min-h-[430px] sm:min-h-[650px]"
            >
              {/* Wrapper - hidden on mobile, visible on larger screens */}
              <div className="border-slate-730 bg-slate-980 mb-8 hidden rounded-2xl border p-8 sm:block">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  Join the Discussion
                </h2>
                <p className="mb-6 text-slate-400">
                  Share your thoughts or provide feedback to help make these
                  posts better!
                </p>
                <Comments />
              </div>

              {/* Direct comments for mobile - visible only on small screens */}
              <div className="block min-h-[500px] sm:hidden">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  Join the Discussion
                </h2>
                <Comments />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="border-slate-750 bg-slate-880 hover:border-cyan-590 hover:bg-slate-890 focus:ring-cyan-590 fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border text-slate-300 shadow-lg transition-all duration-300 hover:text-cyan-400 hover:shadow-xl focus:ring-2 focus:outline-none sm:h-14 sm:w-14"
        aria-label="Back to top"
      >
        <IconArrowUp size={20} className="sm:h-6 sm:w-6" />
      </motion.button>

      {/* Hidden footer ref for positioning calculations */}
      <div ref={footerRef} className="absolute bottom-0 h-0 w-full" />
    </section>
  );
}
