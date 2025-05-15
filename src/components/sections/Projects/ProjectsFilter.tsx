"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { categoriesDisplay } from "@data/projects";

interface ProjectsFilterProps {
  filterCategories: string[];
  activeCategory: string;
  handleCategoryChangeAction: (category: string) => void;
  isInView: boolean;
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ANIMATION_TRANSITION = { delay: 0.2, duration: 0.4 };

export const ProjectsFilter = memo(
  ({
    filterCategories,
    activeCategory,
    handleCategoryChangeAction: onCategoryChange,
    isInView,
  }: ProjectsFilterProps) => {
    return (
      <motion.div
        initial={ANIMATION_VARIANTS.hidden}
        animate={
          isInView ? ANIMATION_VARIANTS.visible : ANIMATION_VARIANTS.hidden
        }
        transition={ANIMATION_TRANSITION}
        className="mb-12 flex flex-wrap justify-center gap-3"
      >
        <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-slate-700/30 bg-slate-800/40 p-1.5 shadow-lg backdrop-blur-sm">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
                activeCategory === category ? "text-white" : "text-slate-300"
              } transition-all duration-200 hover:text-white`}
            >
              <span className="flex items-center justify-center">
                {categoriesDisplay[category] || category}
              </span>
              {activeCategory === category && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }
);
