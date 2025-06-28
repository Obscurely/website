import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Adrian Crîșmaruc",
  description:
    "Cookie policy for Adrian Crîșmaruc's website - privacy-first approach without tracking cookies.",
  openGraph: {
    title: "Cookie Policy | Adrian Crîșmaruc",
    description:
      "Cookie policy for Adrian Crîșmaruc's website - privacy-first approach without tracking cookies.",
    type: "website",
    url: "/cookies",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | Adrian Crîșmaruc",
    description:
      "Cookie policy for Adrian Crîșmaruc's website - privacy-first approach without tracking cookies.",
  },
};

export default async function Cookies() {
  const policy = await getPolicyBySlug("COOKIES");

  if (!policy) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c1327] text-slate-200">
      <Navbar />
      <main className="relative">
        <div className="relative z-10">
          <PolicyPage policy={policy} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
