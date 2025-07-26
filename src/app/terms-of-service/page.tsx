import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { SITE_CONFIG } from "@data/common/site";

const DESCRIPTION = `Legal terms for using ${SITE_CONFIG.name}'s personal website, including intellectual property rights, user responsibilities, and dispute resolution.`;

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  authors: [SITE_CONFIG.author],
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-of-service`,
  },
  openGraph: {
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_CONFIG.url}/terms-of-service`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
  },
  robots: {
    index: false, // Don't index policy pages
    follow: true,
  },
};

export default async function TermsOfService() {
  const policy = await getPolicyBySlug("TOS");

  if (!policy) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description: DESCRIPTION,
    url: `${SITE_CONFIG.url}/terms-of-service`,
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
        id="terms-jsonld"
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
