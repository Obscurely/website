import { Post } from "@lib/blog";

/**
 * @param index - Index of the loading post
 * @returns A dummy Post object for display while loading the actual posts in order to maintain layout consistency.
 */
const createLoadingPost = (index: number): Post => ({
  slug: `loading-${index}`,
  frontmatter: {
    title: "Loading...",
    description:
      "Exercitationem et voluptates possimus adipisci delectus delectus est. Aut non soluta iure similique ab unde. Quas excepturi omnis reiciendis repudiandae labore quam. Eum voluptas ut odio nulla est voluptate. Consequuntur enim voluptatem dolorem blanditiis. ",
    date: "2025-01-01T00:00:00.000Z",
    tags: ["Loading", "Please", "Wait"],
    image: "", // No image for loading state
    featured: false,
  },
  content: "",
  readingTime: "Loading...",
  year: "2025",
});

// Memoize loading posts array to avoid recreation on every render
export const LOADING_POSTS = Array.from({ length: 3 }, (_, index) =>
  createLoadingPost(index)
);
