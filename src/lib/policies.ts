"use server";

import { compileMDX } from "next-mdx-remote/rsc";

import { MDXHeadings } from "@common/mdx/headings";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const POLICIES_PATH = path.join(process.cwd(), ".");

export interface PolicyFrontmatter {
  title: string;
  lastUpdated: string;
  description: string;
}

export interface Policy {
  slug: string;
  frontmatter: PolicyFrontmatter;
  content: string;
}

export interface MDXPolicy extends Policy {
  mdxContent: React.ReactElement;
}

/**
 * Validate that a path is within the policies directory and safe to use
 */
function isValidPolicyPath(filePath: string): boolean {
  const resolvedPath = path.resolve(filePath);
  const resolvedPoliciesPath = path.resolve(POLICIES_PATH);
  return resolvedPath.startsWith(resolvedPoliciesPath);
}

/**
 * Get a specific policy by slug
 */
export async function getPolicyBySlug(slug: string): Promise<MDXPolicy | null> {
  // Sanitize slug to prevent path traversal
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  if (sanitizedSlug !== slug) {
    return null;
  }

  const filePath = path.join(POLICIES_PATH, `${sanitizedSlug}.md`);

  if (!isValidPolicyPath(filePath)) {
    return null;
  }

  let fileExists: boolean;
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fileExists = fs.existsSync(filePath);
  } catch {
    return null;
  }

  if (!fileExists) {
    return null;
  }

  let fileContent: string;
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(fileContent);

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
    },
  });

  return {
    slug: sanitizedSlug,
    frontmatter: data as PolicyFrontmatter,
    content,
    mdxContent,
  };
}
