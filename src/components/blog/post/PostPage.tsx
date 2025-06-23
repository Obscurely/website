"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
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
  IconArrowUp,
  IconCoffee,
  IconCheck,
} from "@tabler/icons-react";
import { TableOfContents } from "./TableOfContents";
import { Comments } from "./Comments";
import { Button } from "@ui/button";
import { toast } from "sonner";
import { useSidebarPositioning } from "@hooks/blog/useSidebarPositioning";
import { useBackToTop } from "@hooks/blog/useBackToTop";
import { Separator } from "../mdx";

interface PostPageProps {
  post: MDXPost;
}

const SIDEBAR_CLASSES = {
  base: "space-y-8 overflow-y-auto pb-4 transform-gpu",
} as const;

// variants for sidebar states
const sidebarVariants: Variants = {
  initial: {
    position: "sticky" as const,
    top: "8rem",
    zIndex: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      opacity: { duration: 0.2 },
    },
  },
  fixed: {
    position: "fixed" as const,
    top: "7.5rem",
    zIndex: 40,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.2 },
    },
  },
  bottom: {
    position: "fixed" as const,
    top: "7.5rem",
    zIndex: 40,
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.3 },
      y: { duration: 0.3 },
    },
  },
  mobile: {
    position: "static" as const,
    top: "auto",
    zIndex: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.2 },
    },
  },
};

/**
 * PostPage component displays a single blog post with its content, metadata, and comments.
 */
export function PostPage({ post }: PostPageProps) {
  const [isInView, setIsInView] = useState(false);
  const [initialWidth, setInitialWidth] = useState<number | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarState, sidebarWidth, sidebarRef, footerRef } =
    useSidebarPositioning();
  const { showBackToTop, scrollToTop } = useBackToTop();

  // Memoized calculations
  const formattedDate = useMemo(
    () => format(new Date(post.frontmatter.date), "MMMM d, yyyy"),
    [post.frontmatter.date]
  );

  const toc = useMemo(() => getTableOfContents(post.content), [post.content]);

  useEffect(() => {
    setIsInView(true);
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Capture initial width to prevent flickering
  useEffect(() => {
    if (sidebarWidth > 0 && initialWidth === null) {
      setInitialWidth(sidebarWidth);
    }
  }, [sidebarWidth, initialWidth]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Execute copy command
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setShareState("copied");
      toast.success("Link copied to clipboard!");
      setTimeout(() => setShareState("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      setShareState("error");
      toast.error("Failed to copy link. Please try again.");
      setTimeout(() => setShareState("idle"), 2000);
    }
  }, []);

  // Memoized sidebar styling with consistent width
  const getSidebarStyles = useMemo(() => {
    const effectiveWidth = initialWidth || sidebarWidth;

    const baseStyles = {
      maxHeight: isMobile
        ? "auto"
        : sidebarState === "fixed"
          ? "calc(100vh - 8rem)"
          : "calc(100vh - 10rem)",
      // Always maintain consistent width to prevent flickering on desktop
      width: !isMobile && effectiveWidth > 0 ? `${effectiveWidth}px` : "auto",
      minWidth:
        !isMobile && effectiveWidth > 0 ? `${effectiveWidth}px` : "auto",
    };

    return baseStyles;
  }, [sidebarState, sidebarWidth, initialWidth, isMobile]);

  // Determine sidebar animation state
  const currentSidebarState = isMobile ? "mobile" : sidebarState;

  return (
    <section className="relative overflow-hidden bg-slate-900/80 py-20 pt-26">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="inline-block">
            <Button
              variant="link"
              className="group inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border-cyan-500/20 px-4 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500/50 hover:text-white"
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to all posts
              </span>
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Article Header - shows first on mobile, part of main content on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:hidden"
          >
            <header className="not-prose mb-8">
              <div className="mb-6 flex flex-wrap gap-2">
                {post.frontmatter.featured && (
                  <Badge
                    variant="outline"
                    className="border-cyan-400/60 bg-cyan-500/20 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30"
                  >
                    Featured
                  </Badge>
                )}
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
                    <Button className="z-50 flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400 hover:shadow-md">
                      <IconCoffee size={18} />
                      <span className="hidden sm:inline">Coffee</span>
                    </Button>
                  </a>
                  <Button
                    onClick={handleShare}
                    className="z-50 flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400 hover:shadow-md"
                  >
                    {shareState === "copied" ? (
                      <IconCheck size={18} className="text-green-400" />
                    ) : (
                      <IconShare size={18} />
                    )}
                    <span className="hidden sm:inline">
                      {shareState === "copied" ? "Copied!" : "Share"}
                    </span>
                  </Button>
                </div>
              </div>

              {post.frontmatter.image && (
                <div className="relative mb-8 flex justify-center">
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
          </motion.div>

          {/* Sidebar - shows after image on mobile, right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="order-2 lg:order-2 lg:col-span-1"
          >
            <motion.div
              ref={sidebarRef}
              className={`${SIDEBAR_CLASSES.base} ${isMobile ? "mb-0" : ""}`}
              variants={sidebarVariants}
              animate={currentSidebarState}
              style={{
                ...getSidebarStyles,
                transform: "translateZ(0)", // Force hardware acceleration
                backfaceVisibility: "hidden", // Prevent flickering
                WebkitFontSmoothing: "antialiased", // Improve text rendering
                MozOsxFontSmoothing: "grayscale", // Improve text rendering on macOS
              }}
              layout="position"
              layoutRoot
            >
              <TableOfContents toc={toc} />

              <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-6">
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
                    <h4 className="mb-1 font-semibold text-white">
                      Adrian Crîșmaruc
                    </h4>
                    <div className="mb-0 flex items-center gap-1 text-sm text-slate-300">
                      <span>Full-Stack Developer</span>
                    </div>
                    <p className="mb-0 text-center text-sm text-slate-400">
                      Founder of{" "}
                      <a
                        href="https://rekosearch.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 not-italic transition-colors hover:text-cyan-300"
                      >
                        RekoSearch
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="lg:hidden">
              <Separator />
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-3 lg:order-1 lg:col-span-3"
          >
            <article className="prose prose-invert prose-slate prose-lg prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-cyan-300 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:shadow-lg prose-code:rounded prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-2xl prose-hr:border-slate-700 max-w-none">
              {/* Header - only visible on desktop */}
              <header className="not-prose mb-12 hidden lg:block">
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.frontmatter.featured && (
                    <Badge
                      variant="outline"
                      className="border-cyan-400/60 bg-cyan-500/20 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30"
                    >
                      Featured
                    </Badge>
                  )}
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
                      <Button className="z-50 flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400 hover:shadow-md">
                        <IconCoffee size={18} />
                        <span className="hidden sm:inline">Coffee</span>
                      </Button>
                    </a>
                    <Button
                      onClick={handleShare}
                      className="z-50 flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-cyan-400 hover:shadow-md"
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
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20 min-h-[430px]"
            >
              {/* Wrapper - hidden on mobile, visible on larger screens */}
              <div className="mb-8 hidden rounded-2xl border border-slate-700/30 bg-slate-800/20 p-8 sm:block">
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
        className="fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/80 text-slate-300 shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:text-cyan-400 hover:shadow-xl focus:ring-2 focus:ring-cyan-500/50 focus:outline-none sm:h-14 sm:w-14"
        aria-label="Back to top"
      >
        <IconArrowUp size={20} className="sm:h-6 sm:w-6" />
      </motion.button>

      {/* Hidden footer ref for positioning calculations */}
      <div ref={footerRef} className="absolute bottom-0 h-0 w-full" />
    </section>
  );
}
