import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandNextjs,
  IconBrandPython,
  IconBrandReact,
  IconBrandRust,
  IconBrandTerraform,
  IconBrandTypescript,
  IconGitMerge,
} from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";
import { SiKubernetes, SiLinux } from "@icons-pack/react-simple-icons";

const keySkills: Skill[] = [
  // Rust
  {
    id: "rust-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
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

  // Python
  {
    id: "python-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandPython /> Python
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

  // TypeScript & JavaScript
  {
    id: "typescript-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandTypescript /> TypeScript
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
    notableProjects: [projects["RekoSearch"], projects["Portfolio"]],
  },

  // React
  {
    id: "react-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandReact /> React
      </span>
    ),
    description: (
      <p>
        Built a substantial frontend of <strong>~23k LoC</strong> with advanced
        patterns, including <strong>custom hooks</strong>,{" "}
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

  // Next.js
  {
    id: "nextjs-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandNextjs /> Next.js
      </span>
    ),
    description: (
      <p>
        The <strong>static website you are currently on</strong> is built with
        it + <strong>TailwindCSS</strong> and <strong>Shadcn/ui</strong>.
        Optimized for <strong>performance</strong>,{" "}
        <strong>fast load times</strong> and <strong>SEO</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["Portfolio"]],
  },

  // AWS
  {
    id: "aws-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandAws /> AWS
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
    notableProjects: [projects["RekoSearch"], projects["Portfolio"]],
  },

  // Kubernetes
  {
    id: "kubernetes-keyskill",
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

  // Docker
  {
    id: "docker-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandDocker /> Docker
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

  // Terraform
  {
    id: "terraform-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandTerraform /> Terraform
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

  // CI/CD
  {
    id: "cicd-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconGitMerge /> CI/CD
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
      projects["Portfolio"],
    ],
  },

  // Linux
  {
    id: "linux-keyskill",
    name: (
      <span className="flex h-6 items-center gap-2">
        <SiLinux /> Linux
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
];

export default keySkills;
