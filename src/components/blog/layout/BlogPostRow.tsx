"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@lib/blog";
import { Badge } from "@ui/badge";
import { IconCalendar, IconClock } from "@tabler/icons-react";

interface BlogPostRowProps {
  post: Post;
  index: number;
  isInView: boolean;
}

export function BlogPostRow({ post, index, isInView }: BlogPostRowProps) {
  const formattedDate = format(new Date(post.frontmatter.date), "MMMM d, yyyy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/20 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex flex-col md:flex-row">
            {post.frontmatter.image && (
              <div className="relative h-48 w-full md:h-auto md:w-1/3">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex flex-wrap gap-2">
                {post.frontmatter.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-slate-700/70 bg-slate-800/30 text-slate-300"
                  >
                    {tag}
                  </Badge>
                ))}

                {post.frontmatter.featured && (
                  <Badge
                    variant="outline"
                    className="border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                  >
                    Featured
                  </Badge>
                )}
              </div>

              <h2 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                {post.frontmatter.title}
              </h2>

              <p className="mb-4 text-slate-300">
                {post.frontmatter.description}
              </p>

              <div className="mt-auto flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <IconCalendar size={16} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconClock size={16} />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
