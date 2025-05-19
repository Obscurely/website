import { Skill, SkillCategory } from "./types";
import keySkills from "./categories/keyskills";
import languagesSkills from "./categories/languages";
import frontendSkills from "./categories/frontend";
import backendSkills from "./categories/backend";
import devopsSkills from "./categories/devops";
import businessSkills from "./categories/business";

export const skills: Record<SkillCategory, Skill[]> = {
  [SkillCategory.KeySkills]: keySkills,
  [SkillCategory.Languages]: languagesSkills,
  [SkillCategory.Frontend]: frontendSkills,
  [SkillCategory.Backend]: backendSkills,
  [SkillCategory.DevOps]: devopsSkills,
  [SkillCategory.Business]: businessSkills,
};
