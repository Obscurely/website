"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@lib/blog";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";
import { IconCalendar, IconClock } from "@tabler/icons-react";

interface BlogPostCardProps {
  post: Post;
  index: number;
  isInView: boolean;
}

export function BlogPostCard({ post, index, isInView }: BlogPostCardProps) {
  const formattedDate = format(new Date(post.frontmatter.date), "MMMM d, yyyy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-slate-700/50 bg-slate-800/20 transition-all duration-300 hover:translate-y-[-2px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          {post.frontmatter.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <CardContent className="flex h-full flex-col p-6">
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
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
