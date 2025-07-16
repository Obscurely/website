import { Metadata } from "next";

export const DESCRIPTION: string =
  "Full-Stack Developer Adrian Crîșmaruc (Adrian Crismaruc) specializing in Rust, Python, React, TypeScript, Next.js, Flask and cloud-native technologies. AWS & Kubernetes certified with experience in building secure and scalable systems.";

export const pageMetadata: Metadata = {
  title: "Adrian Crîșmaruc - Full-Stack Developer",
  description: DESCRIPTION,
  authors: [{ name: "Adrian Crîșmaruc", url: "https://adriancrismaruc.com" }],
  alternates: {
    canonical: "https://adriancrismaruc.com/",
    types: {
      "application/rss+xml": [
        {
          url: "https://adriancrismaruc.com/rss.xml",
          title: "Adrian Crîșmaruc - Blog RSS Feed",
        },
      ],
    },
  },
  openGraph: {
    title: "Adrian Crîșmaruc - Full-Stack Developer",
    description: DESCRIPTION,
    type: "website",
    url: "https://adriancrismaruc.com",
    siteName: "Adrian Crîșmaruc",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Adrian Crîșmaruc - Full-Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Crîșmaruc - Full-Stack Developer",
    description: DESCRIPTION,
    images: ["/og-home.jpg"],
  },
};
