import { IconSitemap } from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const backendSkills: Skill[] = [
  {
    id: "api-backend",
    name: (
      <span className="flex items-center gap-2">
        <IconSitemap /> API
      </span>
    ),
    description: (
      <p>
        Built the API for{" "}
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
        , a production SaaS app, using <strong>AWS API Gateway</strong> and the{" "}
        <strong>OpenAPI</strong> v3 specification. Also integrated with{" "}
        <strong>third-party APIs</strong> in other projects.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"]],
  },
];

export default backendSkills;
