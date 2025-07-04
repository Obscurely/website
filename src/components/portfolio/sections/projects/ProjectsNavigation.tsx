"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { navigationButtonVariants } from "./animations";

interface ProjectsNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isInView: boolean;
}

export const ProjectsNavigation = memo(
  ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    isInView,
  }: ProjectsNavigationProps) => {
    // Ensure totalPages is at least 1
    const pages = Math.max(totalPages, 1);

    return (
      <motion.div
        className="mt-12 flex items-center justify-center gap-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={navigationButtonVariants}
      >
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={navigationButtonVariants}
        >
          <Button
            onClick={onPrevPage}
            className="bg-slate-850 hover:bg-slate-790 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg will-change-transform sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Previous page"
            disabled={totalPages <= 1 || currentPage === 0}
          >
            <IconChevronLeft
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </motion.div>

        <div className="text-sm text-slate-400 sm:text-sm md:text-sm">
          <span className="font-medium text-cyan-400">{currentPage + 1}</span>
          <span> / {pages}</span>
        </div>

        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={navigationButtonVariants}
        >
          <Button
            onClick={onNextPage}
            className="bg-slate-850 hover:bg-slate-790 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg will-change-transform sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Next page"
            disabled={totalPages <= 1 || currentPage >= totalPages - 1}
          >
            <IconChevronRight
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </motion.div>
      </motion.div>
    );
  }
);

ProjectsNavigation.displayName = "ProjectsNavigation";
