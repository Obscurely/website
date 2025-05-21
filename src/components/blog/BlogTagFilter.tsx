"use client";

import { motion } from "framer-motion";
import { Badge } from "@ui/badge";

interface BlogTagFilterProps {
  tags: string[];
  selectedTag: string | null;
  setSelectedTagAction: (tag: string | null) => void;
  isInView: boolean;
}

export function BlogTagFilter({
  tags,
  selectedTag,
  setSelectedTagAction: setSelectedTag,
  isInView,
}: BlogTagFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap gap-2"
    >
      <Badge
        key="all"
        variant="outline"
        className={`cursor-pointer border-slate-700/50 px-3 py-1 text-sm transition-all hover:border-cyan-500/50 ${
          selectedTag === null
            ? "border-cyan-500/50 bg-slate-800/70 text-cyan-400"
            : "bg-slate-800/30 text-slate-300"
        }`}
        onClick={() => setSelectedTag(null)}
      >
        All
      </Badge>

      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className={`cursor-pointer border-slate-700/50 px-3 py-1 text-sm transition-all hover:border-cyan-500/50 ${
            selectedTag === tag
              ? "border-cyan-500/50 bg-slate-800/70 text-cyan-400"
              : "bg-slate-800/30 text-slate-300"
          }`}
          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
        >
          {tag}
        </Badge>
      ))}
    </motion.div>
  );
}
