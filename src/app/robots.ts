import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://adriancrismaruc.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Prevent crawling API routes
          "/_next/", // Prevent crawling Next.js internal files
          "/admin/", // Prevent crawling admin areas (if any)
          "*.json", // Prevent crawling JSON files
          "/private/", // Prevent crawling private content (if any)
        ],
      },
      {
        userAgent: "GPTBot", // OpenAI's web crawler
        disallow: "/", // Block AI training crawlers if desired
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl bot
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
