"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useBackToTop } from "@hooks/blog/useBackToTop";

export const BackToTopButton = () => {
  const { showBackToTop, scrollToTop } = useBackToTop();

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: showBackToTop ? 1 : 0,
        scale: showBackToTop ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="border-slate-750 bg-slate-880 hover:border-cyan-590 hover:bg-slate-890 focus:ring-cyan-590 fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border text-slate-300 shadow-lg transition-all duration-300 hover:text-cyan-400 hover:shadow-xl focus:ring-2 focus:outline-none sm:h-14 sm:w-14"
      aria-label="Back to top"
    >
      <IconArrowUp size={20} className="sm:h-6 sm:w-6" />
    </motion.button>
  );
};
