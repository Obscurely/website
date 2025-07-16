import { memo, useMemo } from "react";
import { skills } from "@data/portfolio/skills/skills";
import {
  CategoryAccentColor,
  CategoryColorClass,
  SkillCategory,
} from "@data/portfolio/skills/types";
import {
  SkillBadge,
  SkillBadgeProvider,
} from "@portfolio/helpers/SkillBadge/SkillBadge";
import { SkillsTooltip } from "../SkillsTooltip";
import { SkillsTabs } from "./SkillsTabs";

/**
 * SkillsSection component that displays a list of skills.
 */
export const SkillsSection = () => {
  return (
    <div
      className="border-slate-730 data-[state=once]:animate-in fade-in slide-in-from-right-25 rounded-xl border bg-slate-800/20 p-6 opacity-0 backdrop-blur-[0px] duration-500 ease-out data-[state=once]:opacity-100"
      data-state="once"
    >
      <h3 className="mb-2 text-2xl font-bold text-white">My Skills</h3>

      <SkillBadgeProvider>
        <KeySkillsSection />

        <div className="mt-2 mb-2 text-xs text-slate-400 italic">
          And more skills below...
        </div>

        <SkillsTabs />
      </SkillBadgeProvider>
    </div>
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
