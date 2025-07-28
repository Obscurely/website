"use client";

import { ComponentProps } from "react";

import { cn } from "@lib/utils";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { IconCheck } from "@tabler/icons-react";

function Checkbox({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        "peer group relative size-5 shrink-0 cursor-pointer rounded-md border-2 transition-transform duration-200 ease-out outline-none",

        // Default state
        "bg-slate-850 border-slate-700 shadow-sm",
        "hover:border-cyan-590 hover:bg-slate-870 hover:translate-y-[-0.5px] hover:shadow-md hover:shadow-cyan-500/10",

        // Checked state
        "data-[state=checked]:border-cyan-500 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500",
        "data-[state=checked]:shadow-md data-[state=checked]:shadow-cyan-500/20",

        // Hover on checked state
        "data-[state=checked]:hover:shadow-cyan-500/30 data-[state=checked]:hover:brightness-110",
        "data-[state=checked]:hover:translate-y-[-0.5px]",

        // Active state
        "active:translate-y-[0px]",

        // Focus state
        "focus-visible:ring-ring/50 focus-visible:ring-2",

        // Invalid state
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",

        // Disabled state
        "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",

        className
      )}
      data-animation-exclude="true"
      {...props}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "flex items-center justify-center text-white transition-all duration-200 ease-out",
          "data-[state=checked]:scale-100 data-[state=unchecked]:scale-0",
          "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
        )}
        data-animation-exclude="true"
      >
        <IconCheck
          className="size-3 stroke-[3]"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Indicator>

      {/* inner glow effect */}
      <div
        className="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-data-[state=checked]:opacity-20"
        data-animation-exclude="true"
      />
    </Root>
  );
}

export { Checkbox };
