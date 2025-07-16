import { BlogPage } from "@components/blog/BlogPage";
import { BlogLoadingFallback } from "@components/blog/main/LoadingFallback";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getAllPosts } from "@lib/blog";
import { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@data/blog/metadata";
import Script from "next/script";
import {
  blogBreadcrumbJsonLd,
  blogJsonLd,
  blogWebsiteJsonLd,
  organizationJsonLd,
  personJsonLd,
} from "@data/blog/blogJsonld";

export const metadata: Metadata = pageMetadata;

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            blogJsonLd,
            blogWebsiteJsonLd,
            blogBreadcrumbJsonLd,
            organizationJsonLd,
            personJsonLd,
          ]),
        }}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-[#0c1327] text-slate-200">
        <Navbar isBlog={true} />
        <main className="relative">
          <div className="relative z-10">
            <Suspense fallback={<BlogLoadingFallback />}>
              <BlogPage initialPosts={posts} />
            </Suspense>
          </div>
        </main>
        <Footer isBlog={true} />
      </div>
    </>
  );
}
