// src/data/portfolio/experience.tsx
export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  website?: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "rekosearch",
    company: "RekoSearch",
    role: "Founder & Developer",
    duration: "04/2024 – Present",
    website: "https://rekosearch.com",
    description:
      "I developed an AI-powered semantic search SaaS for multimedia content discovery.",
    technologies: [
      "Rust",
      "Python (Flask)",
      "React",
      "AWS",
      "Kubernetes",
      "Terraform",
      "Jenkins",
    ],
    achievements: [
      "I've developed and managed a fully fledged SaaS from conception through beta testing with selected users.",
      "I've integrated numerous AWS services, packaged and deployed multiple applications on Kubernetes, consistently targeting the most cost-effective and efficient options available.",
      "I've implemented a file processing model and hosting solution that essentially allows for infinite scalability, with any significant hosting costs being paid by the user. (Homepage on S3, Dashboard on Kubernetes, Processing on-demand on AWS Fargate).",
      "I've reduced deployment times by 80% by learning and using Terraform to provision production AWS and Kubernetes cloud infrastructure.",
      "I've implemented observability using Grafana and CloudWatch, enabling instant, detailed error alerts that allow me to resolve user issues promptly and efficiently.",
    ],
  },
];
