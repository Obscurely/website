import { Project } from "./types";

type ProjectKey =
  | "RekoSearch"
  | "Falion"
  | "EStash"
  | "Rustsomware"
  | "Portfolio";

const projects: Record<ProjectKey, Project> = {
  RekoSearch: {
    name: "RekoSearch",
    link: "https://rekosearch.com",
    shortDescription:
      "An AI-powered file search engine that understands the content of your files and enables simultaneous semantic search",
  },
  Falion: {
    name: "Falion",
    link: "https://github.com/Obscurely/falion",
    shortDescription:
      "Tool and library for interacting with programming resources fast and efficiently using the CLI or GUI",
  },
  EStash: {
    name: "EStash",
    link: "https://github.com/Obscurely/EStash",
    shortDescription:
      "Encrypted digital vault with the capability to install stored files at specific stored paths",
  },
  Rustsomware: {
    name: "Rustsomware",
    link: "https://github.com/Obscurely/Rustsomware",
    shortDescription: "Ransomware type virus encrypting files with AES-128",
  },
  Portfolio: {
    name: "Portfolio",
    link: "https://github.com/Obscurely/Portfolio",
    shortDescription:
      "The static Next.js tech website portfolio you are currently on",
  },
};

export default projects;
