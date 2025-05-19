import { ReactNode } from "react";
import {
  IconCode,
  IconBrandReact,
  IconServer,
  IconCloud,
  IconBriefcase,
} from "@tabler/icons-react";

export enum SkillCategory {
  KeySkills = "Key Skills",
  Languages = "Languages",
  Frontend = "Frontend",
  Backend = "Backend",
  DevOps = "DevOps",
  Business = "Business",
}

export const CategoryIcons: Record<SkillCategory, ReactNode> = {
  [SkillCategory.KeySkills]: <IconCode size={18} />,
  [SkillCategory.Languages]: <IconCode size={18} />,
  [SkillCategory.Frontend]: <IconBrandReact size={18} />,
  [SkillCategory.Backend]: <IconServer size={18} />,
  [SkillCategory.DevOps]: <IconCloud size={18} />,
  [SkillCategory.Business]: <IconBriefcase size={18} />,
};

// Color class mapping for each category
export enum CategoryColorClass {
  KeySkills = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-cyan-300/30 hover:border-cyan-300/50",
  Frontend = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-cyan-500/30 hover:border-cyan-500/50",
  Backend = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-indigo-500/30 hover:border-indigo-500/50",
  Languages = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-emerald-500/30 hover:border-emerald-500/50",
  DevOps = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-teal-500/30 hover:border-teal-500/50",
  Business = "bg-slate-800/50 hover:bg-slate-700/60 border border-l-2 border-blue-400/30 hover:border-blue-400/50",
}

// Active tab color mapping
export enum CategoryAccentColor {
  KeySkills = "#67e8f9", // cyan-300
  Frontend = "#06b6d4", // cyan-500
  Backend = "#6366f1", // indigo-500
  Languages = "#10b981", // emerald-500
  DevOps = "#14b8a6", // teal-500
  Business = "#60a5fa", // blue-400
}

export enum SkillProficiency {
  Familiar = "Familiar", // Solid foundational knowledge.
  Intermediate = "Intermediate", // Comfortable working knowledge
  Skilled = "Skilled", // Strong practical capability
  Proficient = "Proficient", // Comprehensive understanding
}

export const skillProficiencyLevels = [
  SkillProficiency.Familiar,
  SkillProficiency.Intermediate,
  SkillProficiency.Skilled,
  SkillProficiency.Proficient,
];

export enum SkillProficiencyDescription {
  Familiar = "Solid foundational knowledge",
  Intermediate = "Comfortable working knowledge",
  Skilled = "Strong practical capability",
  Proficient = "Comprehensive understanding",
}

export const skillProficiencyColor: Record<string, React.CSSProperties> = {
  [SkillProficiency.Familiar]: {
    backgroundColor: "#4c1d95", // violet-900
    color: "#ddd6fe", // violet-200
  },
  [SkillProficiency.Intermediate]: {
    backgroundColor: "#0c4a6e", // sky-900
    color: "#bae6fd", // sky-100
  },
  [SkillProficiency.Skilled]: {
    backgroundColor: "#0e7490", // cyan-700
    color: "#cffafe", // cyan-50
  },
  [SkillProficiency.Proficient]: {
    backgroundColor: "#1d4ed8", // blue-700
    color: "#dbeafe", // blue-50
  },
};

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

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  icon: string; // Path to the certification icon
  date: string;
  url: string; // Link to verify certification
}
