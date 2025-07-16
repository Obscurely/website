import { Post } from "@lib/blog";
import { DESCRIPTION } from "./metadata";

export const generateBlogPostJsonLd = (slug: string, post: Post) => {
  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `https://adriancrismaruc.com/blog/${slug}`,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    inLanguage: "en-US",
    keywords: post.frontmatter.tags,

    // Enhanced image object
    image: {
      "@type": "ImageObject",
      url:
        post.frontmatter.image ||
        "https://adriancrismaruc.com/og-blog-post.jpg",
      width: 1200,
      height: 630,
      caption: post.frontmatter.title,
    },

    // Reading time and word count
    timeRequired: post.readingTime,
    wordCount: post.content.split(" ").length,

    // Article description as abstract
    abstract: post.frontmatter.description,

    // Article section/category
    articleSection: post.frontmatter.tags?.join(", "),

    author: {
      "@type": "Person",
      name: "Adrian Crîșmaruc",
      url: "https://adriancrismaruc.com",
      email: "contact@adriancrismaruc.com",
      jobTitle: "Full-Stack Developer",
      image: "https://adriancrismaruc.com/og-home.jpg",
      sameAs: [
        "https://github.com/Obscurely",
        "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
      ],
    },

    publisher: {
      "@type": "Organization",
      name: "Adrian Crîșmaruc",
      url: "https://adriancrismaruc.com",
      logo: {
        "@type": "ImageObject",
        url: "https://adriancrismaruc.com/og-home.jpg",
        width: 1200,
        height: 630,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://adriancrismaruc.com/blog/${slug}`,
    },

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://adriancrismaruc.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://adriancrismaruc.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.frontmatter.title,
          item: `https://adriancrismaruc.com/blog/${slug}`,
        },
      ],
    },

    about:
      post.frontmatter.tags?.map((tag: string) => ({
        "@type": "Thing",
        name: tag,
      })) || [],

    isPartOf: {
      "@type": "Blog",
      name: "Adrian Crîșmaruc - Blog",
      url: "https://adriancrismaruc.com/blog",
      description: DESCRIPTION,
    },

    // License information
    license: "https://github.com/Obscurely/website/blob/main/LICENSE",

    // Audience
    audience: {
      "@type": "Audience",
      audienceType:
        "Developers, Cloud Engineers, Sys Admins, Tech Enthusiasts, DevOps Engineers, Tech Professionals",
    },
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
    jobTitle: "Full-Stack Developer",
    image: "https://adriancrismaruc.com/og-home.jpg",
    sameAs: [
      "https://github.com/Obscurely",
      "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
      "https://www.reddit.com/user/CrismarucAdrian/",
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adrian Crîșmaruc",
    url: "https://adriancrismaruc.com",
    logo: "https://adriancrismaruc.com/og-home.jpg",
  };

  return { blogPostJsonLd, personJsonLd, organizationJsonLd };
};
