import { BlogPage } from "@blog/BlogPage";
import { getAllPosts } from "@lib/blog";
import { Metadata } from "next";

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

  return <BlogPage initialPosts={posts} />;
}
