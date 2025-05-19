import {
  IconApps,
  IconDeviceDesktop,
  IconStar,
  IconTools,
  IconWorld,
} from "@tabler/icons-react";

export const categories = ["Web", "Native", "Tool/Script"];
export const categoriesDisplay: Record<string, React.ReactNode> = {
  All: (
    <span key="All" className="flex items-center gap-2">
      <IconApps size={20} /> All
    </span>
  ),
  Featured: (
    <span key="Featured" className="flex items-center gap-2">
      <IconStar size={20} /> Featured
    </span>
  ),
  Web: (
    <span key="Web" className="flex items-center gap-2">
      <IconWorld size={20} /> Web
    </span>
  ),
  Native: (
    <span key="Native" className="flex items-center gap-2">
      <IconDeviceDesktop size={20} /> Native
    </span>
  ),
  "Tool/Script": (
    <span key="Tool/Script" className="flex items-center gap-2">
      <IconTools size={20} /> Tool/Script
    </span>
  ),
};

type Category = "Web" | "Native" | "Tool/Script";

export interface Project {
  category: Category;
  name: string;
  index: number;
  description: React.ReactNode;
  image?: string;
  imageSize?: number;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}

type ProjectKey =
  | "RekoSearch"
  | "Falion"
  | "website"
  | "EStash"
  | "NixObscurely"
  | "ArchObscurely"
  | "RustTemplate"
  | "RustySorter"
  | "PbthalArchiveManager"
  | "PyPassMan"
  | "DiscordBot"
  | "SharpPlayer"
  | "ArduinoAlarm";

