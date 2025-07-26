import { PostPage } from "@blog/post/PostPage";
import { getPostBySlug, getAllPosts } from "@lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Footer } from "@components/common/layout/Footer/Footer";
import { Toaster } from "sonner";
import { Navbar } from "@common/layout/Navbar/Navbar";
import { generateBlogPostJsonLd } from "@data/blog/postJsonld";
import Script from "next/script";
import { SITE_CONFIG } from "@data/common/site";

interface BlogPostParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Post Not Found | ${SITE_CONFIG.name}`,
    };
  }

  return {
    title: `${post.frontmatter.title}`,
    description: post.frontmatter.description,
    authors: [SITE_CONFIG.author],
    keywords: post.frontmatter.tags,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${slug}`,
      types: {
        "application/rss+xml": [
          {
            url: `${SITE_CONFIG.url}/rss.xml`,
            title: `${SITE_CONFIG.name} - Blog RSS Feed`,
          },
        ],
      },
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [SITE_CONFIG.name],
      tags: post.frontmatter.tags,
      siteName: SITE_CONFIG.name,
      images: post.frontmatter.image
        ? [
            {
              url: post.frontmatter.image,
              alt: post.frontmatter.title,
            },
          ]
        : [
            {
              url: "/og-blog-post.jpg", // Default blog post OG image
              width: 1200,
              height: 630,
              alt: post.frontmatter.title,
            },
          ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image || "/og-blog-post.jpg",
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: BlogPostParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { blogPostJsonLd, personJsonLd, organizationJsonLd } =
    generateBlogPostJsonLd(slug, post);

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            blogPostJsonLd,
            organizationJsonLd,
            personJsonLd,
          ]),
        }}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-[#0c1327] text-slate-200">
        <Navbar isBlog={true} />
        <main className="relative">
          <div className="relative z-10">
            <PostPage post={post} />
          </div>
        </main>
        <Footer isBlog={true} />
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
