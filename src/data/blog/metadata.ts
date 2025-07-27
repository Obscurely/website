import { Metadata } from "next";

import { SITE_CONFIG } from "@data/common/site";

export const pageMetadata: Metadata = {
  title: `Blog | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.blogDescription,
  authors: [SITE_CONFIG.author],
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
    types: {
      "application/rss+xml": [
        {
          url: `${SITE_CONFIG.url}/rss.xml`,
          title: `${SITE_CONFIG.name} - Blog RSS Feed`,
        },
      ],
    },
  },
  openGraph: {
    title: `Blog | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.blogDescription,
    type: "website",
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Blog`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.blogDescription,
    images: ["/og-blog.jpg"],
  },
};
