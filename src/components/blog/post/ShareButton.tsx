"use client";

import { useShare } from "@hooks/blog/useShare";
import { IconShare } from "@tabler/icons-react";
import { Button } from "@ui/button";

export const ShareButton = () => {
  const { handleShare } = useShare();

  return (
    <Button
      onClick={handleShare}
      className="border-slate-750 bg-slate-840 hover:border-cyan-590 hover:bg-slate-850 z-50 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:text-cyan-400 hover:shadow-md"
      aria-label="Share this post"
    >
      <IconShare size={18} />
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
};
