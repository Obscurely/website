import projects from "@data/portfolio/skills/projects";
import { Skill, SkillProficiency } from "@data/portfolio/skills/types";
import { SiMui, SiShadcnui } from "@icons-pack/react-simple-icons";
import {
  IconBrandFramerMotion,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconDeviceDesktop,
  IconWorldWww,
} from "@tabler/icons-react";

const frontendSkills: Skill[] = [
  // React
  {
    id: "react-frontend",
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
    notableProjects: [projects["RekoSearch"], projects["website"]],
  },

  // Next.js
  {
    id: "nextjs-frontend",
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
    notableProjects: [projects["website"]],
  },

  // Material UI
  {
    id: "materialui-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <SiMui size={22} className="mt-0.5" /> Material UI
      </span>
    ),
    description: (
      <p>
        Built a substantial <strong>responsive</strong> frontend of{" "}
        <strong>~23k LoC</strong>, customizing the theme, using a{" "}
        <strong>theme responsive design</strong> and{" "}
        <strong>styled components</strong> for{" "}
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

  // Tailwind CSS
  {
    id: "tailwindcss-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandTailwind /> Tailwind CSS
      </span>
    ),
    description: (
      <p>
        Used in building the responsive <strong>Next.js</strong> static{" "}
        <strong>website you are currently on</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["website"]],
  },

  // Shadcn/ui
  {
    id: "shadcn-ui-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <SiShadcnui size={15} /> Shadcn/ui
      </span>
    ),
    description: (
      <p>
        Some <strong>components used</strong> in the <strong>Next.js</strong>{" "}
        static <strong>website you are currently on</strong> are imported from
        it.
      </p>
    ),
    proficiency: SkillProficiency.Skilled,
    notableProjects: [projects["website"]],
  },

  // Framer Motion
  {
    id: "framer-motion-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconBrandFramerMotion /> Framer Motion
      </span>
    ),
    description: (
      <p>
        Used it to build the <strong>animations</strong> on the{" "}
        <strong>current static website you are on</strong> and the frontend of{" "}
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
    notableProjects: [projects["website"], projects["RekoSearch"]],
  },

  // Native Interfaces
  {
    id: "native-interfaces-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconDeviceDesktop /> Native Interfaces
      </span>
    ),
    description: (
      <p>
        Built <strong>cross-platform GUIs</strong>, including with{" "}
        <strong>Slint</strong>, <strong>FLTK</strong>, +{" "}
        <strong>useful CLIs</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [
      projects["Falion"],
      projects["EStash"],
      projects["SharpPlayer"],
    ],
  },

  // Web Performance
  {
    id: "web-performance-frontend",
    name: (
      <span className="flex h-6 items-center gap-2">
        <IconWorldWww /> Web Performance
      </span>
    ),
    description: (
      <p>
        <strong>Improved core metrics</strong> through methods like{" "}
        <strong>FCP reduction</strong>,{" "}
        <strong>efficient network waterfalls</strong>,{" "}
        <strong>optimized images</strong>, <strong>code splitting</strong>, and{" "}
        <strong>bundle size reduction</strong>.
      </p>
    ),
    proficiency: SkillProficiency.Intermediate,
    notableProjects: [projects["RekoSearch"], projects["website"]],
  },
];

export default frontendSkills;
