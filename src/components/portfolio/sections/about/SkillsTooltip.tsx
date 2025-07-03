"use client";

import { IconClick } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

/**
 * SkillsTooltip component that provides a tooltip with information about the skills section.
 */
export const SkillsTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center text-sm text-slate-400">
            <IconClick size={12} className="mr-1 animate-pulse" />
            Tap for details
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="border-slate-630 max-w-[250px] rounded-lg border bg-gradient-to-b from-[#1e2a3e] to-[#0f182c] px-4 py-3 text-sm shadow-lg transition-all duration-200"
          sideOffset={2}
        >
          <div className="mb-1 font-medium text-cyan-400">Skill Details</div>
          <div className="leading-relaxed text-slate-300">
            Click any skill to see description, proficiency and projects
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
