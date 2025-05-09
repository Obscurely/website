import { IconBrandRust } from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const keySkills: Skill[] = [
  {
    id: "rust-key-skill",
    name: (
      <span className="flex items-center gap-2">
        <IconBrandRust /> Rust
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
      projects["Rustsomware"],
    ],
  },
];

export default keySkills;
