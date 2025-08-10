import { describe, expect, it, vi } from "vitest";

import { Post } from "../../../lib/blog";
import {
  type BlogFilters,
  filterPosts,
  getUniqueTagsAndYears,
} from "../../../utils/blog/filter";

// Mock the search module
vi.mock("@/utils/blog/search", () => ({
  searchPosts: vi.fn((posts, query) => {
    // Simple mock implementation - filter by title containing query
    return posts.filter((post: Post) =>
      post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
    );
  }),
}));

const mockPosts: Post[] = [
  {
    slug: "post-1",
    frontmatter: {
      title: "React Testing Best Practices",
      description: "Learn how to test React components effectively",
      date: "2023-01-15",
      tags: ["react", "testing", "javascript"],
      featured: true,
      author: "John Doe",
      image: "/post1.jpg",
    },
    year: "2023",
    content: "Content 1",
    readingTime: "5 min read",
  },
  {
    slug: "post-2",
    frontmatter: {
      title: "Vue.js State Management",
      description: "Managing state in Vue applications",
      date: "2023-06-20",
      tags: ["vue", "state-management", "javascript"],
      featured: false,
      author: "Jane Smith",
      image: "/post2.jpg",
    },
    year: "2023",
    content: "Content 2",
    readingTime: "8 min read",
  },
  {
    slug: "post-3",
    frontmatter: {
      title: "Angular Components Guide",
      description: "Building reusable Angular components",
      date: "2024-03-10",
      tags: ["angular", "components", "typescript"],
      featured: true,
      author: "Bob Wilson",
      image: "/post3.jpg",
    },
    year: "2024",
    content: "Content 3",
    readingTime: "6 min read",
  },
  {
    slug: "post-4",
    frontmatter: {
      title: "JavaScript Testing Fundamentals",
      description: "Understanding the basics of JavaScript testing",
      date: "2024-01-05",
      tags: ["javascript", "testing", "fundamentals"],
      featured: false,
      author: "Alice Johnson",
      image: "/post4.jpg",
    },
    year: "2024",
    content: "Content 4",
    readingTime: "7 min read",
  },
];

describe("filterPosts", () => {
  it("should return all posts when no filters are applied", () => {
    const result = filterPosts(mockPosts, {});
    expect(result).toHaveLength(4);
    expect(result).toEqual(mockPosts);
  });

  it("should filter posts by tag", () => {
    const filters: BlogFilters = { tag: "react" };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(1);
    expect(result[0]?.frontmatter.title).toBe("React Testing Best Practices");
  });

  it("should filter posts by year", () => {
    const filters: BlogFilters = { year: "2023" };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(2);
    expect(
      result.every(
        (post) => new Date(post.frontmatter.date).getFullYear() === 2023
      )
    ).toBe(true);
  });

  it("should filter posts by featured status", () => {
    const filters: BlogFilters = { featured: "true" };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(2);
    expect(result.every((post) => post.frontmatter.featured === true)).toBe(
      true
    );
  });

  it("should filter posts by search query", () => {
    const filters: BlogFilters = { search: "testing" };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(2);
    expect(
      result.every((post) =>
        post.frontmatter.title.toLowerCase().includes("testing")
      )
    ).toBe(true);
  });

  it("should apply multiple filters", () => {
    const filters: BlogFilters = {
      tag: "javascript",
      year: "2024",
      featured: "false",
    };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(1);
    expect(result[0]?.frontmatter.title).toBe(
      "JavaScript Testing Fundamentals"
    );
  });

  it("should return empty array when no posts match filters", () => {
    const filters: BlogFilters = {
      tag: "nonexistent",
      year: "2020",
    };
    const result = filterPosts(mockPosts, filters);

    expect(result).toHaveLength(0);
  });

  it("should handle empty posts array", () => {
    const result = filterPosts([], { tag: "react" });
    expect(result).toHaveLength(0);
  });

  it("should not mutate original posts array", () => {
    const originalLength = mockPosts.length;
    const filters: BlogFilters = { tag: "react" };

    filterPosts(mockPosts, filters);

    expect(mockPosts).toHaveLength(originalLength);
  });
});

describe("getUniqueTagsAndYears", () => {
  it("should extract unique tags and years from posts", () => {
    const result = getUniqueTagsAndYears(mockPosts);

    expect(result.allTags).toEqual([
      "angular",
      "components",
      "fundamentals",
      "javascript",
      "react",
      "state-management",
      "testing",
      "typescript",
      "vue",
    ]);

    expect(result.allYears).toEqual(["2024", "2023"]);
  });

  it("should handle empty posts array", () => {
    const result = getUniqueTagsAndYears([]);

    expect(result.allTags).toEqual([]);
    expect(result.allYears).toEqual([]);
  });

  it("should sort tags alphabetically and years descending", () => {
    const postsWithMoreDates: Post[] = [
      {
        slug: "post-1",
        frontmatter: {
          ...mockPosts[0]!.frontmatter,
          date: "2022-01-01",
          tags: ["zzz", "aaa", "mmm"],
        },
        year: "2022",
        content: mockPosts[0]!.content,
        readingTime: mockPosts[0]!.readingTime,
      },
      {
        slug: "post-2",
        frontmatter: {
          ...mockPosts[1]!.frontmatter,
          date: "2025-01-01",
          tags: ["bbb", "nnn"],
        },
        year: "2025",
        content: mockPosts[1]!.content,
        readingTime: mockPosts[1]!.readingTime,
      },
    ];

    const result = getUniqueTagsAndYears(postsWithMoreDates);

    expect(result.allTags).toEqual(["aaa", "bbb", "mmm", "nnn", "zzz"]);
    expect(result.allYears).toEqual(["2025", "2022"]);
  });

  it("should handle duplicate tags and years", () => {
    const postsWithDuplicates: Post[] = [
      {
        slug: "post-1",
        frontmatter: {
          ...mockPosts[0]!.frontmatter,
          date: "2023-01-01",
          tags: ["react", "testing", "react"],
        },
        year: "2023",
        content: mockPosts[0]!.content,
        readingTime: mockPosts[0]!.readingTime,
      },
      {
        slug: "post-2",
        frontmatter: {
          ...mockPosts[1]!.frontmatter,
          date: "2023-06-01",
          tags: ["testing", "vue"],
        },
        year: "2023",
        content: mockPosts[1]!.content,
        readingTime: mockPosts[1]!.readingTime,
      },
    ];

    const result = getUniqueTagsAndYears(postsWithDuplicates);

    expect(result.allTags).toEqual(["react", "testing", "vue"]);
    expect(result.allYears).toEqual(["2023"]);
  });
});
