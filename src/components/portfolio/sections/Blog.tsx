"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardFooter } from "@ui/card";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import { cardVariants } from "@components/portfolio/sections/projects/animations";
import { getAllPosts, Post } from "@lib/blog";

const createLoadingPost = (index: number): Post => ({
  slug: `loading-${index}`,
  frontmatter: {
    title: "Loading...",
    description:
      "Exercitationem et voluptates possimus adipisci delectus delectus est. Aut non soluta iure similique ab unde. Quas excepturi omnis reiciendis repudiandae labore quam. Eum voluptas ut odio nulla est voluptate. Consequuntur enim voluptatem dolorem blanditiis. ",
    date: "2025-01-01T00:00:00.000Z",
    tags: ["Loading", "Please", "Wait"],
    image: "", // No image for loading state
    featured: false,
  },
  content: "",
  readingTime: "Loading...",
  year: "2025",
});

const BlogCard = ({
  post,
  index,
  isInView,
}: {
  post: Post;
  index: number;
  isInView: boolean;
}) => {
  const formattedDate = format(new Date(post.frontmatter.date), "MMM d, yyyy");

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover="hover"
      className="group relative z-50 h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="relative flex h-full flex-col overflow-hidden border-slate-700/50 bg-transparent transition-all duration-300 ease-out will-change-transform hover:translate-y-[-2px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
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
                {post.frontmatter.tags.slice(0, 3).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-slate-700/70 bg-slate-800/30 text-xs text-slate-300"
                  >
                    {tag}
                  </Badge>
                ))}
                {post.frontmatter.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="border-slate-700/70 bg-slate-800/30 text-xs text-slate-400"
                  >
                    +{post.frontmatter.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="mt-auto border-t border-slate-800/50 bg-slate-900/30 p-4">
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
      </Link>
    </motion.div>
  );
};

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

  // Get latest 3 posts
  const latestPosts = posts.slice(0, 3);

  return (
    <section
      id="blog"
      ref={ref}
      className="relative z-0 overflow-hidden bg-slate-900/80 pt-16 pb-20"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
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
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <BlogCard
                    post={createLoadingPost(index)}
                    index={index}
                    isInView={isInView}
                  />
                </div>
              ))}
            </div>
          ) : latestPosts.length > 0 ? (
            <div
              className={`grid gap-8 ${
                latestPosts.length === 1
                  ? "mx-auto max-w-md grid-cols-1"
                  : latestPosts.length === 2
                    ? "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
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
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
