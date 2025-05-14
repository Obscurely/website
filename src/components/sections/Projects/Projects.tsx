"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { projectsArray, filterCategories } from "./ProjectsData";

// Pre-compute featured projects outside the component
const featuredProjects = projectsArray.filter((p) => p.featured);
const nonFeaturedProjects = projectsArray.filter((p) => !p.featured);

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(3);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });

  // filtering
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return [...featuredProjects, ...nonFeaturedProjects];
    }
    if (activeCategory === "Featured") {
      return featuredProjects;
    }
    return projectsArray.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  // Only compute visible projects when needed
  const visibleProjectsList = useMemo(() => {
    return filteredProjects.slice(0, visibleProjects);
  }, [filteredProjects, visibleProjects]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleProjects(3);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleProjects((prev) => prev + 3);
  }, []);

  // Memoize this check to avoid recalculation during renders
  const hasMoreProjects = useMemo(
    () => visibleProjects < filteredProjects.length,
    [visibleProjects, filteredProjects.length]
  );

  return (
    <section id="projects" className="relative">
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

          <LoadMoreButton
            isInView={isInView}
            handleLoadMoreAction={handleLoadMore}
            disabled={!hasMoreProjects}
          />
        </div>
      </div>
    </section>
  );
}
