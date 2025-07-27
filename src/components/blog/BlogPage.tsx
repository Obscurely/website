import { FilterProvider } from "@contexts/blog/FilterContext";
import { Post } from "@lib/blog";

import { FilterSidebar } from "./main/FilterSidebar";
import { MobileFilterDrawer } from "./main/MobileFilterDrawer";
import { Posts } from "./main/Posts";
import { SearchMobile } from "./main/SearchMobile";
import { Sidebar } from "./main/Sidebar";

interface BlogPageProps {
  filteredPosts: Post[];
  allTags: string[];
  allYears: string[];
  currentFilters: {
    search?: string;
    tag?: string;
    year?: string;
    featured?: string;
  };
}

/**
 * BlogPage component serves as the main layout for the blog section,
 */
export function BlogPage({
  filteredPosts,
  allTags,
  allYears,
  currentFilters,
}: BlogPageProps) {
  return (
    <div className="relative py-16">
      {/* Mobile title - hidden on lg and up */}
      <div className="mb-0 lg:hidden">
        <h1 className="bg-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          Blog
        </h1>
        <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-blue-400"></div>
      </div>

      <FilterProvider currentFilters={currentFilters}>
        {/* Mobile filter drawer */}
        <MobileFilterDrawer allTags={allTags} allYears={allYears} />

        {/* Main container */}
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          {/* Mobile search and filter controls */}
          <div>
            <SearchMobile />
          </div>

          {/* Desktop layout with grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-14 lg:gap-10">
            {/* Left sidebar - hidden on mobile */}
            <aside
              className="hidden lg:col-span-3 lg:block xl:col-span-3"
              aria-label="Info Sidebar"
            >
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </aside>

            {/* Main content */}
            <section className="lg:col-span-8 xl:col-span-8">
              <Posts posts={filteredPosts} />
            </section>

            {/* Right sidebar - hidden on mobile */}
            <aside
              className="hidden lg:col-span-3 lg:block xl:col-span-3"
              aria-label="Filter Sidebar"
            >
              <div className="sticky top-24">
                <FilterSidebar tags={allTags} years={allYears} />
              </div>
            </aside>
          </div>
        </div>
      </FilterProvider>
    </div>
  );
}
