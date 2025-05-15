"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@ui/button";

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
    const getButtonStyles = useCallback(
      (
        category: string
      ): { variant: "default" | "ghost"; className: string } => {
        const isActive = activeCategory === category;
        return {
          variant: isActive ? "default" : "ghost",
          className: isActive
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md cursor-pointer"
            : "text-slate-400 hover:bg-slate-800/70 hover:text-white cursor-pointer",
        };
      },
      [activeCategory]
    );

    return (
      <motion.div
        initial={ANIMATION_VARIANTS.hidden}
        animate={
          isInView ? ANIMATION_VARIANTS.visible : ANIMATION_VARIANTS.hidden
        }
        transition={ANIMATION_TRANSITION}
        className="mb-12 flex flex-wrap justify-center gap-3"
      >
        <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-slate-800/50 bg-slate-900/50 p-1.5 shadow-lg backdrop-blur-sm">
          {filterCategories.map((category) => {
            const buttonStyles = getButtonStyles(category);
            return (
              <Button
                key={category}
                variant={buttonStyles.variant}
                className={buttonStyles.className}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </motion.div>
    );
  }
);
