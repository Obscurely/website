import { Hero } from "@portfolio/sections/hero/Hero";
import { About } from "@portfolio/sections/about/About";
import { Projects } from "@portfolio/sections/projects/Projects";
import { Blog } from "@portfolio/sections/blog/Blog";
import { Contact } from "@portfolio/sections/contact/Contact";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { Footer } from "@common/layout/Footer/Footer";
import { Toaster } from "sonner";
import { Background } from "@components/portfolio/sections/hero/Background";
import { Metadata } from "next";

const DESCRIPTION: string =
  "Full-Stack Developer specializing in Rust, Python, React, TypeScript, Next.js, Flask and cloud-native technologies. AWS & Kubernetes certified with experience in building secure and scalable systems.";

const KEYWORDS: string[] = [
  "adrian crismaruc",
  "full stack developer",
  "rust developer",
  "python developer",
  "react developer",
  "aws certified",
  "kubernetes certified",
  "cloud native engineer",
  "devops engineer",
  "software engineer",
];

export const metadata: Metadata = {
  title: "Adrian Crîșmaruc",
  description: DESCRIPTION,
  authors: [{ name: "Adrian Crîșmaruc" }],
  keywords: KEYWORDS,
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "Adrian Crîșmaruc - Blog RSS Feed",
        },
      ],
    },
  },
  openGraph: {
    title: "Adrian Crîșmaruc",
    description: DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "Adrian Crîșmaruc",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Adrian Crîșmaruc - Full-Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Crîșmaruc",
    description: DESCRIPTION,
    // creator: "@",
    images: ["/og-home.jpg"],
  },

  // JSON-LD structured data
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Adrian Crîșmaruc",
      jobTitle: "Full-Stack Developer",
      description: DESCRIPTION,
      url: "https://adriancrismaruc.com",
      sameAs: [
        "https://github.com/Obscurely",
        "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
        "https://www.reddit.com/user/CrismarucAdrian/",
      ],
      knowsAbout: KEYWORDS,
    }),
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-200">
      <Background />
      <Navbar isMain={true} />
      <main className="relative">
        <div className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Blog />
          <Contact />
        </div>
      </main>
      <Footer isMain={true} />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1e293b",
            border: "1px solid #475569",
            color: "#f1f5f9",
          },
        }}
      />
    </div>
  );
}
