"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@ui/button";
import { IconArrowRight } from "@tabler/icons-react";

export const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="blog"
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95))",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Blog
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Thoughts, tutorials, and insights on software development, DevOps,
            and technology. Here I share what I've learned along my journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <Link href="/blog" passHref>
            <Button className="group relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-6 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Visit My Blog
                <IconArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
