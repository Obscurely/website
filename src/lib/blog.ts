"use server";

import { compileMDX } from "next-mdx-remote/rsc";

import {
  Callout,
  CodeBlock,
  FeatureCard,
  FeatureGrid,
  QuickLinks,
  Separator,
  Step,
  StepGuide,
} from "@common/mdx";
import { MDXHeadings } from "@common/mdx/headings";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

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
 * Validate that a path is within the posts directory and safe to use
 */
function isValidPostPath(filePath: string): boolean {
  const resolvedPath = path.resolve(filePath);
  const resolvedPostsPath = path.resolve(POSTS_PATH);
  return resolvedPath.startsWith(resolvedPostsPath);
}

/**
 * Get all the blog posts parsed
 */
export async function getAllPosts(): Promise<Post[]> {
  // Get all years (directories)

  const yearDirs = fs.readdirSync(POSTS_PATH).filter((dir) => {
    const dirPath = path.join(POSTS_PATH, dir);
    if (!isValidPostPath(dirPath)) return false;
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      return fs.statSync(dirPath).isDirectory();
    } catch {
      return false;
    }
  });

  const allPosts: Post[] = [];

  // Loop through each year directory
  for (const year of yearDirs) {
    const yearPath = path.join(POSTS_PATH, year);
    if (!isValidPostPath(yearPath)) continue;

    let postFiles: string[];
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      postFiles = fs
        .readdirSync(yearPath)
        .filter((file) => file.endsWith(".mdx"));
    } catch {
      continue;
    }

    // Process each post file
    for (const file of postFiles) {
      const filePath = path.join(yearPath, file);
      if (!isValidPostPath(filePath)) continue;

      let fileContent: string;
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fileContent = fs.readFileSync(filePath, "utf8");
      } catch {
        continue;
      }

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
  // Sanitize slug to prevent path traversal
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  if (sanitizedSlug !== slug) {
    return null;
  }

  // Find the post in all year directories
  let yearDirs: string[];
  try {
    yearDirs = fs.readdirSync(POSTS_PATH).filter((dir) => {
      const dirPath = path.join(POSTS_PATH, dir);
      if (!isValidPostPath(dirPath)) return false;
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        return fs.statSync(dirPath).isDirectory();
      } catch {
        return false;
      }
    });
  } catch {
    return null;
  }

  for (const year of yearDirs) {
    const filePath = path.join(POSTS_PATH, year, `${sanitizedSlug}.mdx`);
    if (!isValidPostPath(filePath)) continue;

    let fileExists: boolean;
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fileExists = fs.existsSync(filePath);
    } catch {
      continue;
    }

    if (fileExists) {
      let fileContent: string;
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fileContent = fs.readFileSync(filePath, "utf8");
      } catch {
        continue;
      }

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
        slug: sanitizedSlug,
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
