"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { projectsArray, filterCategories } from "./ProjectsData";
import { Project } from "@data/projects";

// Pre-compute featured projects
const featuredProjects: Project[] = projectsArray.filter((p) => p.featured);
const nonFeaturedProjects: Project[] = projectsArray.filter((p) => !p.featured);

/**
 * Projects component that displays a list of projects with filtering and load more functionality.
 *
 * @returns A section containing the projects list.
 */
export const Projects = () => {
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
    // Update state
    setActiveCategory(category);
    setVisibleProjects(3);
  }, []);

  const handleLoadMore = useCallback(() => {
    // Store the current number of visible projects before increasing
    const currentVisibleCount = visibleProjects;

    // Increase the number of visible projects
    setVisibleProjects((prev) => prev + 3);

    // Only scroll if we already have visible projects
    if (currentVisibleCount > 0) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        // Use a second requestAnimationFrame to ensure the browser has painted
        requestAnimationFrame(() => {
          // Get all project elements
          const projectElements = document.querySelectorAll(
            "#projects .grid > div"
          );

          // Find the last currently visible project
          if (projectElements && projectElements[currentVisibleCount - 1]) {
            const lastCurrentProject = projectElements[currentVisibleCount - 1];
            const rect = lastCurrentProject?.getBoundingClientRect();

            // Calculate the navbar height dynamically
            const navbar = document.querySelector("nav") || {
              clientHeight: 80,
            };
            const navbarHeight = navbar.clientHeight + 70; // Add some padding

            // Scroll to position
            window.scrollTo({
              top:
                window.scrollY +
                (rect !== undefined ? rect.bottom : 0) -
                navbarHeight,
              behavior: "smooth",
            });
          }
        });
      });
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
