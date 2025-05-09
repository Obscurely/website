"use client";

import { motion } from "framer-motion";
import { MyJourney } from "@data/about";

interface AboutJourneyProps {
  isInView: boolean;
}

export default function AboutJourney({ isInView }: AboutJourneyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-6 text-2xl font-bold text-white">My Journey</h3>
      <MyJourney />
    </motion.div>
  );
}
