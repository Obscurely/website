import { ReactNode } from "react";

export enum SkillCategory {
  KeySkills = "Key Skills",
  Languages = "Languages",
  Frontend = "Frontend",
  Backend = "Backend",
  DevOps = "DevOps",
  Business = "Business",
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
  shortDescription: string;
}

export interface Skill {
  name: ReactNode;
  description: ReactNode;
  proficiency: SkillProficiency;
  notableProjects?: Project[];
  category?: SkillCategory; // Added for when skills are in a flat array
}
