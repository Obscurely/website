import { memo, useMemo } from "react";

import { skills } from "@data/portfolio/skills/skills";
import {
  CategoryColorClass,
  SkillCategory,
} from "@data/portfolio/skills/types";
import { SkillBadge } from "@portfolio/helpers/SkillBadge/SkillBadge";

/**
 * CategorySkills component to display skills in a specific category
 * @param category - The skill category to display
 * @returns A list of skill badges for the specified category
 */
export const CategorySkills = memo(function CategorySkills({
  category,
}: {
  category: SkillCategory;
}) {
  // Disable the rule because it's not a user input
  // eslint-disable-next-line security/detect-object-injection
  const categorySkills = useMemo(() => skills[category], [category]);
  const colorClass = useMemo(
    () => CategoryColorClass[category as keyof typeof CategoryColorClass],
    [category]
  );

  return (
    <div className="flex flex-wrap gap-1.5 will-change-transform">
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
