import { Skill, SkillCategory, SkillProficiency } from "./types";

export const skills: Record<SkillCategory, Skill[]> = {
  [SkillCategory.Frontend]: [
    {
      name: "React",
      proficiency: SkillProficiency.Proficient,
      description: "Example description",
      notableProjects: [{ name: "Project 1", link: "https://example.com" }],
    },
    {
      name: "Next.js",
      proficiency: SkillProficiency.Proficient,
      description: "Example description",
    },
    {
      name: "TypeScript",
      proficiency: SkillProficiency.Proficient,
      description: "Example description",
    },
  ],
};
