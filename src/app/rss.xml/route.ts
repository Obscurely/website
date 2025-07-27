import { NextResponse } from "next/server";

import { SITE_CONFIG } from "@data/common/site";
import { Post, getAllPosts } from "@lib/blog";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

function generateRssXml(posts: Post[]): string {
  const rssItems = posts
    .slice(0, 20) // Limit to 20 most recent posts
    .map((post) => {
      const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();

      // Create categories from tags
      const categories = post.frontmatter.tags
        .map((tag: string) => `    <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `  <item>
    <title>${escapeXml(post.frontmatter.title)}</title>
    <link>${postUrl}</link>
    <description>${escapeXml(post.frontmatter.description)}</description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${postUrl}</guid>
    <author>${SITE_CONFIG.toEmail} (${SITE_CONFIG.name})</author>
${categories}
    ${post.frontmatter.image ? `<enclosure url="${SITE_CONFIG.url}${post.frontmatter.image}" type="image/jpeg" />` : ""}
  </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} - Blog</title>
    <link>${SITE_CONFIG.url}/blog</link>
    <description>${escapeXml(SITE_CONFIG.blogDescription)}</description>
    <language>en-us</language>
    <managingEditor>${SITE_CONFIG.toEmail} (${SITE_CONFIG.name})</managingEditor>
    <webMaster>${SITE_CONFIG.toEmail} (${SITE_CONFIG.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_CONFIG.url}/profile.webp</url>
      <title>${escapeXml(SITE_CONFIG.name)} - Blog</title>
      <link>${SITE_CONFIG.url}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
${rssItems}
  </channel>
</rss>`;
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    const rssXml = generateRssXml(posts);

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
