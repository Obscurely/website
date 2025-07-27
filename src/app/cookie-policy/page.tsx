import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { Navbar } from "@common/layout/Navbar/Navbar";
import { Footer } from "@components/common/layout/Footer/Footer";
import { PolicyPage } from "@components/policies/PolicyPage";
import { SITE_CONFIG } from "@data/common/site";
import { getPolicyBySlug } from "@lib/policies";

const DESCRIPTION = `Cookie policy for ${SITE_CONFIG.name}'s website - privacy-first approach without tracking cookies.`;

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_CONFIG.name}`,
  authors: [SITE_CONFIG.author],
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_CONFIG.url}/cookie-policy`,
  },
  openGraph: {
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_CONFIG.url}/cookie-policy`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
  },
  robots: {
    index: false, // Don't index policy pages
    follow: true,
  },
};

export default async function Cookies() {
  const policy = await getPolicyBySlug("COOKIES");

  if (!policy) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cookies Policy",
    description: DESCRIPTION,
    url: `${SITE_CONFIG.url}/cookie-policy`,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <Script
        id="cookies-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-[#0c1327] text-slate-200">
        <Navbar />
        <main className="relative">
          <div className="relative z-10">
            <PolicyPage policy={policy} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
