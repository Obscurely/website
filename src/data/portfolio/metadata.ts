import { SITE_CONFIG } from "@data/common/site";
import { Metadata } from "next";

export const pageMetadata: Metadata = {
  title: `${SITE_CONFIG.name} - Full-Stack Developer`,
  description: SITE_CONFIG.description,
  authors: [SITE_CONFIG.author],
  alternates: {
    canonical: SITE_CONFIG.url,
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
    title: `${SITE_CONFIG.name} - Full-Stack Developer`,
    description: SITE_CONFIG.description,
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Full-Stack Developer`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Full-Stack Developer`,
    description: SITE_CONFIG.description,
    images: ["/og-home.jpg"],
  },
};
