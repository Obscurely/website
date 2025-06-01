"use client";

import { motion } from "framer-motion";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@ui/input";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQueryAction: React.Dispatch<React.SetStateAction<string>>;
  isInView: boolean;
  onSearch?: (overrideSearchQuery?: string) => void;
  setDrawerOpen?: (open: boolean) => void; // Optional for mobile drawer
}

export function BlogSearch({
  searchQuery,
  setSearchQueryAction: setSearchQuery,
  isInView,
  onSearch,
  setDrawerOpen, // Optional for mobile drawer
}: BlogSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
      // close drawer on mobile by waiting the results to refresh first
      setTimeout(() => {
        setDrawerOpen?.(false);
      }, 300);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full md:max-w-md"
    >
      <div className="group relative">
        <IconSearch
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-slate-400 transition-colors duration-200 group-focus-within:text-cyan-400 group-hover:text-cyan-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border-slate-700/50 bg-slate-800/30 pr-10 pl-10 text-slate-200 transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600/70 hover:bg-slate-800/50 focus:bg-slate-800/60 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => {
              handleClear();
              if (onSearch) {
                onSearch("");
              }
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-slate-400 transition-colors duration-200 hover:text-slate-200 focus:outline-none"
            aria-label="Clear search"
          >
            <IconX size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
