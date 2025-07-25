"use client";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

/**
 * Grabs the current time from a context and displays it in the terminal header
 */
export const TerminalClock = () => {
  const currentTime = useCurrentTime();

  return (
    <div className="font-mono text-sm text-slate-400">
      {currentTime?.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }) ?? "--:--"}
    </div>
  );
};
