import backendSkills from "./categories/backend";
import businessSkills from "./categories/business";
import devopsSkills from "./categories/devops";
import frontendSkills from "./categories/frontend";
import keySkills from "./categories/keyskills";
import languagesSkills from "./categories/languages";
import { Skill, SkillCategory } from "./types";

export const skills: Record<SkillCategory, Skill[]> = {
  [SkillCategory.KeySkills]: keySkills,
  [SkillCategory.Languages]: languagesSkills,
  [SkillCategory.Frontend]: frontendSkills,
  [SkillCategory.Backend]: backendSkills,
  [SkillCategory.DevOps]: devopsSkills,
  [SkillCategory.Business]: businessSkills,
};
