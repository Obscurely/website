import { describe, expect, it } from "vitest";

import { Post } from "../../../lib/blog";
import { searchPosts } from "../../../utils/blog/search";

const mockPosts: Post[] = [
  {
    slug: "react-testing-guide",
    frontmatter: {
      title: "Complete React Testing Guide",
      description:
        "Learn comprehensive testing strategies for React applications",
      date: "2023-01-15",
      tags: ["react", "testing", "javascript", "jest"],
      featured: true,
      author: "John Doe",
      image: "/post1.jpg",
    },
    year: "2023",
    content: "Content about React testing",
    readingTime: "5 min read",
  },
  {
    slug: "vue-state-management",
    frontmatter: {
      title: "Vue.js State Management with Pinia",
      description: "Modern state management patterns in Vue applications",
      date: "2023-06-20",
      tags: ["vue", "pinia", "state-management", "javascript"],
      featured: false,
      author: "Jane Smith",
      image: "/post2.jpg",
    },
    year: "2023",
    content: "Content about Vue state management",
    readingTime: "8 min read",
  },
  {
    slug: "angular-components",
    frontmatter: {
      title: "Building Reusable Angular Components",
      description:
        "Best practices for creating maintainable Angular components",
      date: "2024-03-10",
      tags: ["angular", "components", "typescript", "architecture"],
      featured: true,
      author: "Bob Wilson",
      image: "/post3.jpg",
    },
    year: "2024",
    content: "Content about Angular components",
    readingTime: "6 min read",
  },
  {
    slug: "javascript-testing-fundamentals",
    frontmatter: {
      title: "JavaScript Testing Fundamentals",
      description: "Understanding the core concepts of JavaScript testing",
      date: "2024-01-05",
      tags: ["javascript", "testing", "fundamentals", "unit-tests"],
      featured: false,
      author: "Alice Johnson",
      image: "/post4.jpg",
    },
    year: "2024",
    content: "Content about JavaScript testing fundamentals",
    readingTime: "7 min read",
  },
];

describe("searchPosts", () => {
  it("should return all posts when query is empty", () => {
    const result = searchPosts(mockPosts, "");
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockPosts);
  });

  it("should return all posts when query is only whitespace", () => {
    const result = searchPosts(mockPosts, "   ");
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockPosts);
  });

  it("should search by description", () => {
    const result = searchPosts(mockPosts, "state management");
    expect(result).toHaveLength(1);
    expect(result[0]?.frontmatter.title).toBe(
      "Vue.js State Management with Pinia"
    );
  });

  it("should perform case-insensitive search", () => {
    const result = searchPosts(mockPosts, "JAVASCRIPT");
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.some((post) => post.frontmatter.tags.includes("javascript"))
    ).toBe(true);
  });

  it("should return multiple matches", () => {
    const result = searchPosts(mockPosts, "testing");
    expect(result).toHaveLength(2);
    expect(
      result.every(
        (post) =>
          post.frontmatter.title.toLowerCase().includes("testing") ||
          post.frontmatter.tags.includes("testing")
      )
    ).toBe(true);
  });

  it("should handle partial matches", () => {
    const result = searchPosts(mockPosts, "Angul");
    expect(result).toHaveLength(1);
    expect(result[0]?.frontmatter.title).toBe(
      "Building Reusable Angular Components"
    );
  });

  it("should return empty array when no matches found", () => {
    const result = searchPosts(mockPosts, "nonexistent framework");
    expect(result).toHaveLength(0);
  });

  it("should handle special characters in search query", () => {
    const result = searchPosts(mockPosts, "Vue.js");
    expect(result).toHaveLength(1);
    expect(result[0]?.frontmatter.title).toBe(
      "Vue.js State Management with Pinia"
    );
  });

  it("should work with empty posts array", () => {
    const result = searchPosts([], "react");
    expect(result).toHaveLength(0);
  });

  it("should prioritize closer matches", () => {
    // Test that exact title matches come before partial matches
    const result = searchPosts(mockPosts, "Complete React Testing Guide");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]?.frontmatter.title).toBe("Complete React Testing Guide");
  });

  it("should search across multiple fields simultaneously", () => {
    const result = searchPosts(mockPosts, "javascript");
    // Should find posts that have "javascript" in title, description, or tags
    expect(result.length).toBeGreaterThan(1);
  });
});
