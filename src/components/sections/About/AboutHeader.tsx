"use client";

import { motion } from "framer-motion";
import { AboutMe } from "@data/about";

interface AboutHeaderProps {
  isInView: boolean;
}

/**
 * AboutHeader component that displays the header for the "About Me" section.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const AboutHeader = ({ isInView }: AboutHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="mb-20 text-center"
    >
      <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
        About Me
      </h2>
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>

      <div className="mx-auto max-w-3xl">
        <AboutMe />
      </div>
    </motion.div>
  );
};
