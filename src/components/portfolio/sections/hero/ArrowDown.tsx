"use client";

import { IconArrowDown } from "@tabler/icons-react";
import { Button } from "@ui/button";

/**
 * A button component that scrolls the page to the "About" section
 */
export const ArrowDown = () => {
  return (
    <div
      className="data-[state=show]:animate-in slide-in-from-top-30 repeat-infinite direction-alternate-reverse backdrop-blur-[2px] delay-800 duration-1500"
      data-state="show"
    >
      <Button
        variant="ghost"
        size="icon"
        className="border-slate-630 hover:bg-slate-850 cursor-pointer rounded-full border text-slate-400"
        onClick={() => {
          document
            .querySelector("#about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to About section"
      >
        <IconArrowDown size={20} />
      </Button>
    </div>
  );
};
