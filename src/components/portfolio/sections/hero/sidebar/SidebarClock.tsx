"use client";

import { useCurrentTime } from "@contexts/portfolio/TimeContext";

export const SidebarClock = () => {
  const currentTime = useCurrentTime();

  return (
    <span className="text-slate-200">
      {currentTime?.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
      }) ?? "--:--"}
    </span>
  );
};
