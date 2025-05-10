import { IconSettings2 } from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const businessSkills: Skill[] = [
  {
    id: "saas-business",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconSettings2 /> SaaS Management
      </span>
    ),
    description: (
      <p>
        Experience <strong>handling business aspects</strong>, including{" "}
        <strong>Policies</strong> (Terms and Privacy) and{" "}
        <strong>law compliance</strong> in{" "}
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
    proficiency: SkillProficiency.Familiar,
    notableProjects: [projects["RekoSearch"]],
  },
];

export default businessSkills;
