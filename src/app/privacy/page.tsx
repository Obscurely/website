import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Adrian Crîșmaruc",
  description:
    "Privacy policy and data handling practices for Adrian Crîșmaruc's website.",
  openGraph: {
    title: "Privacy Policy | Adrian Crîșmaruc",
    description:
      "Privacy policy and data handling practices for Adrian Crîșmaruc's website.",
    type: "website",
    url: "/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Adrian Crîșmaruc",
    description:
      "Privacy policy and data handling practices for Adrian Crîșmaruc's website.",
  },
};

export default async function Privacy() {
  const policy = await getPolicyBySlug("PRIVACY");

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
