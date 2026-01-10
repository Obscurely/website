import { Metadata } from "next";

import { SITE_CONFIG } from "@data/common/site";

export const solutionsPageMetadata: Metadata = {
  title: `Engineering Solutions | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.solutionsDescription,
  authors: [SITE_CONFIG.author],
  alternates: {
    canonical: `${SITE_CONFIG.url}/solutions`,
  },
  openGraph: {
    title: `Engineering Solutions | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.solutionsDescription,
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-solutions.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Engineering Solutions`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Engineering Solutions | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.solutionsDescription,
    images: "/og-solutions.jpg",
  },
};
