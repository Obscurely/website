"use client";

import { useProjects } from "@hooks/portfolio/useProjects";

import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { ProjectsNavigation } from "./ProjectsNavigation";

export const ProjectsContent = () => {
  const {
    activeCategory,
    handleCategoryChange,
    currentProjects,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    filterCategories,
    direction,
  } = useProjects();

  return (
    <div>
      {/* Filter tab bar categories */}
      <ProjectsFilter
        filterCategories={filterCategories}
        activeCategory={activeCategory}
        handleCategoryChangeAction={handleCategoryChange}
      />

      {/* Projects list - fixed height carousel */}
      <ProjectsList
        activeCategory={activeCategory}
        currentProjects={currentProjects}
        currentPage={currentPage}
        direction={direction}
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
