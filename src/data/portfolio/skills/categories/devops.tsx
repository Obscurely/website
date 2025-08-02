import projects from "@data/portfolio/skills/projects";
import { Skill, SkillProficiency } from "@data/portfolio/skills/types";

import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandTerraform,
  IconGitMerge,
  IconHeartRateMonitor,
  IconPackage,
  IconServer,
  SiKubernetes,
  SiLinux,
} from "../icons";

const devopsSkills: Skill[] = [
  {
    id: "aws-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandAws size={24} /> AWS
      </span>
    ),
    description: (
      <p>
        Dual-certified (<strong>Developer Associate</strong> &{" "}
        <strong>Cloud Practitioner</strong>) with{" "}
        <strong>production experience</strong> across{" "}
        <strong>25+ services</strong>, including <strong>EC2</strong>,{" "}
        <strong>S3</strong>, <strong>Lambda</strong>, <strong>DynamoDB</strong>,{" "}
        <strong>API Gateway</strong> and <strong>SQS</strong> in{" "}
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
    notableProjects: [projects["RekoSearch"], projects["website"]],
  },
  {
    id: "kubernetes-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <SiKubernetes size={22} /> Kubernetes
      </span>
    ),
    description: (
      <p>
        <strong>Certified Kubernetes Application Developer</strong> with{" "}
        <strong>production experience</strong>, specifically with{" "}
        <strong>auto-scaling deployments</strong> and{" "}
        <strong>on-demand Job creation</strong> in{" "}
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
    notableProjects: [projects["RekoSearch"]],
  },
  {
    id: "terraform-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandTerraform size={24} /> Terraform
      </span>
    ),
    description: (
      <p>
        Used it for <strong>complex infrastructure provisioning</strong>,
        including a production SaaS application (
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
        ) and a <strong>self-administered K3s cluster</strong> (for{" "}
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
        ).
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"]],
  },
  {
    id: "docker-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandDocker size={24} /> Docker
      </span>
    ),
    description: (
      <p>
        <strong>Containerized</strong> apps, servers & services and{" "}
        <strong>manage over 47 services</strong> with proper{" "}
        <strong>networking</strong>, <strong>security measures</strong> and{" "}
        <strong>nearly 100% uptime</strong> in my <strong>Home Lab</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"]],
  },
  {
    id: "cicd-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconGitMerge size={24} /> CI/CD
      </span>
    ),
    description: (
      <p>
        Implemented Github Actions <strong>build</strong>, <strong>test</strong>
        , and <strong>multi-platform release pipelines</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [
      projects["RustTemplate"],
      projects["Falion"],
      projects["RekoSearch"],
      projects["website"],
    ],
  },
  {
    id: "monitoring-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconHeartRateMonitor size={24} /> Monitoring
      </span>
    ),
    description: (
      <p>
        Implemented observability stacks, including <strong>Prometheus</strong>,{" "}
        <strong>Grafana</strong>, <strong>Cloudwatch</strong> and regular logs.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
  },
  {
    id: "sysadmin-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconServer size={24} /> SysAdmin
      </span>
    ),
    description: (
      <p>
        Manage <strong>over 47 user-accessible containerized services</strong>{" "}
        in my Home Lab, running on <strong>enterprise Linux</strong> with{" "}
        <strong>production security measures</strong> and exposure patterns (
        <strong>Traefik</strong> and <strong>Cloudflare</strong>).
      </p>
    ),
    proficiency: SkillProficiency.Proficient,
  },
  {
    id: "linux-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <SiLinux name="Linux" size={20} /> Linux
      </span>
    ),
    description: (
      <p>
        <strong>Over 5 years of experience</strong> with{" "}
        <strong>advanced Linux distributions</strong> like{" "}
        <strong>Arch Linux</strong> and <strong>NixOS</strong> (my daily
        driver), <strong>scripting system installs</strong> and{" "}
        <strong>workflows</strong>, and{" "}
        <strong>extensive knowledge of the terminal</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Proficient,
    notableProjects: [
      projects["NixObscurely"],
      projects["ArchObscurely"],
      projects["neovim"],
    ],
  },
  {
    id: "package-deployment-devops",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconPackage size={24} /> Package Deployment
      </span>
    ),
    description: (
      <p>
        Deployed apps on <strong>Linux</strong>, <strong>MacOS</strong> and{" "}
        <strong>Windows</strong> in multiple formats:{" "}
        <strong>downloadable binaries</strong>, <strong>installers</strong>,{" "}
        <strong>package managers</strong> (AUR and Homebrew),{" "}
        <strong>containers</strong> and more.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [
      projects["Falion"],
      projects["EStash"],
      projects["RustTemplate"],
    ],
  },
];

export default devopsSkills;
