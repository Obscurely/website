import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SITE_CONFIG } from "@data/common/site";

// Primary font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// UI fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Define viewport settings for better responsiveness
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s`,
  },
  description: SITE_CONFIG.description,
  authors: [SITE_CONFIG.author],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,

  // metabase url
  metadataBase: new URL(SITE_CONFIG.url),

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
    types: {
      "application/rss+xml": [
        {
          url: `${SITE_CONFIG.url}/rss.xml`,
          title: `${SITE_CONFIG.name} - Blog RSS Feed`,
        },
      ],
    },
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",

  // Open Graph defaults (can be overridden by pages)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg", // default OG image
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Full-Stack Developer`,
      },
    ],
  },

  // Twitter defaults
  twitter: {
    card: "summary_large_image",
  },

  // Additional meta tags
  other: {
    "theme-color": "#0f172a", // slate-950 background
    "color-scheme": "dark",
  },

  // category
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${inter.className} flex min-h-screen flex-col font-sans antialiased`}
      >
        <div className="flex flex-1 flex-col">{children}</div>
        <Script src="/animations.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
