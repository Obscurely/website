"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

/**
 * Animated line that gets drawn under the name in the hero section.
 */
export const UnderNameLine = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        initial={{ width: 0 }}
        animate={{ width: "6rem" }} // 6rem = 96 px
        transition={{ delay: 0, duration: 0.6 }}
      />
    </LazyMotion>
  );
};
