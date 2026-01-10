import { SITE_CONFIG } from "@data/common/site";
import { Post } from "@lib/blog";

export const generateBlogPostJsonLd = (slug: string, post: Post) => {
  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    inLanguage: "en-US",
    keywords: post.frontmatter.tags,

    // Enhanced image object
    image: {
      "@type": "ImageObject",
      url: post.frontmatter.image || `${SITE_CONFIG.url}/og-blog-post.jpg`,
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
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.toEmail,
      jobTitle: "Full-Stack Developer",
      image: `${SITE_CONFIG.url}/og-home.jpg`,
      sameAs: [
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.linkedIn,
        SITE_CONFIG.social.reddit,
        SITE_CONFIG.social.upwork,
      ],
    },

    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/og-home.jpg`,
        width: 1200,
        height: 630,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_CONFIG.url}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.frontmatter.title,
          item: `${SITE_CONFIG.url}/blog/${slug}`,
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
      name: `${SITE_CONFIG.name} - Blog`,
      url: `${SITE_CONFIG.url}/blog`,
      description: SITE_CONFIG.blogDescription,
    },

    // License information
    license: `${SITE_CONFIG.websiteSource}/blob/main/LICENSE`,

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
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: "Full-Stack Developer",
    image: `${SITE_CONFIG.url}/og-home.jpg`,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.linkedIn,
      SITE_CONFIG.social.reddit,
      SITE_CONFIG.social.upwork,
    ],
    subjectOf: {
      "@type": "VideoObject",
      name: `Introduction to ${SITE_CONFIG.name}`,
      description:
        "Introduction to my software & cloud engineering skill and background.",
      thumbnailUrl: `${SITE_CONFIG.url}/og-home.jpg`,
      uploadDate: "2025-09-29",
      contentUrl: SITE_CONFIG.videoIntroductionUrl,
      embedUrl: SITE_CONFIG.videoIntroductionUrl.replace("watch?v=", "embed/"),
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/og-home.jpg`,
  };

  return { blogPostJsonLd, personJsonLd, organizationJsonLd };
};
