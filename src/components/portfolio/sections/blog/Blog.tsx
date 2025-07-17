import Link from "next/link";
import { Button } from "@ui/button";
import { IconArrowRight } from "@tabler/icons-react";
// import { PostsList } from "./PostsList";

/**
 * Blog component that fetches and displays the latest blog posts.
 *
 * @returns The Blog component that displays the latest blog posts.
 */
export const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-main-bg-light relative z-0 overflow-hidden pt-16 pb-20"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="data-[state=once]:animate-in fade-in slide-in-from-bottom-15 mb-16 text-center opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100"
          data-state="once"
        >
          <h2 className="mb-0.5 inline-block bg-blue-400 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
            Latest Posts
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-blue-400"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Practical tutorials, in-depth guides and insights on software
            development, Linux, servers and more.
          </p>
        </div>

        {/* Blog posts grid */}
        {/* <PostsList /> HACK: Keeping this disabled since there are not posts yet, there is better performance without it */}
        <div
          className="data-[state=once]:animate-in fade-in slide-in-from-bottom-15 pb-16 text-center opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100"
          data-state="once"
        >
          <p className="text-lg text-slate-400">No blog posts available yet.</p>
        </div>

        {/* View all posts button */}
        <div
          className="data-[state=once]:animate-in fade-in slide-in-from-bottom-50 flex flex-col items-center opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100"
          data-state="once"
        >
          <Link href="/blog" passHref>
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 will-change-transform">
              <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
                View All Posts
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
