import { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { Background } from "@components/portfolio/sections/hero/Background";
import {
  organizationJsonLd,
  personJsonLd,
  portfolioJsonLd,
} from "@data/portfolio/jsonld";
import { pageMetadata } from "@data/portfolio/metadata";
import { Toaster } from "@portfolio/helpers/Toaster";
import { About } from "@portfolio/sections/about/About";
import { Blog } from "@portfolio/sections/blog/Blog";
import { Contact } from "@portfolio/sections/contact/Contact";
import { Hero } from "@portfolio/sections/hero/Hero";
import { Projects } from "@portfolio/sections/projects/Projects";

export const metadata: Metadata = pageMetadata;

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personJsonLd,
            organizationJsonLd,
            portfolioJsonLd,
          ]),
        }}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-200">
        <Background />
        <Navbar isMain={true} />
        <main className="relative">
          <div className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <Blog />
            <Contact />
          </div>
        </main>
        <Footer isMain={true} />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1e293b",
              border: "1px solid #475569",
              color: "#f1f5f9",
            },
          }}
        />
      </div>
    </>
  );
}
