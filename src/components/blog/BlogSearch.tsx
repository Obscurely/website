"use client";

import { motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@ui/input";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQueryAction: React.Dispatch<React.SetStateAction<string>>;
  isInView: boolean;
}

export function BlogSearch({
  searchQuery,
  setSearchQueryAction: setSearchQuery,
  isInView,
}: BlogSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full md:max-w-md"
    >
      <div className="relative">
        <IconSearch
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-slate-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-slate-700/50 bg-slate-800/30 pl-10 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-cyan-500/20"
        />
      </div>
    </motion.div>
  );
}
