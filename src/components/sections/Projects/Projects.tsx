"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { projectsArray, filterCategories } from "./ProjectsData";
import { Project } from "@data/projects";

// Pre-compute featured projects outside the component
const featuredProjects: Project[] = projectsArray.filter((p) => p.featured);
const nonFeaturedProjects: Project[] = projectsArray.filter((p) => !p.featured);

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
    // Store the current number of visible projects before increasing
    const currentVisibleCount = visibleProjects;

    // Increase the number of visible projects
    setVisibleProjects((prev) => prev + 3);

    // Whether to scroll or not
    const shouldScroll = currentVisibleCount > 0;

    // Use setTimeout to ensure DOM has updated with new projects
    if (shouldScroll) {
      setTimeout(() => {
        // navbar height + some extra to make it centerd and work on other screen sizes
        const navbarHeight = 150;

        // Last currently visible project to scroll to
        const projectElements = document.querySelectorAll(
          "#projects .grid > div"
        );
        if (projectElements && projectElements[currentVisibleCount - 1]) {
          const lastCurrentProject = projectElements[currentVisibleCount - 1];
          const rect = lastCurrentProject?.getBoundingClientRect();

          // Scroll to position (accounting for navbar)
          window.scrollTo({
            top:
              window.scrollY +
              (rect !== undefined ? rect.bottom : 0) -
              navbarHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [visibleProjects]);

  // Memoize check to avoid recalculation during renders
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
