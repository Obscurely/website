export enum SkillCategory {
  Frontend = "Frontend",
}

export enum SkillProficiency {
  Familiar = "Familiar", // Solid foundational knowledge.
  Intermediate = "Intermediate", // Comfortable working knowledge
  Skilled = "Skilled", // Strong practical capability
  Proficient = "Proficient", // Comprehensive understanding
}

export interface Project {
  name: string;
  link: string;
}

export interface Skill {
  name: string;
  description: string;
  proficiency: SkillProficiency;
  notableProjects?: Project[];
  category?: SkillCategory; // Added for when skills are in a flat array
}
