"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { ProjectsBackground } from "./ProjectsBackground";
import { projectsArray, filterCategories } from "./ProjectsData";
import { Project } from "@data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 projects initially
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });

  // Memoize filtered projects with featured ones first
  const filteredProjects = useMemo(() => {
    let filtered = projectsArray.filter((project: Project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Featured") return project.featured;
      return project.category === activeCategory;
    });

    // If showing all projects, ensure featured ones appear first
    if (activeCategory === "All") {
      filtered = [
        ...filtered.filter((p) => p.featured),
        ...filtered.filter((p) => !p.featured),
      ];
    }

    return filtered;
  }, [activeCategory]);

  // Memoize visible projects
  const visibleProjectsList = useMemo(() => {
    return filteredProjects.slice(0, visibleProjects);
  }, [filteredProjects, visibleProjects]);

  // Use callback for category change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleProjects(6); // Reset to show 6 projects when changing category
  }, []);

  // Use callback for loading more projects
  const handleLoadMore = useCallback(() => {
    setVisibleProjects((prev) => prev + 6);
  }, []);

  return (
    <section id="projects" className="relative">
      <ProjectsBackground />

      <div
        ref={ref}
        className="relative overflow-hidden bg-slate-950 pt-16 pb-20"
      >
        <div className="relative container mx-auto px-4 sm:px-6">
          <ProjectsHeader isInView={isInView} />

          <ProjectsFilter
            filterCategories={filterCategories}
            activeCategory={activeCategory}
            handleCategoryChangeAction={handleCategoryChange}
            isInView={isInView}
          />

          <ProjectsList
            isInView={isInView}
            activeCategory={activeCategory}
            visibleProjectsList={visibleProjectsList}
          />

          {visibleProjects < filteredProjects.length && (
            <LoadMoreButton
              isInView={isInView}
              handleLoadMoreAction={handleLoadMore}
            />
          )}
        </div>
      </div>
    </section>
  );
}
