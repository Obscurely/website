"use client";

import { motion } from "framer-motion";

interface BlogHeaderProps {
  isInView: boolean;
}

export function BlogHeader({ isInView }: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="mb-16 text-center"
    >
      <h1 className="mb-2 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
        Blog
      </h1>
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <p className="mx-auto max-w-3xl text-lg text-slate-400">
        Practical tutorials, in-depth guides and insights on software
        development, Linux, servers and more.
      </p>
    </motion.div>
  );
}
