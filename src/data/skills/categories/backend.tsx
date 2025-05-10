import {
  IconApps,
  IconArrowsSplit2,
  IconBrandOauth,
  IconCreditCardPay,
  IconDatabase,
  IconDevices,
  IconShieldLock,
  IconSitemap,
} from "@tabler/icons-react";
import { Skill, SkillProficiency } from "../types";
import projects from "../projects";

const backendSkills: Skill[] = [
  // API
  {
    id: "api-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
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

  // Databases
  {
    id: "databases-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconDatabase /> Databases
      </span>
    ),
    description: (
      <p>
        Production experience (
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
        , a SaaS app) with <strong>AWS DynamoDB</strong> handling errors,
        creating efficient queries, and <strong>Redis</strong>. I am familiar
        with <strong>others in my Home Lab</strong> as well.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [projects["RekoSearch"]],
  },

  // Security
  {
    id: "security-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconShieldLock /> Security
      </span>
    ),
    description: (
      <p>
        Knowledge of common (and less common) <strong>attack vectors</strong>{" "}
        and how to <strong>protect against them</strong>, be it in the context
        of a website or a server,{" "}
        <strong>strong security practices and encryption</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [
      projects["RekoSearch"],
      projects["EStash"],
      projects["Rustsomware"],
    ],
  },

  // OAuth 2.0
  {
    id: "oauth2.0-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandOauth /> OAuth 2.0
      </span>
    ),
    description: (
      <p>
        Built an <strong>Authorization Code flow</strong> with{" "}
        <strong>AWS Cognito</strong> with{" "}
        <strong>strong security practices</strong>, including{" "}
        <strong>safe cookie storing</strong> and{" "}
        <strong>short-lived tokens</strong> for{" "}
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

  // Payments
  {
    id: "payments-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconCreditCardPay /> Payments
      </span>
    ),
    description: (
      <p>
        End-to-end implementation of a <strong>Stripe</strong> payment system
        with <strong>server-side webhook</strong> handling in{" "}
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
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [projects["RekoSearch"]],
  },

  // Concurrency/Parallelism
  {
    id: "concurrency-parallelism-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconArrowsSplit2 /> Concurrency/Parallelism
      </span>
    ),
    description: (
      <p>
        Implemented <strong>high-performance</strong> apps, services and servers
        using <strong>thread pools</strong>, <strong>async processing</strong>,
        and <strong>lock-free data structures</strong> primarily with{" "}
        <strong>Rust</strong> and <strong>C#</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Proficient,
    notableProjects: [
      projects["Falion"],
      projects["DiscordNitroSniper"],
      projects["RekoSearch"],
    ],
  },

  // Microservices
  {
    id: "microservices-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconApps /> Microservices
      </span>
    ),
    description: (
      <p>
        Implemented <strong>decoupled cloud systems on AWS</strong>, including{" "}
        <strong>API Gateway with Lambda</strong> integrations and{" "}
        <strong>SQS</strong> queue messages processed by{" "}
        <strong>dedicated job processors</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["RekoSearch"]],
  },

  // Cross-Platform
  {
    id: "cross-platform-backend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconDevices /> Cross-Platform
      </span>
    ),
    description: (
      <p>
        Built apps running on <strong>Linux</strong>, <strong>MacOS</strong> and{" "}
        <strong>Windows</strong> simultaneously.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [
      projects["Falion"],
      projects["EStash"],
      projects["PyPassMan"],
      projects["DiscordNitroSniper"],
    ],
  },
];

export default backendSkills;
