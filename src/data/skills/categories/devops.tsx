import { IconBrandAws } from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const devopsSkills: Skill[] = [
  {
    id: "aws-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandAws /> AWS
      </span>
    ),
    description: (
      <p>
        Dual-certified (<strong>Developer Associate</strong> &{" "}
        <strong>Cloud Practitioner</strong>) with production experience across{" "}
        <strong>25+ services</strong>, including EC2, S3, Lambda, DynamoDB, API
        Gateway and SQS in{" "}
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
];

export default devopsSkills;
