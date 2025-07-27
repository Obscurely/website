"use client";

import { memo, useMemo } from "react";

import { CategoryIcons } from "@data/portfolio/skills/types";
import { tabCategories } from "@hooks/portfolio/useSkillsTabs";
import { TabsList, TabsTrigger } from "@ui/tabs";

// Mobile tab styles
const mobileTabStyles = [
  { gridColumn: "span 2" }, // First 3 items
  { gridColumn: "span 2" },
  { gridColumn: "span 2" },
  { gridColumn: "1 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 4th item
  { gridColumn: "4 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 5th item
];

/**
 * Desktop tabs list component
 * @returns A list of skill categories for desktop view
 */
export const DesktopTabsList = memo(function DesktopTabsList() {
  return (
    <div className="hidden xl:block">
      <TabsList className="border-slate-740 bg-slate-850 mb-2 flex w-full gap-1 overflow-hidden rounded-xl border p-1">
        {tabCategories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="data-[state=active]:from-cyan-535 data-[state=active]:to-blue-530 relative flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:text-white"
            data-animation-exclude="true"
            aria-label={`Skills category: ${category}`}
          >
            <span
              className="flex items-center justify-center"
              aria-label={`Skill category button for ${category}`}
            >
              {/* Disable the rule because it's not a user input */}
              {/* eslint-disable-next-line security/detect-object-injection */}
              <span className="mr-1.5">{CategoryIcons[category]}</span>
              {category}
            </span>
            <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 data-[state=active]:w-1/2"></div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
});

DesktopTabsList.displayName = "DesktopTabsList";

/**
 * Mobile tabs list component
 * @returns A list of skill categories for mobile view
 */
export const MobileTabsList = memo(function MobileTabsList() {
  const mobileTabsListStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gridTemplateRows: "auto auto",
      gap: "0.2rem",
      minHeight: "70px",
    }),
    []
  );

  return (
    <div className="xl:hidden">
      <TabsList
        className="border-slate-740 bg-slate-850 mb-2 flex w-full rounded-xl border p-1 transition-all duration-200"
        style={mobileTabsListStyle}
      >
        {tabCategories.map((category, idx) => (
          <TabsTrigger
            key={category}
            value={category}
            className="data-[state=active]:from-cyan-535 data-[state=active]:to-blue-530 relative flex cursor-pointer items-center justify-center px-1 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:text-white"
            data-animation-exclude="true"
            style={mobileTabStyles[Math.min(idx, mobileTabStyles.length - 1)]}
            aria-label={`Skills mobile category: ${category}`}
          >
            <span
              className="flex items-center justify-center"
              aria-label={`Skill mobile category button for ${category}`}
            >
              {/* Disable the rule because it's not a user input */}
              {/* eslint-disable-next-line security/detect-object-injection */}
              <span className="mr-1">{CategoryIcons[category]}</span>
              {category}
            </span>
            <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 data-[state=active]:w-1/2"></div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
});

MobileTabsList.displayName = "MobileTabsList";
