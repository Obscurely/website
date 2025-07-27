import { SITE_CONFIG } from "@data/common/site";

import { Project } from "./types";

type ProjectKey =
  | "RekoSearch"
  | "Falion"
  | "EStash"
  | "website"
  | "PbthalArchiveManager"
  | "RustTemplate"
  | "DiscordBot"
  | "PyPassMan"
  | "ArchObscurely"
  | "NixObscurely"
  | "SharpPlayer"
  | "neovim";

const projects: Record<ProjectKey, Project> = {
  RekoSearch: {
    name: "RekoSearch",
    link: "https://rekosearch.com",
    shortDescription:
      "An AI-powered file search engine that understands the content of your files and enables simultaneous semantic search",
  },
  Falion: {
    name: "Falion",
    link: `${SITE_CONFIG.social.github}/falion`,
    shortDescription:
      "Tool and library for interacting with programming resources fast and efficiently using the CLI or GUI",
  },
  EStash: {
    name: "EStash",
    link: `${SITE_CONFIG.social.github}/EStash`,
    shortDescription:
      "Encrypted digital vault with the capability to install stored files at specific stored paths",
  },
  website: {
    name: "website",
    link: `${SITE_CONFIG.social.github}/website`,
    shortDescription:
      "The static Next.js tech website portfolio and blog you are currently on",
  },
  PbthalArchiveManager: {
    name: "Pbthal-Archive-Manager",
    link: `${SITE_CONFIG.social.github}/Pbthal-Archive-Manager`,
    shortDescription:
      "Easily download music from Pbthal's archive and get properly made albums",
  },
  RustTemplate: {
    name: "RustTemplate",
    link: `${SITE_CONFIG.social.github}/RustTemplate`,
    shortDescription:
      "GitHub Template for cross-platform Rust projects with scripts to automatically customize it and CI & CD pipelines",
  },
  DiscordBot: {
    name: "Discord-Bot",
    link: `${SITE_CONFIG.social.github}/Discord-Bot`,
    shortDescription:
      "A discord bot with basic admin commands and a music player",
  },
  PyPassMan: {
    name: "PyPassMan",
    link: `${SITE_CONFIG.social.github}/PyPassMan`,
    shortDescription:
      "Cross-platform Password Manager with a QT frontend, simple, but I learned a lot from building it",
  },
  ArchObscurely: {
    name: "ArchObscurely",
    link: `${SITE_CONFIG.social.github}/ArchObscurely`,
    shortDescription:
      "Automated, fully customized and configured Arch Linux Install for my Machine",
  },
  NixObscurely: {
    name: "NixObscurely",
    link: `${SITE_CONFIG.social.github}/NixObscurely`,
    shortDescription:
      "Automated, fully customized and configured NixOS Install for my Machine",
  },
  SharpPlayer: {
    name: "Sharp-Player",
    link: `${SITE_CONFIG.social.github}/Sharp-Player`,
    shortDescription: "Simple audio player made in C# ",
  },
  neovim: {
    name: "neovim",
    link: `${SITE_CONFIG.social.github}/neovim`,
    shortDescription:
      "My extensive neovim configuration, making it better than an IDE.",
  },
};

export default projects;
