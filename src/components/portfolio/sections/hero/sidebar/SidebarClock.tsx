"use client";

import { memo, useMemo } from "react";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

// Move formatter outside component to avoid recreation
const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * TerminalClock component that displays the current time in a terminal-like format.
 */
export const SidebarClock = memo(() => {
  const currentTime = useCurrentTime();

  const formattedTime = useMemo(() => {
    return currentTime ? TIME_FORMATTER.format(currentTime) : "--:--";
  }, [currentTime]);

  return <span className="text-slate-200">{formattedTime}</span>;
});

SidebarClock.displayName = "SidebarClock";
