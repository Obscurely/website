import {
  IconBrandAws,
  IconBrandReact,
  IconBrandRust,
  IconSettings2,
  IconSitemap,
} from "@tabler/icons-react";
import { Skill, SkillCategory, SkillProficiency } from "./types";
import projects from "./projects";

export const skills: Record<SkillCategory, Skill[]> = {
  [SkillCategory.KeySkills]: [
    {
      id: "rust-key-skill",
      name: (
        <span className="flex items-center gap-2">
          <IconBrandRust /> Rust
        </span>
      ),
      description: (
        <p>
          Developed <strong>high-performance</strong> apps, servers & services
          for over 3 years, focusing on <strong>speed</strong>,{" "}
          <strong>concurrency</strong> and <strong>parallelism</strong>. Also
          implemented fast and cheap{" "}
          <strong>AWS Lambda functions on ARM</strong>.
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
  ],
  [SkillCategory.Languages]: [
    {
      id: "rust-language",
      name: (
        <span className="flex items-center gap-2">
          <IconBrandRust /> Rust
        </span>
      ),
      description: (
        <p>
          Developed <strong>high-performance</strong> apps, servers & services
          for over 3 years, focusing on <strong>speed</strong>,{" "}
          <strong>concurrency</strong> and <strong>parallelism</strong>. Also
          implemented fast and cheap{" "}
          <strong>AWS Lambda functions on ARM</strong>.
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
  ],
  [SkillCategory.Frontend]: [
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
          <strong>compound components</strong> and <strong>shared state</strong>
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
  ],
  [SkillCategory.Backend]: [
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
          , a production SaaS app, using <strong>AWS API Gateway</strong> and
          the <strong>OpenAPI</strong> v3 specification. Also integrated with
          <strong>third-party APIs</strong> in other projects.
        </p>
      ),
      proficiency: SkillProficiency.Skilled,
      notableProjects: [projects["RekoSearch"]],
    },
  ],
  [SkillCategory.DevOps]: [
    {
      id: "aws-devops",
      name: (
        <span className="flex items-center gap-2">
          <IconBrandAws /> AWS
        </span>
      ),
      description: (
        <p>
          Dual-certified (<strong>Developer Associate</strong> &{" "}
          <strong>Cloud Practitioner</strong>) with production experience across
          <strong>25+ services</strong>, including EC2, S3, Lambda, DynamoDB,
          API Gateway and SQS in{" "}
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
          .
        </p>
      ),
      proficiency: SkillProficiency.Skilled,
      notableProjects: [projects["RekoSearch"], projects["Portfolio"]],
    },
  ],
  [SkillCategory.Business]: [
    {
      id: "saas-business",
      name: (
        <span className="flex items-center gap-2">
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
  ],
};
