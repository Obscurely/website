export const categories = ["Web", "Native", "Tool/Script"];
type Category = "Web" | "Native" | "Tool/Script";

export interface Project {
  category: Category;
  name: string;
  description: string;
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
    description:
      "An AI-powered file search engine for images, videos, documents and audio that understands the content of your files, enabling semantic search across them. (~50k LoC)",
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
    description:
      "A privacy-focused tool and library for interacting with programming resources (like Stackoverflow) fast, efficiently, and asynchronously/parallelly using the CLI or GUI.",
    image: "/projects/falion.avif",
    tags: ["Rust", "Async", "Parallel", "Cross-Platform", "CI/CD", "Library"],
    githubUrl: "https://github.com/Obscurely/falion",
    featured: true,
  },
  website: {
    category: "Web",
    name: "Website",
    description:
      "My personal static tech website portfolio and blog, made with Next.js, React, Typescript, TailwindCSS and Shadcn/ui, deployed using CI/CD on AWS.",
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
    description:
      "A cross-platform, highly secure encrypted digital vault capable of setting a path and copying the contents to that file with the click of a button. ",
    image: "/projects/estash.avif",
    imageSize: 65,
    tags: ["Rust", "Encryption", "Secure", "Cross-Platform", "Jenkins"],
    githubUrl: "https://github.com/Obscurely/EStash",
    featured: true,
  },
  RustTemplate: {
    category: "Tool/Script",
    name: "RustTemplate",
    description:
      "A fully set-up Github repository for cross-platform Rust projects. It includes scripts to customize the repository automatically, CI/CD pipelines to deploy on any platform in multiple formats and the best Rust practices.",
    tags: ["CI/CD", "GitHub Actions", "Template", "Rust", "Cross-Platform"],
    githubUrl: "https://github.com/Obscurely/RustTemplate",
    featured: true,
  },
  NixObscurely: {
    category: "Tool/Script",
    name: "NixObscurely",
    description:
      "My fully customized and automated NixOS (advanced Linux distribution) home-manager + flakes system configuration. ",
    image: "/projects/nix.svg",
    imageSize: 80,
    tags: ["Automated", "NixOS", "Linux", "Home-manager", "Flakes"],
    githubUrl: "https://github.com/Obscurely/NixObscurely",
    featured: true,
  },
  ArchObscurely: {
    category: "Tool/Script",
    name: "ArchObscurely",
    description:
      "Automated, fully customized Arch Linux install for my machine.",
    image: "/projects/archlinux.svg",
    imageSize: 70,
    tags: ["Automated", "Arch Linux", "Linux"],
    githubUrl: "https://github.com/Obscurely/ArchObscurely",
    featured: true,
  },
  PbthalArchiveManager: {
    category: "Tool/Script",
    name: "Pbthal-Archive-Manager",
    description:
      "Download music from PBTHAL's archive faster and easier + get properly made albums using this collection of Python scripts with a functional CLI frontend",
    tags: ["Python", "CLI", "Scripts", "Automation"],
    githubUrl: "https://github.com/Obscurely/Pbthal-Archive-Manager",
    featured: false,
  },
  PyPassMan: {
    category: "Native",
    name: "PyPassMan",
    description:
      "A cross-platform Password Manager with a QT frontend, custom installer, simple, but I learned a lot from building it.",
    tags: ["Python", "QT", "Cross-Platform", "Encryption"],
    githubUrl: "https://github.com/Obscurely/PyPassMan",
    featured: false,
  },
  DiscordBot: {
    category: "Tool/Script",
    name: "Discord-Bot",
    description:
      "A bot integrated with Discord's API, providing basic admin commands and a music player.",
    tags: ["Python", "API Integration", "Bot"],
    githubUrl: "https://github.com/Obscurely/Discord-Bot",
    featured: false,
  },
  RustySorter: {
    category: "Tool/Script",
    name: "RustySorter",
    description:
      "A fast, efficient, straightforward file sorter with recursive capabilities, made in Rust!",
    tags: ["Rust", "File Sorter", "CLI", "Automation"],
    githubUrl: "https://github.com/Obscurely/RustySorter",
    featured: false,
  },
  SharpPlayer: {
    category: "Native",
    name: "Sharp-Player",
    description: " A simple audio player with a GUI made in C#!",
    tags: ["C#", "Audio Player", "GUI"],
    githubUrl: "https://github.com/Obscurely/Sharp-Player",
    featured: false,
  },
  ArduinoAlarm: {
    category: "Native",
    name: "ArduinoAlarm",
    description:
      "An alarm clock I built using an arduio uno, tiny rtc, speaker, ir sensor and an ir remote. ",
    tags: ["Arduino", "Alarm", "IR Remote", "Tiny RTC", "C++"],
    githubUrl: "https://github.com/Obscurely/ArduinoAlarm",
    featured: false,
  },
};
