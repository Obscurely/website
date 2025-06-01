import { PostPage } from "@blog/post/PostPage";
import { getPostBySlug, getAllPosts } from "@lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

  return <PostPage post={post} />;
}
