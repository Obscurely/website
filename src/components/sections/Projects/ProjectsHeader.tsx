"use client";

import { motion } from "framer-motion";

interface ProjectsHeaderProps {
  isInView: boolean;
}

export const ProjectsHeader = ({ isInView }: ProjectsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="mb-16 text-center"
    >
      <h2 className="mb-2 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
        My Projects
      </h2>
      <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <p className="mx-auto max-w-3xl text-lg text-slate-400">
        Here are some of the projects I've made. Each project posed a new
        challenge and showcases my different skills and knowledge.
      </p>
    </motion.div>
  );
};
