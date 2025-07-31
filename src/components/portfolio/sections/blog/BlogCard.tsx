"use client";

import { memo, useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import { cardVariants } from "@data/portfolio/animations";
import { Post } from "@lib/blog";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardFooter } from "@ui/card";
import { format } from "date-fns";
import { m } from "framer-motion";

const CardWrapper = ({
  children,
  isLoading,
  href,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  href: string;
}) => {
  if (isLoading) {
    return <div className="block h-full cursor-default">{children}</div>;
  }
  return (
    <Link href={href} className="block h-full">
      {children}
    </Link>
  );
};

/**
 * BlogCard component displays a single blog post card.
 */
export const BlogCard = memo(
  ({
    post,
    index,
    isInView,
    isLoadingCard = false,
  }: {
    post: Post;
    index: number;
    isInView: boolean;
    isLoadingCard?: boolean;
  }) => {
    const formattedDate = useMemo(
      () => format(new Date(post.frontmatter.date), "MMM d, yyyy"),
      [post.frontmatter.date]
    );

    const visibleTags = useMemo(
      () => post.frontmatter.tags.slice(0, 3),
      [post.frontmatter.tags]
    );
    const remainingTagsCount = useMemo(
      () => Math.max(0, post.frontmatter.tags.length - 3),
      [post.frontmatter.tags.length]
    );

    return (
      <m.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={index}
        whileHover="hover"
        className="group relative z-50 h-full"
      >
        <CardWrapper isLoading={isLoadingCard} href={`/blog/${post.slug}`}>
          <Card className="border-slate-740 hover:border-cyan-590 relative flex h-full flex-col overflow-hidden bg-transparent transition-all duration-300 ease-out hover:shadow-lg hover:shadow-cyan-500/10">
            {/* Background layers */}
            <div className="absolute inset-0 z-0">
              <div className="h-54 bg-slate-900/30"></div>
              <div className="h-[calc(100%-12rem)] bg-slate-800/30"></div>
              <div className="h-12 bg-slate-900/30"></div>
            </div>

            {/* Card content */}
            <div className="relative z-[5] flex h-full flex-col">
              {/* Image section */}
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-900/30 p-4">
                {post.frontmatter.image ? (
                  <Image
                    width={600}
                    height={350}
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-105"
                    style={{
                      maxWidth: "82%",
                      maxHeight: "82%",
                      minWidth: "50%",
                      minHeight: "50%",
                    }}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-slate-800/50">
                    <IconExternalLink size={32} className="text-slate-400" />
                  </div>
                )}

                {post.frontmatter.featured && (
                  <Badge
                    className="absolute top-3 left-3 border-0 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 text-xs font-medium text-white shadow-md"
                    variant="secondary"
                  >
                    <span className="flex h-5 items-center gap-1">
                      <IconStar className="mb-0.25" size={16} /> Featured
                    </span>
                  </Badge>
                )}
              </div>

              {/* Content section */}
              <CardContent className="flex min-h-[180px] flex-grow flex-col p-6">
                <h3 className="mb-3 line-clamp-2 h-[3.5rem] text-xl leading-7 font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {post.frontmatter.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-grow text-slate-300">
                  {post.frontmatter.description}
                </p>

                {/* Meta information */}
                <div className="mb-4 flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <IconCalendar size={14} />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconClock size={14} />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-770 bg-slate-840 text-xs text-slate-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {remainingTagsCount > 0 && (
                    <Badge
                      variant="outline"
                      className="border-slate-770 bg-slate-840 text-xs text-slate-400"
                    >
                      +{remainingTagsCount}
                    </Badge>
                  )}
                </div>
              </CardContent>

              {/* Footer */}
              <CardFooter className="border-slate-740 mt-auto border-t p-5">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
                    Read Article
                  </span>
                  <IconArrowRight
                    size={16}
                    className="text-cyan-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
                </div>
              </CardFooter>
            </div>
          </Card>
        </CardWrapper>
      </m.div>
    );
  }
);

BlogCard.displayName = "BlogCard";
