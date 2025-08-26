export const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] || "https://adriancrismaruc.com";

export const SITE_CONFIG = {
  name: "Adrian Crîșmaruc",
  firstName: "Adrian",
  lastName: "Crîșmaruc",
  description: `Full-Stack Developer Adrian Crîșmaruc (Adrian Crismaruc) specializing in Rust, Python, React, TypeScript, Next.js, Flask and cloud-native technologies. AWS & Kubernetes certified with experience in building secure and scalable systems.`,
  blogDescription:
    "Practical tutorials, in-depth guides and insights on software development, Linux, servers and more. Created by Adrian Crîșmaruc, a Full-Stack Developer and IT enthusiast.",
  url: SITE_URL,
  author: {
    name: "Adrian Crîșmaruc",
    url: SITE_URL,
  },
  fromEmail: process.env["FROM_EMAIL"] || "contact@adriancrismaruc.com",
  toEmail: process.env["TO_EMAIL"] || "contact@adriancrismaruc.com",
  social: {
    github: "https://github.com/Obscurely",
    linkedIn: "https://www.linkedin.com/in/adrian-crismaruc",
    reddit: "https://www.reddit.com/user/CrismarucAdrian",
  },
  websiteSource: "https://github.com/Obscurely/website",
} as const;
