"use client";

import Image from "next/image";
import Link from "next/link";

import { Post } from "@lib/blog";
import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import { Badge } from "@ui/badge";
import { format } from "date-fns";

interface PostRowProps {
  post: Post;
}

/**
 * PostRow component displays a single blog post in a row format.
 */
export function PostRow({ post }: PostRowProps) {
  const formattedDate = format(new Date(post.frontmatter.date), "MMMM d, yyyy");

  return (
    <div className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <article className="border-slate-730 bg-slate-830 hover:border-cyan-590 relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            {post.frontmatter.image && (
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden md:h-auto md:w-1/3 md:pl-4 xl:pl-0">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={0}
                  height={0}
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                />
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
                      className="border-cyan-460 bg-cyan-510 hover:bg-cyan-520 text-xs font-medium text-cyan-300"
                    >
                      Featured
                    </Badge>
                  )}
                  {post.frontmatter.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-650 bg-slate-730 hover:border-slate-570 hover:bg-slate-640 text-xs font-medium text-slate-300 transition-colors duration-200 hover:shadow-slate-500/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.frontmatter.tags.length > 4 && (
                    <Badge
                      variant="outline"
                      className="border-slate-650 bg-slate-730 hover:border-slate-570 hover:bg-slate-640 text-xs text-slate-400 transition-colors duration-200 hover:shadow-slate-500/10"
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
    </div>
  );
}
