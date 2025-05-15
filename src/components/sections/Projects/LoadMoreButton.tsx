"use client";

import { Button } from "@ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { buttonVariants } from "./animations";

interface LoadMoreButtonProps {
  isInView: boolean;
  handleLoadMoreAction: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const LoadMoreButton = ({
  isInView,
  handleLoadMoreAction,
  disabled = false,
  isLoading = false,
}: LoadMoreButtonProps) => {
  return (
    <motion.div
      className="mt-16 text-center"
      variants={buttonVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Button
        onClick={handleLoadMoreAction}
        disabled={disabled || isLoading}
        className={`group relative cursor-pointer overflow-hidden rounded-full px-6 py-3 text-white transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500 opacity-70"
            : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/20"
        }`}
        size="lg"
      >
        <span className="relative z-10 flex items-center gap-2 font-medium">
          {disabled
            ? "No More Projects"
            : isLoading
              ? "Loading..."
              : "View More Projects"}
          {!isLoading && (
            <IconChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                !disabled ? "group-hover:translate-y-1" : ""
              }`}
            />
          )}
        </span>
        <span
          className={`absolute inset-0 -z-10 ${
            disabled
              ? "bg-gradient-to-r from-gray-500 to-gray-600 opacity-0"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          }`}
        ></span>
      </Button>
    </motion.div>
  );
};
