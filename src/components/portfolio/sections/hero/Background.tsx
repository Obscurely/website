"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export const Background = () => {
  // Use the document as the scroll container instead of a specific element
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    >
      <div className="bg-slate-850 absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
    </motion.div>
  );
};
