import { BlogPage } from "@components/blog/BlogPage";
import { BlogLoadingFallback } from "@components/blog/main/LoadingFallback";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { getAllPosts } from "@lib/blog";
import { filterPosts, getUniqueTagsAndYears } from "@utils/blog/filter";
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

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    tag?: string;
    year?: string;
    featured?: string;
  }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const allPosts = await getAllPosts();
  const filteredPosts = filterPosts(allPosts, resolvedSearchParams);
  const { allTags, allYears } = getUniqueTagsAndYears(allPosts);

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
              <BlogPage
                filteredPosts={filteredPosts}
                allTags={allTags}
                allYears={allYears}
                currentFilters={resolvedSearchParams}
              />
            </Suspense>
          </div>
        </main>
        <Footer isBlog={true} />
      </div>
    </>
  );
}
