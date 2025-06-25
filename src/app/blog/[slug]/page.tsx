import { PostPage } from "@blog/post/PostPage";
import { getPostBySlug, getAllPosts } from "@lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@components/blog/layout/Navbar";
import { Footer } from "@components/common/layout/Footer";
import { Toaster } from "sonner";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Adrian Crîșmaruc",
    };
  }

  return {
    title: `${post.frontmatter.title} | Adrian Crîșmaruc`,
    description: post.frontmatter.description,
    authors: [{ name: "Adrian Crîșmaruc" }],
    keywords: post.frontmatter.tags,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Adrian Crîșmaruc"],
      tags: post.frontmatter.tags,
      images: post.frontmatter.image
        ? [
            {
              url: post.frontmatter.image,
              alt: post.frontmatter.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image,
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
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c1327] text-slate-200">
      <Navbar />
      <main className="relative">
        <div className="relative z-10">
          <PostPage post={post} />
        </div>
      </main>
      <Footer />
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
  );
}
