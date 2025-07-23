import { Post } from "@lib/blog";
import { Sidebar } from "./main/Sidebar";
import { Posts } from "./main/Posts";
import { FilterSidebar } from "./main/FilterSidebar";
import { SearchMobile } from "./main/SearchMobile";
import { FilterProvider } from "@contexts/blog/FilterContext";
import { MobileFilterDrawer } from "./main/MobileFilterDrawer";

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
            <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-8 xl:col-span-8">
              <Posts posts={filteredPosts} />
            </main>

            {/* Right sidebar - hidden on mobile */}
            <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
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
