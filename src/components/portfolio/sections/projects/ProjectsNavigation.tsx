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
}

export const ProjectsNavigation = memo(
  ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
  }: ProjectsNavigationProps) => {
    // Ensure totalPages is at least 1
    const pages = Math.max(totalPages, 1);
    const isPrevDisabled = totalPages <= 1 || currentPage === 0;
    const isNextDisabled = totalPages <= 1 || currentPage >= totalPages - 1;

    return (
      <div className="mt-12 flex items-center justify-center gap-4">
        <motion.div
          whileHover={!isPrevDisabled ? "hover" : ""}
          whileTap={!isPrevDisabled ? "tap" : ""}
          variants={navigationButtonVariants}
          className="flex-shrink-0"
        >
          <Button
            onClick={onPrevPage}
            className="bg-slate-850 hover:bg-slate-790 disabled:bg-slate-980 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-100 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Previous page"
            disabled={isPrevDisabled}
          >
            <IconChevronLeft
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </motion.div>

        <div className="min-w-[2rem] flex-shrink-0 text-center text-sm text-slate-400 sm:text-sm md:text-sm">
          <span className="font-mono font-medium text-cyan-400">
            {currentPage + 1}
          </span>
          <span className="font-mono font-medium"> / {pages}</span>
        </div>

        <motion.div
          whileHover={!isNextDisabled ? "hover" : ""}
          whileTap={!isNextDisabled ? "tap" : ""}
          variants={navigationButtonVariants}
          className="flex-shrink-0"
        >
          <Button
            onClick={onNextPage}
            className="bg-slate-850 hover:bg-slate-790 disabled:bg-slate-980 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-100 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Next page"
            disabled={isNextDisabled}
          >
            <IconChevronRight
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </motion.div>
      </div>
    );
  }
);

ProjectsNavigation.displayName = "ProjectsNavigation";
