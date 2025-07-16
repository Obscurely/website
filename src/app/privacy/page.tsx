import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

const DESCRIPTION =
  "Privacy policy and data handling practices for Adrian Crîșmaruc's website.";

export const metadata: Metadata = {
  title: "Privacy Policy | Adrian Crîșmaruc",
  authors: [{ name: "Adrian Crîșmaruc", url: "https://adriancrismaruc.com" }],
  description: DESCRIPTION,
  alternates: {
    canonical: "https://adriancrismaruc.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Adrian Crîșmaruc",
    description:
      "Privacy policy and data handling practices for Adrian Crîșmaruc's website.",
    type: "website",
    url: "https://adriancrismaruc.com/privacy",
    siteName: "Privacy Policy | Adrian Crîșmaruc",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Adrian Crîșmaruc",
    description:
      "Privacy policy and data handling practices for Adrian Crîșmaruc's website.",
  },
  robots: {
    index: false, // Don't index policy pages
    follow: true,
  },
};

export default async function Privacy() {
  const policy = await getPolicyBySlug("PRIVACY");

  if (!policy) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: DESCRIPTION,
    url: "https://adriancrismaruc.com/privacy",
    author: {
      "@type": "Person",
      name: "Adrian Crîșmaruc",
      url: "https://adriancrismaruc.com",
    },
    publisher: {
      "@type": "Person",
      name: "Adrian Crîșmaruc",
      url: "https://adriancrismaruc.com",
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Adrian Crîșmaruc",
      url: "https://adriancrismaruc.com",
    },
  };

  return (
    <>
      <Script
        id="privacy-jsonld"
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
