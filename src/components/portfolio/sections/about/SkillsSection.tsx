"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { skills } from "@data/portfolio/skills/skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  CategoryAccentColor,
  CategoryColorClass,
  CategoryIcons,
  SkillCategory,
} from "@data/portfolio/skills/types";
import {
  SkillBadge,
  SkillBadgeProvider,
} from "@portfolio/helpers/SkillBadge/SkillBadge";
import { SkillsTooltip } from "./SkillsTooltip";
import { useSkillsTabs, tabCategories } from "@hooks/portfolio/useSkillsTabs";

// Mobile tab styles
const mobileTabStyles = [
  { gridColumn: "span 2" }, // First 3 items
  { gridColumn: "span 2" },
  { gridColumn: "span 2" },
  { gridColumn: "1 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 4th item
  { gridColumn: "4 / span 3", gridRow: 2, marginTop: "-0.125rem" }, // 5th item
];

interface SkillsSectionProps {
  isInView: boolean;
}

/**
 * SkillsSection component that displays a list of skills.
 * It uses framer-motion for animation and memoization for performance.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const SkillsSection = ({ isInView }: SkillsSectionProps) => {
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
};

SkillsSection.displayName = "SkillsSection";

/**
 * KeySkillsSection component that displays key skills.
 * It memoizes the key skills to prevent recalculation on every render.
 */
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

KeySkillsSection.displayName = "KeySkillsSection";

/**
 * SkillsTabs component that displays skill categories and their respective skills.
 * It calculates the height of the tabs dynamically based on the content.
 */
const SkillsTabs = memo(function SkillsTabs() {
  const { containerRef, defaultValue, contentHeight } = useSkillsTabs();

  return (
    <div ref={containerRef}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <DesktopTabsList />
        <MobileTabsList />

        <div
          style={{
            height: contentHeight || "65px",
            minHeight: "65px",
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

SkillsTabs.displayName = "SkillsTabs";

/**
 * CategorySkills component to display skills in a specific category
 * @param category - The skill category to display
 * @returns A list of skill badges for the specified category
 */
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

CategorySkills.displayName = "CategorySkills";

/**
 * Desktop tabs list component
 * @returns A list of skill categories for desktop view
 */
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

DesktopTabsList.displayName = "DesktopTabsList";

/**
 * Mobile tabs list component
 * @returns A list of skill categories for mobile view
 */
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

MobileTabsList.displayName = "MobileTabsList";
