"use client";

import { memo, useMemo } from "react";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

/**
 * TerminalClock component that displays the current time in a terminal-like format.
 */
export const SidebarClock = memo(() => {
  const currentTime = useCurrentTime();

  const formattedTime = useMemo(() => {
    return (
      currentTime?.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
      }) ?? "--:--"
    );
  }, [currentTime]);

  return <span className="text-slate-200">{formattedTime}</span>;
});

SidebarClock.displayName = "SidebarClock";
