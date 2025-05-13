"use client";

import { motion } from "framer-motion";
import { Button } from "@ui/button";

interface ProjectsFilterProps {
  filterCategories: string[];
  activeCategory: string;
  handleCategoryChangeAction: (category: string) => void;
  isInView: boolean;
}

export const ProjectsFilter = ({
  filterCategories,
  activeCategory,
  handleCategoryChangeAction,
  isInView,
}: ProjectsFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mb-12 flex flex-wrap justify-center gap-3"
    >
      <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-slate-800/50 bg-slate-900/50 p-1.5 shadow-lg backdrop-blur-sm">
        {filterCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "ghost"}
            className={
              activeCategory === category
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
            }
            onClick={() => handleCategoryChangeAction(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};
