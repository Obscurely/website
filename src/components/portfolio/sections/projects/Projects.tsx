"use client";

import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { ProjectsNavigation } from "./ProjectsNavigation";
import { useProjects } from "@hooks/portfolio/useProjects";

/**
 * Projects component that displays a list of projects with filtering and pagination.
 *
 * @returns A section containing the projects list with navigation controls.
 */
export const Projects = () => {
  const {
    ref,
    isInView,
    activeCategory,
    handleCategoryChange,
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    filterCategories,
  } = useProjects();

  return (
    <section id="projects" className="relative">
      <div
        ref={ref}
        className="relative z-0 w-full overflow-hidden bg-slate-900/40 pt-16 pb-20"
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

          {/* Projects list - fixed height carousel */}
          <ProjectsList
            isInView={isInView}
            activeCategory={activeCategory}
            currentProjects={currentProjects}
            currentPage={currentPage}
          />

          {/* Navigation controls */}
          <ProjectsNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={goToPrevPage}
            onNextPage={goToNextPage}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
};
