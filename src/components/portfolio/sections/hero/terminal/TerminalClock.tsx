"use client";

import { memo, useMemo } from "react";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

/**
 * Grabs the current time from a context and displays it in the terminal header
 */
export const TerminalClock = memo(() => {
  const currentTime = useCurrentTime();

  const formattedTime = useMemo(() => {
    return (
      currentTime?.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }) ?? "--:--"
    );
  }, [currentTime]);

  return (
    <div className="font-mono text-sm text-slate-400">{formattedTime}</div>
  );
});

TerminalClock.displayName = "TerminalClock";