export const projects: Record<ProjectKey, Project> = {
  RekoSearch: {
    category: "Web",
    name: "RekoSearch",
    index: 0,
    description: (
      <p>
        An <strong>AI-powered</strong> file search engine for images, videos,
        documents and audio that understands the content of your files, enabling{" "}
        <strong>semantic search</strong> across them. (<strong>~50k LoC</strong>
        ).
      </p>
    ),
    image: "/projects/rekosearch.svg",
    imageSize: 75,
    tags: ["AWS", "Kubernetes", "Rust", "Python", "React", "MUI", "Flask"],
    liveUrl: "https://rekosearch.com",
    githubUrl: "https://github.com/Obscurely/RekoSearch",
    featured: true,
  },
  Falion: {
    category: "Native",
    name: "Falion",
    index: 1,
    description: (
      <p>
        A privacy-focused <strong>tool and library</strong> for interacting with
        programming resources (like Stackoverflow) fast, efficiently, and{" "}
        <strong>asynchronously/parallelly</strong> using the{" "}
        <strong>CLI or GUI</strong>.
      </p>
    ),
    image: "/projects/falion.avif",
    imageSize: 100,
    tags: ["Rust", "Async", "Parallel", "Cross-Platform", "CI/CD", "Library"],
    githubUrl: "https://github.com/Obscurely/falion",
    featured: true,
  },
  website: {
    category: "Web",
    name: "Website",
    index: 2,
    description: (
      <p>
        My personal <strong>static tech website</strong> portfolio and blog,
        made with Next.js, React, Typescript, <strong>TailwindCSS</strong> and
        Shadcn/ui, <strong>deployed using CI/CD on AWS</strong>.
      </p>
    ),
    image: "/projects/nextjs.svg",
    imageSize: 75,
    tags: ["Next.js", "React", "TailwindCSS", "Shadcn/ui", "AWS"],
    liveUrl: "https://adriancrismaruc.com",
    githubUrl: "https://github.com/Obscurely/website",
    featured: true,
  },
  EStash: {
    category: "Native",
    name: "EStash",
    index: 3,
    description: (
      <p>
        A <strong>cross-platform</strong>, highly secure{" "}
        <strong>encrypted digital vault</strong> capable of setting a path and
        copying the contents to that file with the click of a button.
      </p>
    ),
    image: "/projects/estash.avif",
    imageSize: 65,
    tags: ["Rust", "Encryption", "Secure", "Cross-Platform", "Jenkins"],
    githubUrl: "https://github.com/Obscurely/EStash",
    featured: true,
  },
  RustTemplate: {
    category: "Tool/Script",
    name: "RustTemplate",
    index: 4,
    description: (
      <p>
        A complete template for <strong>cross-platform Rust projects</strong>.
        It includes scripts to customize the repository automatically and{" "}
        <strong>CI/CD</strong> pipelines to{" "}
        <strong>deploy on any platform in multiple formats</strong>.
      </p>
    ),
    tags: ["CI/CD", "GitHub Actions", "Template", "Rust", "Cross-Platform"],
    githubUrl: "https://github.com/Obscurely/RustTemplate",
    featured: true,
  },
  NixObscurely: {
    category: "Tool/Script",
    name: "NixObscurely",
    index: 5,
    description: (
      <p>
        My fully customized and <strong>automated</strong> NixOS (
        <strong>advanced Linux distribution</strong>) home-manager + flakes
        system configuration.{" "}
      </p>
    ),
    image: "/projects/nix.svg",
    imageSize: 80,
    tags: ["Automated", "NixOS", "Linux", "Home-manager", "Flakes"],
    githubUrl: "https://github.com/Obscurely/NixObscurely",
    featured: true,
  },
  ArchObscurely: {
    category: "Tool/Script",
    name: "ArchObscurely",
    index: 6,
    description: (
      <p>
        <strong>Automated</strong>, fully customized{" "}
        <strong>Arch Linux install</strong> for my machine.
      </p>
    ),
    image: "/projects/archlinux.svg",
    imageSize: 70,
    tags: ["Automated", "Arch Linux", "Linux"],
    githubUrl: "https://github.com/Obscurely/ArchObscurely",
    featured: true,
  },
  PbthalArchiveManager: {
    category: "Tool/Script",
    name: "Pbthal-Archive-Manager",
    index: 7,
    description: (
      <p>
        Download music from <strong>PBTHAL's</strong> archive{" "}
        <strong>faster and easier</strong> + get properly made albums using this
        collection of <strong>Python scripts</strong> with a functional CLI
        frontend.
      </p>
    ),
    tags: ["Python", "CLI", "Scripts", "Automation"],
    githubUrl: "https://github.com/Obscurely/Pbthal-Archive-Manager",
    featured: false,
  },
  PyPassMan: {
    category: "Native",
    name: "PyPassMan",
    index: 8,
    description: (
      <p>
        A <strong>cross-platform</strong> Password Manager with a{" "}
        <strong>QT frontend</strong>, <strong>custom installer</strong>, simple,
        but I learned a lot from building it.
      </p>
    ),
    tags: ["Python", "QT", "Cross-Platform", "Encryption"],
    githubUrl: "https://github.com/Obscurely/PyPassMan",
    featured: false,
  },
  DiscordBot: {
    category: "Tool/Script",
    name: "Discord-Bot",
    index: 9,
    description: (
      <p>
        A <strong>bot integrated with Discord's API</strong>, providing basic
        admin commands and a music player.
      </p>
    ),
    tags: ["Python", "API Integration", "Bot"],
    githubUrl: "https://github.com/Obscurely/Discord-Bot",
    featured: false,
  },
  RustySorter: {
    category: "Tool/Script",
    name: "RustySorter",
    index: 10,
    description: (
      <p>
        A fast, efficient, straightforward file sorter with{" "}
        <strong>recursive capabilities</strong>, made in Rust!
      </p>
    ),
    tags: ["Rust", "File Sorter", "CLI", "Automation"],
    githubUrl: "https://github.com/Obscurely/RustySorter",
    featured: false,
  },
  SharpPlayer: {
    category: "Native",
    name: "Sharp-Player",
    index: 11,
    description: <p>A simple audio player with a GUI made in C#!</p>,
    tags: ["C#", "Audio Player", "GUI"],
    githubUrl: "https://github.com/Obscurely/Sharp-Player",
    featured: false,
  },
  ArduinoAlarm: {
    category: "Native",
    name: "ArduinoAlarm",
    index: 12,
    description: (
      <p>
        An alarm clock I built using an <strong>arduio uno</strong>,{" "}
        <strong>tiny rtc</strong>, speaker, <strong>ir sensor</strong> and an ir
        remote.
      </p>
    ),
    tags: ["Arduino", "Alarm", "IR Remote", "Tiny RTC", "C++"],
    githubUrl: "https://github.com/Obscurely/ArduinoAlarm",
    featured: false,
  },
};
