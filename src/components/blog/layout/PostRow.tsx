"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@lib/blog";
import { Badge } from "@ui/badge";
import { IconCalendar, IconClock, IconArrowRight } from "@tabler/icons-react";

interface PostRowProps {
  post: Post;
  index: number;
  isInView: boolean;
}

/**
 * PostRow component displays a single blog post in a row format.
 */
export function PostRow({ post, index, isInView }: PostRowProps) {
  const formattedDate = format(new Date(post.frontmatter.date), "MMMM d, yyyy");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * Math.min(index, 5),
        layout: { duration: 0.3 },
      }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <article className="relative overflow-hidden rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-800/40 to-slate-900/40 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            {post.frontmatter.image && (
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden md:h-auto md:w-1/3 md:pl-4 xl:pl-0">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={0}
                  height={0}
                  className="transition-transform duration-300 group-hover:scale-105"
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            )}

            {/* Content Section */}
            <div className="flex flex-1 flex-col justify-between p-6 md:pl-4 xl:pl-0">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h2 className="line-clamp-2 text-xl leading-tight font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                        {post.frontmatter.title}
                      </h2>
                    </div>
                  </div>
                  <IconArrowRight
                    size={20}
                    className="mt-1 flex-shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                  />
                </div>

                <p className="line-clamp-3 leading-relaxed text-slate-300">
                  {post.frontmatter.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 space-y-4">
                {/* Meta Information */}
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <IconCalendar size={16} className="text-slate-500" />
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconClock size={16} className="text-slate-500" />
                    <span className="font-medium">{post.readingTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.featured && (
                    <Badge
                      variant="outline"
                      className="border-cyan-400/60 bg-cyan-500/20 text-xs font-medium text-cyan-300"
                    >
                      Featured
                    </Badge>
                  )}
                  {post.frontmatter.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-600/50 bg-slate-700/30 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-slate-500/70 hover:bg-slate-600/40"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.frontmatter.tags.length > 4 && (
                    <Badge
                      variant="outline"
                      className="border-slate-600/50 bg-slate-700/30 text-xs text-slate-400"
                    >
                      +{post.frontmatter.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
