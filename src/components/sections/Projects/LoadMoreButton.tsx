"use client";

import { motion } from "framer-motion";
import { Button } from "@ui/button";
import { IconChevronDown } from "@tabler/icons-react";

interface LoadMoreButtonProps {
  isInView: boolean;
  handleLoadMoreAction: () => void;
}

export const LoadMoreButton = ({
  isInView,
  handleLoadMoreAction,
}: LoadMoreButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-16 text-center"
    >
      <Button
        onClick={handleLoadMoreAction}
        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 px-6 py-3 text-white shadow-lg transition-all hover:shadow-cyan-500/20"
        size="lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          View More Projects
          <IconChevronDown
            size={18}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      </Button>
    </motion.div>
  );
};
