"use server";

import { compileMDX } from "next-mdx-remote/rsc";
import { unstable_cache } from "next/cache";

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

const SOLUTIONS_PATH = path.join(process.cwd(), "content/solutions");

export interface SolutionFrontmatter {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  duration: string;
  deliveryTime: string;
  category: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  available?: boolean;
  techStack: string[];
}

export interface Solution {
  slug: string;
  frontmatter: SolutionFrontmatter;
  content: string;
  readingTime: string;
}

export interface MDXSolution extends Solution {
  mdxContent: React.ReactElement;
}

/**
 * Validate that a path is within the solutions directory and safe to use
 */
function isValidSolutionPath(filePath: string): boolean {
  const resolvedPath = path.resolve(filePath);
  const resolvedSolutionsPath = path.resolve(SOLUTIONS_PATH);
  return resolvedPath.startsWith(resolvedSolutionsPath);
}

/**
 * Get all solutions parsed (internal function)
 */
async function _getAllSolutions(): Promise<Solution[]> {
  // Check if solutions directory exists
  try {
    if (!fs.existsSync(SOLUTIONS_PATH)) {
      return [];
    }
  } catch {
    return [];
  }

  let solutionFiles: string[];
  try {
    solutionFiles = fs
      .readdirSync(SOLUTIONS_PATH)
      .filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }

  const allSolutions: Solution[] = [];

  // Process each solution file
  for (const file of solutionFiles) {
    const filePath = path.join(SOLUTIONS_PATH, file);
    if (!isValidSolutionPath(filePath)) continue;

    let fileContent: string;
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fileContent = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const { data, content } = matter(fileContent);

    // Skip unavailable solutions in production
    if (process.env.NODE_ENV === "production" && data["available"] === false) {
      continue;
    }

    const slug = file.replace(/\.mdx$/, "");
    const readingTimeResult = readingTime(content);

    allSolutions.push({
      slug,
      frontmatter: data as SolutionFrontmatter,
      content,
      readingTime: readingTimeResult.text,
    });
  }

  // Sort solutions by featured status, then by price (lowest first)
  return allSolutions.sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    return a.frontmatter.price - b.frontmatter.price;
  });
}

/**
 * Get all solutions parsed (cached)
 */
export const getAllSolutions = unstable_cache(
  _getAllSolutions,
  ["all-solutions", process.env.NODE_ENV || "development"],
  {
    tags: ["solutions"],
    revalidate: process.env.NODE_ENV === "production" ? 86400 : 30, // 24 hours in production, 30 seconds in development
  }
);

/**
 * Get solution data by slug (cached individually)
 */
const _getSolutionDataBySlug = async (
  slug: string
): Promise<Solution | null> => {
  const allSolutions = await getAllSolutions();
  return allSolutions.find((solution) => solution.slug === slug) || null;
};

export const getSolutionDataBySlug = unstable_cache(
  _getSolutionDataBySlug,
  ["solution-data"],
  {
    tags: ["solutions"],
    revalidate: 86400, // 24 hours cache for individual solutions
  }
);

/**
 * Get a specific solution with compiled MDX (not cached)
 */
export async function getSolutionBySlug(
  slug: string
): Promise<MDXSolution | null> {
  const solutionData = await getSolutionDataBySlug(slug);

  if (!solutionData) {
    return null;
  }

  // Compile MDX fresh each time (React elements can't be cached)
  const { content: mdxContent } = await compileMDX({
    source: solutionData.content,
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
    ...solutionData,
    mdxContent,
  };
}
