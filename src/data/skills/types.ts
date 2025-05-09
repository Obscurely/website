import { ReactNode } from "react";

export enum SkillCategory {
  KeySkills = "Key Skills",
  Languages = "Languages",
  Frontend = "Frontend",
  Backend = "Backend",
  DevOps = "DevOps",
  Business = "Business",
}

// Color class mapping for each category
export enum CategoryColorClass {
  KeySkills = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-cyan-300/30 hover:border-cyan-300/50",
  Frontend = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-cyan-500/30 hover:border-cyan-500/50",
  Backend = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-indigo-500/30 hover:border-indigo-500/50",
  Languages = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-emerald-500/30 hover:border-emerald-500/50",
  DevOps = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-amber-600/30 hover:border-amber-600/50",
  Business = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-rose-600/30 hover:border-rose-600/50",
}

// Active tab color mapping
export enum CategoryAccentColor {
  KeySkills = "#67e8f9", // cyan-300
  Frontend = "#06b6d4", // cyan-500
  Backend = "#6366f1", // indigo-500
  Languages = "#10b981", // emerald-500
  DevOps = "#d97706", // amber-600
  Business = "#e11d48", // rose-600
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
  id: string;
  name: ReactNode;
  description: ReactNode;
  proficiency: SkillProficiency;
  notableProjects?: Project[];
}
