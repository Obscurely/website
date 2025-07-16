import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Terms of Service | Adrian Crîșmaruc",
  authors: [{ name: "Adrian Crîșmaruc", url: "https://adriancrismaruc.com" }],
  description:
    "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
  alternates: {
    canonical: "https://adriancrismaruc.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Adrian Crîșmaruc",
    description:
      "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
    type: "website",
    url: "https://adriancrismaruc.com/terms",
    siteName: "Terms of Service | Adrian Crîșmaruc",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Adrian Crîșmaruc",
    description:
      "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
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
    description:
      "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
    url: "https://adriancrismaruc.com/terms",
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
