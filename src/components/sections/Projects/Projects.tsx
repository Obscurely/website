"use client";

import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { useProjects } from "@hooks/useProjects";

/**
 * Projects component that displays a list of projects with filtering and load more functionality.
 *
 * @returns A section containing the projects list.
 */
export const Projects = () => {
  const {
    ref,
    isInView,
    activeCategory,
    handleCategoryChange,
    handleLoadMore,
    visibleProjectsList,
    hasMoreProjects,
    filterCategories,
  } = useProjects();

  return (
    <section id="projects" className="relative">
      <div
        ref={ref}
        className="relative w-full overflow-hidden pt-16 pb-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 15, 30, 0.92), rgba(10, 17, 35, 0.95), rgba(8, 15, 30, 0.92))",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          {/* Header and description */}
          <ProjectsHeader isInView={isInView} />

          {/* Filter tab bar categories */}
          <ProjectsFilter
            filterCategories={filterCategories}
            activeCategory={activeCategory}
            handleCategoryChangeAction={handleCategoryChange}
            isInView={isInView}
          />

          {/* Projects list */}
          <ProjectsList
            isInView={isInView}
            activeCategory={activeCategory}
            visibleProjectsList={visibleProjectsList}
          />

          {/* Load more button */}
          <LoadMoreButton
            isInView={isInView}
            handleLoadMoreAction={handleLoadMore}
            disabled={!hasMoreProjects}
          />
        </div>
      </div>
    </section>
  );
};
