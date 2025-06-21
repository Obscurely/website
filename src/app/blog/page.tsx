import { BlogPage } from "@components/blog/BlogPage";
import { Navbar } from "@components/blog/layout/Navbar";
import { BlogLoadingFallback } from "@components/blog/main/LoadingFallback";
import { Footer } from "@components/common/layout/Footer";
import { getAllPosts } from "@lib/blog";
import { Metadata } from "next";
import { Suspense } from "react";

const DESCRIPTION: string =
  "Practical tutorials, in-depth guides and insights on software development, Linux, servers and more.";

const KEYWORDS: string[] = [
  "blog",
  "software development",
  "tutorials",
  "guides",
  "cloud",
  "linux",
  "rust programming",
  "linux servers",
  "aws",
  "kubernetes",
];

export const metadata: Metadata = {
  title: "Blog | Adrian Crîșmaruc",
  description: DESCRIPTION,
  authors: [{ name: "Adrian Crîșmaruc" }],
  keywords: KEYWORDS,
  openGraph: {
    title: "Blog | Adrian Crîșmaruc",
    description: DESCRIPTION,
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Adrian Crîșmaruc",
    description: DESCRIPTION,
  },
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-200">
      <Navbar />
      <main className="relative">
        <div className="relative z-10">
          <Suspense fallback={<BlogLoadingFallback />}>
            <BlogPage initialPosts={posts} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
