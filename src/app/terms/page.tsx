import { PolicyPage } from "@components/policies/PolicyPage";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getPolicyBySlug } from "@lib/policies";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Adrian Crîșmaruc",
  description:
    "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
  openGraph: {
    title: "Terms of Service | Adrian Crîșmaruc",
    description:
      "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
    type: "website",
    url: "/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Adrian Crîșmaruc",
    description:
      "Legal terms for using Adrian Crîșmaruc's personal website, including intellectual property rights, user responsibilities, and dispute resolution.",
  },
};

export default async function TermsOfService() {
  const policy = await getPolicyBySlug("TOS");

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
