import { useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { Project } from "@data/projects";
import { projects, categories } from "@data/projects";

// Convert projects to array and sort featured first
const projectsArray = Object.values(projects).sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
);

// Add "All" and "Featured" to the categories for filtering
export const filterCategories = ["All", "Featured", ...categories];

// Pre-compute featured projects
const featuredProjects: Project[] = projectsArray.filter((p) => p.featured);
const nonFeaturedProjects: Project[] = projectsArray.filter((p) => !p.featured);

export const useProjects = () => {
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

  return {
    ref,
    isInView,
    activeCategory,
    handleCategoryChange,
    handleLoadMore,
    visibleProjectsList,
    hasMoreProjects,
    filterCategories,
  };
};
