"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXHeadings } from "@common/mdx/headings";

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
 * Get a specific policy by slug
 */
export async function getPolicyBySlug(slug: string): Promise<MDXPolicy | null> {
  const filePath = path.join(POLICIES_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
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
    slug,
    frontmatter: data as PolicyFrontmatter,
    content,
    mdxContent,
  };
}
