"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import Image from "next/image";

const blogPosts = [
  {
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive layouts using Tailwind CSS utility classes and best practices.",
    image: "/blog1.jpg",
    date: "June 15, 2023",
    readTime: "5 min read",
    category: "CSS",
    url: "/blog/tailwind-responsive-layouts",
  },
  {
    title: "State Management in React: Context API vs. Redux",
    excerpt:
      "A comparison of different state management approaches in React applications and when to use each one.",
    image: "/blog2.jpg",
    date: "May 22, 2023",
    readTime: "8 min read",
    category: "React",
    url: "/blog/react-state-management",
  },
  {
    title: "Optimizing Next.js Applications for Performance",
    excerpt:
      "Practical techniques to improve the performance and user experience of your Next.js applications.",
    image: "/blog3.jpg",
    date: "April 10, 2023",
    readTime: "7 min read",
    category: "Performance",
    url: "/blog/nextjs-performance",
  },
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="blog" ref={ref} className="bg-slate-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Latest Articles
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            I write about web development, design, and technology. Check out my
            latest articles and insights.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex h-full flex-col overflow-hidden border-slate-800 bg-slate-900 transition-all duration-300 hover:border-cyan-500/50">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    width={500}
                    height={300}
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-2 right-2 bg-cyan-500 text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="flex-grow p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <IconCalendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconClock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-200">
                    {post.title}
                  </h3>
                  <p className="text-slate-400">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    variant="ghost"
                    className="p-0 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300"
                    asChild
                  >
                    <a href={post.url} className="flex items-center gap-1">
                      <span>Read Article</span>
                      <IconArrowRight size={16} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button className="bg-slate-800 text-slate-200 hover:bg-slate-700">
            View All Articles
            <IconArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
