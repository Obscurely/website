import projects from "@data/portfolio/skills/projects";
import { Skill, SkillProficiency } from "@data/portfolio/skills/types";

import {
  IconBrandPython,
  IconBrandRust,
  IconBrandTypescript,
  IconHash,
} from "../icons";

const languagesSkills: Skill[] = [
  {
    id: "rust-language",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandRust size={24} /> Rust
      </span>
    ),
    description: (
      <p>
        Developed <strong>high-performance</strong> apps, servers & services for
        over 3 years, focusing on <strong>speed</strong>,{" "}
        <strong>concurrency</strong> and <strong>parallelism</strong>. Also
        implemented fast and cheap <strong>AWS Lambda functions on ARM</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Proficient,
    notableProjects: [
      projects["RekoSearch"],
      projects["Falion"],
      projects["EStash"],
    ],
  },
  {
    id: "python-language",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandPython size={24} /> Python
      </span>
    ),
    description: (
      <p>
        Built web backends with <strong>Flask</strong>,{" "}
        <strong>automated tasks</strong> and <strong>created scripts</strong>{" "}
        across 5+ years.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [
      projects["RekoSearch"],
      projects["PbthalArchiveManager"],
      projects["RustTemplate"],
      projects["DiscordBot"],
      projects["PyPassMan"],
    ],
  },
  {
    id: "typescript-language",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandTypescript size={24} /> TypeScript
      </span>
    ),
    description: (
      <p>
        Used it extensively with <strong>React</strong> and{" "}
        <strong>Next.js</strong>, focusing on modern <strong>type-safe</strong>{" "}
        applications.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"], projects["website"]],
  },
  {
    id: "shell-script-language",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconHash size={24} /> Shell Script
      </span>
    ),
    description: (
      <p>
        Automated <strong>system management</strong>,{" "}
        <strong>development workflows</strong>, <strong>CI/CD pipelines</strong>{" "}
        and <strong>recurring tasks</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [projects["NixObscurely"], projects["ArchObscurely"]],
  },
];

export default languagesSkills;
