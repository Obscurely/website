import Fuse from "fuse.js";
import { Post } from "@lib/blog";

/**
 * @param posts - Array of blog posts to search through.
 * @param query - Search query string.
 * @returns Filtered array of posts that match the search query.
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return posts;

  const fuse = new Fuse(posts, {
    keys: ["frontmatter.title", "frontmatter.description", "frontmatter.tags"],
    threshold: 0.4,
    includeMatches: true,
  });

  const results = fuse.search(query);
  return results.map((result) => result.item);
}
