"use client";

import { useCallback } from "react";

import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "@ui/button";

/**
 * ScrollToTop component that renders a button to scroll the page to the top.
 */
export const ScrollToTop = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={scrollToTop}
      className="group border-slate-740 bg-slate-820 hover:border-cyan-590 hover:bg-slate-740 relative cursor-pointer rounded-full border text-slate-400 transition-all duration-300 hover:text-cyan-400"
    >
      <IconArrowUp size={18} />
    </Button>
  );
};
