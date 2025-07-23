import { Post } from "@lib/blog";
import { searchPosts } from "./search";

export interface BlogFilters {
  search?: string;
  tag?: string;
  year?: string;
  featured?: string;
}

/**
 * Filters blog posts based on the provided filters.
 */
export const filterPosts = (posts: Post[], filters: BlogFilters): Post[] => {
  let filtered = [...posts];

  if (filters.tag) {
    filtered = filtered.filter((post) =>
      post.frontmatter.tags.includes(filters.tag!)
    );
  }

  if (filters.year) {
    filtered = filtered.filter(
      (post) =>
        new Date(post.frontmatter.date).getFullYear().toString() ===
        filters.year
    );
  }

  if (filters.featured === "true") {
    filtered = filtered.filter((post) => post.frontmatter.featured);
  }

  if (filters.search) {
    filtered = searchPosts(filtered, filters.search);
  }

  return filtered;
};

/**
 * Extracts unique tags and years from the posts.
 */
export const getUniqueTagsAndYears = (posts: Post[]) => {
  const tags = new Set<string>();
  const years = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tags.add(tag));
    const year = new Date(post.frontmatter.date).getFullYear().toString();
    years.add(year);
  });

  return {
    allTags: Array.from(tags).sort(),
    allYears: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
  };
};
