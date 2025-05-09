import { IconBrandReact } from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const frontendSkills: Skill[] = [
  {
    id: "react-frontend",
    name: (
      <span className="flex items-center gap-2">
        <IconBrandReact /> React
      </span>
    ),
    description: (
      <p>
        Built a substantial frontend of almost <strong>20k LoC</strong> with
        advanced patterns, including <strong>custom hooks</strong>,{" "}
        <strong>compound components</strong> and <strong>shared state</strong>{" "}
        management for{" "}
        <span className="font-semibold italic">
          <a
            href="https://rekosearch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 not-italic transition-colors hover:text-cyan-300"
          >
            RekoSearch
          </a>
        </span>
        , a production SaaS app.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"]],
  },
];

export default frontendSkills;
