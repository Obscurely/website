"use client";

import { useRef, useState } from "react";
import { Post } from "@lib/blog";
import { useSearchPosts } from "@hooks/blog/useSearchPosts";
import { BlogSidebar } from "./BlogSidebar";
import { BlogContent } from "./BlogContent";
import { BlogFilterSidebar } from "./BlogFilterSidebar";
import { Dialog } from "@headlessui/react";
import { useInView } from "framer-motion";

interface BlogPageProps {
  initialPosts: Post[];
}

export function BlogPage({ initialPosts }: BlogPageProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.1 });

  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    allTags,
    allYears,
  } = useSearchPosts(initialPosts);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Tailwind
  const SIDEBAR_W = "w-72";
  const GAP_X = "8";

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <Dialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto bg-slate-800 px-6 py-8 shadow-xl">
          <BlogFilterSidebar
            searchQuery={searchQuery}
            setSearchQueryAction={setSearchQuery}
            tags={allTags}
            selectedTag={selectedTag}
            setSelectedTagAction={setSelectedTag}
            years={allYears}
          />
        </Dialog.Panel>
      </Dialog>

      <main className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-4 lg:pt-4 lg:pr-[calc(288px+3.5rem)] lg:pl-[calc(288px+3.5rem)] xl:px-8 xl:pr-[calc(288px+6rem)] xl:pl-[calc(288px+6rem)] 2xl:px-16 2xl:pr-[calc(288px+11rem)] 2xl:pl-[calc(288px+11rem)]">
        <div ref={headerRef}>
          <BlogContent posts={initialPosts} isInView={isInView} />
        </div>

        {/* MOBILE: search field + filter button */}
        <div className="mt-10 flex items-center justify-between gap-4 lg:hidden">
          <input
            type="search"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-md bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:ring focus:ring-indigo-500/50 focus:outline-none"
          />
          <button
            onClick={() => setDrawerOpen(true)}
            className="shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring focus:ring-indigo-500/50 focus:outline-none"
          >
            Filters
          </button>
        </div>
      </main>

      <aside
        className={`fixed top-24 left-8 hidden lg:block xl:left-18 2xl:left-35 ${SIDEBAR_W} h-[calc(100vh-6rem)] overflow-y-auto px-${GAP_X}`}
      >
        <BlogSidebar />
      </aside>

      <aside
        className={`fixed top-24 right-8 hidden lg:block xl:right-18 2xl:right-35 ${SIDEBAR_W} h-[calc(100vh-6rem)] overflow-y-auto px-${GAP_X}`}
      >
        <BlogFilterSidebar
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
          tags={allTags}
          selectedTag={selectedTag}
          setSelectedTagAction={setSelectedTag}
          years={allYears}
        />
      </aside>
    </div>
  );
}
