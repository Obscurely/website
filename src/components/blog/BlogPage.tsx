"use client";

import { useRef, useState } from "react";
import { Post } from "@lib/blog";
import { useSearchPosts } from "@hooks/blog/useSearchPosts";
import { BlogSidebar } from "./BlogSidebar";
import { BlogContent } from "./BlogContent";
import { BlogFilterSidebar } from "./BlogFilterSidebar";
import { Dialog, DialogPanel } from "@headlessui/react";
import { motion, useInView } from "framer-motion";
import { useFilter } from "@hooks/blog/useFilter";
import { BlogSearchMobile } from "./BlogSearchMobile";

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

  const {
    selectedYear,
    setSelectedYear,
    isFeatured,
    setIsFeatured,
    applyFilters,
    clearFilters,
  } = useFilter({
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-900 pt-16">
      {/* Mobile filter drawer */}
      <Dialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto bg-slate-800 px-6 py-8 shadow-xl">
          <BlogFilterSidebar
            searchQuery={searchQuery}
            setSearchQueryAction={setSearchQuery}
            tags={allTags}
            selectedTag={selectedTag}
            setSelectedTagAction={setSelectedTag}
            years={allYears}
            selectedYear={selectedYear}
            setSelectedYearAction={setSelectedYear}
            isFeatured={isFeatured}
            setIsFeaturedAction={setIsFeatured}
            applyFiltersAction={applyFilters}
            clearFiltersAction={clearFilters}
            setDrawerOpenAction={setDrawerOpen}
          />
        </DialogPanel>
      </Dialog>

      {/* Main container */}
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile search and filter controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlogSearchMobile
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            applyFilters={applyFilters}
            setDrawerOpen={setDrawerOpen}
            handleClear={clearFilters}
          />
        </motion.div>

        {/* Desktop layout with grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-14 lg:gap-10">
          {/* Left sidebar - hidden on mobile */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:col-span-3 lg:block xl:col-span-3"
          >
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 xl:col-span-8"
            ref={headerRef}
          >
            <BlogContent posts={initialPosts} isInView={isInView} />
          </motion.main>

          {/* Right sidebar - hidden on mobile */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:col-span-3 lg:block xl:col-span-3"
          >
            <div className="sticky top-24">
              <BlogFilterSidebar
                searchQuery={searchQuery}
                setSearchQueryAction={setSearchQuery}
                tags={allTags}
                selectedTag={selectedTag}
                setSelectedTagAction={setSelectedTag}
                years={allYears}
                selectedYear={selectedYear}
                setSelectedYearAction={setSelectedYear}
                isFeatured={isFeatured}
                setIsFeaturedAction={setIsFeatured}
                applyFiltersAction={applyFilters}
                clearFiltersAction={clearFilters}
                setDrawerOpenAction={setDrawerOpen}
              />
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
