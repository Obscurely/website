import { Skill, SkillCategory } from "./types";

// Helper function to get all skills as a flat array with category information
export const getSkillsFlat = (
  skills: Record<SkillCategory, Skill[]>
): Skill[] => {
  return Object.entries(skills).flatMap(([category, skillList]) =>
    skillList.map((skill) => ({
      ...skill,
      category: category as SkillCategory,
    }))
  );
};
