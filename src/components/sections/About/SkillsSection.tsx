"use client";

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

// Get all categories except KeySkills for tabs
const tabCategories = Object.values(SkillCategory).filter(
  (category) => category !== SkillCategory.KeySkills
);

interface SkillsSectionProps {
  isInView: boolean;
}

export default function SkillsSection({ isInView }: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.7, delay: 0.4 }}
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

function KeySkillsSection() {
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
        <SkillBadgeProvider>
          {skills[SkillCategory.KeySkills].map((skill) => (
            <SkillBadge
              key={
                typeof skill.name === "string"
                  ? skill.name
                  : "key-skill-" + Math.random()
              }
              skill={skill}
              colorClass={CategoryColorClass.KeySkills}
            />
          ))}
        </SkillBadgeProvider>
      </div>
    </div>
  );
}

function SkillsTabs() {
  return (
    <Tabs
      defaultValue={tabCategories[0] || SkillCategory.Frontend}
      className="w-full"
    >
      <DesktopTabsList />
      <MobileTabsList />

      {tabCategories.map((category) => (
        <TabsContent
          key={category}
          value={category}
          className="animate-in fade-in slide-in-from-bottom-2 mt-0 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-wrap gap-1.5">
            {skills[category].map((skill) => (
              <SkillBadge
                key={
                  typeof skill.name === "string"
                    ? skill.name
                    : `${category}-${Math.random()}`
                }
                skill={skill}
                colorClass={
                  CategoryColorClass[
                    category as keyof typeof CategoryColorClass
                  ]
                }
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function DesktopTabsList() {
  return (
    <div className="hidden md:block">
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
}

function MobileTabsList() {
  return (
    <div className="md:hidden">
      <TabsList
        className="mb-2 flex w-full rounded-xl border border-slate-700/30 bg-slate-800/40 p-1 backdrop-blur-sm transition-all duration-200"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "0.2rem",
          minHeight: "70px",
        }}
      >
        {tabCategories.map((category, idx) => (
          <TabsTrigger
            key={category}
            value={category}
            className="relative flex cursor-pointer items-center justify-center px-1 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
            style={
              idx < 3
                ? { gridColumn: `span 2` }
                : idx === 3
                  ? {
                      gridColumn: "1 / span 3",
                      gridRow: 2,
                      marginTop: "-0.125rem",
                    }
                  : {
                      gridColumn: "4 / span 3",
                      gridRow: 2,
                      marginTop: "-0.125rem",
                    }
            }
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
}
