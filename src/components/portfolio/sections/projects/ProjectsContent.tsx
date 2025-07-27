"use client";

import { useProjects } from "@hooks/portfolio/useProjects";

import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { ProjectsNavigation } from "./ProjectsNavigation";

export const ProjectsContent = () => {
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
    <div ref={ref}>
      {/* Filter tab bar categories */}
      <ProjectsFilter
        filterCategories={filterCategories}
        activeCategory={activeCategory}
        handleCategoryChangeAction={handleCategoryChange}
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
      />
    </div>
  );
};
