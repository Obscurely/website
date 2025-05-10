"use client";

import { memo, useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@data/skills/skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  CategoryAccentColor,
  CategoryColorClass,
  CategoryIcons,
  SkillCategory,
} from "@data/skills/types";
import {
  SkillBadge,
  SkillBadgeProvider,
} from "@components/helper/SkillBadge/SkillBadge";
import SkillsTooltip from "./SkillsTooltip";

// Memoize static data
const tabCategories = Object.values(SkillCategory).filter(
  (category) => category !== SkillCategory.KeySkills
);

// Mobile tab styles
const mobileTabStyles = [
  { gridColumn: "span 2" }, // First 3 items
  { gridColumn: "span 2" },
  { gridColumn: "span 2" },
  { gridColumn: "1 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 4th item
  { gridColumn: "4 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 5th item
];

// Constants for height calculation
const BADGE_HEIGHT = 28; // Height of a skill badge in pixels
const BADGE_MARGIN = 6; // Margin between badges (gap-1.5 = 0.375rem = ~6px)
const CHARS_PER_BADGE_WIDTH = 8; // Approximate characters per badge width unit
const BASE_PADDING = 4; // Base padding in pixels
const MIN_HEIGHT = 60; // Minimum height in pixels

// Utility function to calculate content height
const calculateContentHeight = (
  containerWidth: number,
  category: SkillCategory
) => {
  const categorySkills = skills[category];
  if (!categorySkills || categorySkills.length === 0) return MIN_HEIGHT;

  // Calculate average characters per skill
  const totalChars = categorySkills.reduce(
    (sum, skill) =>
      sum +
      (typeof skill.name === "string"
        ? skill.name.length
        : String(skill.id).length || 5),
    0
  );
  const avgCharsPerSkill = totalChars / categorySkills.length;

  // Estimate badge width based on character count
  const avgBadgeWidth = Math.max(avgCharsPerSkill * CHARS_PER_BADGE_WIDTH, 80);

  // Estimate badges per row based on container width
  const badgesPerRow = Math.floor(
    (containerWidth - BASE_PADDING) / (avgBadgeWidth + BADGE_MARGIN)
  );

  // Calculate rows needed
  const rows = Math.ceil(categorySkills.length / Math.max(badgesPerRow, 1));

  // Calculate height
  return Math.max(
    rows * (BADGE_HEIGHT + BADGE_MARGIN) - BADGE_MARGIN + BASE_PADDING,
    MIN_HEIGHT
  );
};

interface SkillsSectionProps {
  isInView: boolean;
}

export default function SkillsSection({ isInView }: SkillsSectionProps) {
  // Memoize animation props to prevent recalculation
  const animationProps = useMemo(
    () => ({
      initial: { opacity: 0, x: 50 },
      animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
      transition: { duration: 0.7, delay: 0.4 },
    }),
    [isInView]
  );

  return (
    <motion.div
      {...animationProps}
      className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-2 text-2xl font-bold text-white">My Skills</h3>

      <SkillBadgeProvider>
        <KeySkillsSection />

        <div className="mt-2 mb-2 text-xs text-slate-400 italic">
          And more skills below...
        </div>

        <SkillsTabs />
      </SkillBadgeProvider>
    </motion.div>
  );
}

const KeySkillsSection = memo(function KeySkillsSection() {
  // Memoize key skills to prevent recalculation
  const keySkills = useMemo(() => skills[SkillCategory.KeySkills], []);

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <h4
          className="text-lg font-semibold"
          style={{ color: CategoryAccentColor.KeySkills }}
        >
          {SkillCategory.KeySkills}
        </h4>
        <SkillsTooltip />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keySkills.map((skill) => (
          <SkillBadge
            key={
              typeof skill.name === "string"
                ? skill.name
                : `key-skill-${skill.id || JSON.stringify(skill)}`
            }
            skill={skill}
            colorClass={CategoryColorClass.KeySkills}
          />
        ))}
      </div>
    </div>
  );
});

const SkillsTabs = memo(function SkillsTabs() {
  const defaultValue = useMemo(
    () => tabCategories[0] || SkillCategory.Frontend,
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(MIN_HEIGHT);

  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;

      // Calculate height for each category and find the maximum
      const heights = tabCategories.map((category) =>
        calculateContentHeight(containerWidth, category)
      );

      setContentHeight(Math.max(...heights));
    };

    // Calculate on mount and window resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <DesktopTabsList />
        <MobileTabsList />

        <div
          style={{
            height: contentHeight,
            transition: "height 0.3s ease-in-out",
          }}
        >
          {tabCategories.map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="animate-in fade-in slide-in-from-bottom-2 absolute mt-0 w-11/12 transition-all duration-300 ease-in-out"
            >
              <CategorySkills category={category} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
});

// Extract category skills to a separate memoized component
const CategorySkills = memo(function CategorySkills({
  category,
}: {
  category: SkillCategory;
}) {
  const categorySkills = useMemo(() => skills[category], [category]);
  const colorClass = useMemo(
    () => CategoryColorClass[category as keyof typeof CategoryColorClass],
    [category]
  );

  return (
    <div className="flex flex-wrap gap-1.5">
      {categorySkills.map((skill) => (
        <SkillBadge
          key={
            typeof skill.name === "string"
              ? skill.name
              : `${category}-${skill.id || JSON.stringify(skill)}`
          }
          skill={skill}
          colorClass={colorClass}
        />
      ))}
    </div>
  );
});

const DesktopTabsList = memo(function DesktopTabsList() {
  return (
    <div className="hidden xl:block">
      <TabsList className="mb-2 flex w-full gap-1 overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/40 p-1 backdrop-blur-sm">
        {tabCategories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="relative flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            <span className="flex items-center justify-center">
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

const MobileTabsList = memo(function MobileTabsList() {
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
        className="mb-2 flex w-full rounded-xl border border-slate-700/30 bg-slate-800/40 p-1 backdrop-blur-sm transition-all duration-200"
        style={mobileTabsListStyle}
      >
        {tabCategories.map((category, idx) => (
          <TabsTrigger
            key={category}
            value={category}
            className="relative flex cursor-pointer items-center justify-center px-1 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            style={mobileTabStyles[Math.min(idx, mobileTabStyles.length - 1)]}
          >
            <span className="flex items-center justify-center">
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
