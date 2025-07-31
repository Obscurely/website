"use client";

import { memo, useMemo } from "react";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

// Move formatter outside component to avoid recreation
const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

export const TerminalClock = memo(() => {
  const currentTime = useCurrentTime();

  const formattedTime = useMemo(() => {
    return currentTime ? TIME_FORMATTER.format(currentTime) : "--:--";
  }, [currentTime]);

  return (
    <div className="font-mono text-sm text-slate-400">{formattedTime}</div>
  );
});

TerminalClock.displayName = "TerminalClock";
