import { Metadata } from "next";

export const DESCRIPTION: string =
  "Practical tutorials, in-depth guides and insights on software development, Linux, servers and more.";

export const pageMetadata: Metadata = {
  title: "Blog | Adrian Crîșmaruc",
  description: DESCRIPTION,
  authors: [{ name: "Adrian Crîșmaruc", url: "https://adriancrismaruc.com" }],
  alternates: {
    canonical: "https://adriancrismaruc.com/blog",
    types: {
      "application/rss+xml": [
        {
          url: "https://adriancrismaruc.com/rss.xml",
          title: "Adrian Crîșmaruc - Blog RSS Feed",
        },
      ],
    },
  },
  openGraph: {
    title: "Blog | Adrian Crîșmaruc",
    description: DESCRIPTION,
    type: "website",
    url: "https://adriancrismaruc.com/blog",
    siteName: "Blog | Adrian Crîșmaruc",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Adrian Crîșmaruc - Blog",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Adrian Crîșmaruc",
    description: DESCRIPTION,
    images: ["/og-blog.jpg"],
  },
};
