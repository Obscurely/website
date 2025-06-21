"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import {
  Callout,
  CodeBlock,
  FeatureGrid,
  FeatureCard,
  StepGuide,
  Step,
  QuickLinks,
  Separator,
} from "@blog/mdx";
import { MDXHeadings } from "@blog/mdx/headings";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  author?: string;
  draft?: boolean;
  featured?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  year: string;
}

export interface MDXPost extends Post {
  mdxContent: React.ReactElement;
}

/**
 * Get all the blog posts parsed
 */
export async function getAllPosts(): Promise<Post[]> {
  // Get all years (directories)
  const yearDirs = fs
    .readdirSync(POSTS_PATH)
    .filter((dir) => fs.statSync(path.join(POSTS_PATH, dir)).isDirectory());

  const allPosts: Post[] = [];

  // Loop through each year directory
  for (const year of yearDirs) {
    const yearPath = path.join(POSTS_PATH, year);
    const postFiles = fs
      .readdirSync(yearPath)
      .filter((file) => file.endsWith(".mdx"));

    // Process each post file
    for (const file of postFiles) {
      const filePath = path.join(yearPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      // Skip draft posts in production
      if (process.env.NODE_ENV === "production" && data["draft"] === true) {
        continue;
      }

      const slug = file.replace(/\.mdx$/, "");
      const readingTimeResult = readingTime(content);

      allPosts.push({
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: readingTimeResult.text,
        year,
      });
    }
  }

  // Sort posts by date (newest first)
  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a specific post content
 */
export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  // Find the post in all year directories
  const yearDirs = fs
    .readdirSync(POSTS_PATH)
    .filter((dir) => fs.statSync(path.join(POSTS_PATH, dir)).isDirectory());

  for (const year of yearDirs) {
    const filePath = path.join(POSTS_PATH, year, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      // Skip draft posts in production
      if (process.env.NODE_ENV === "production" && data["draft"] === true) {
        return null;
      }

      const readingTimeResult = readingTime(content);

      // Compile MDX
      const { content: mdxContent } = await compileMDX({
        source: content,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: "github-dark-high-contrast",
                  keepBackground: true,
                },
              ],
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
            ],
            remarkPlugins: [remarkGfm],
          },
        },
        components: {
          ...MDXHeadings,
          Callout,
          pre: CodeBlock,
          FeatureGrid,
          FeatureCard,
          StepGuide,
          Step,
          QuickLinks,
          Separator,
        },
      });

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: readingTimeResult.text,
        mdxContent,
        year,
      };
    }
  }

  return null;
}
