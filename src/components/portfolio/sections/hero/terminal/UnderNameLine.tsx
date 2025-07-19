"use client";

import { motion } from "framer-motion";

export const UnderNameLine = () => {
  return (
    <motion.div
      className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
      initial={{ width: 0 }}
      animate={{ width: "6rem" }} // 6rem = 96 px
      transition={{ delay: 0, duration: 0.6 }}
    />
  );
};
