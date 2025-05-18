import { useState, useRef, useMemo, useCallback, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3); // Default to 3, will be updated based on screen size
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });

  // Update projects per page based on screen size
  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth <= 639) {
        setProjectsPerPage(1); // Mobile: 1 project per page
      } else if (window.innerWidth <= 1023) {
        setProjectsPerPage(2); // Tablet: 2 projects per page
      } else {
        setProjectsPerPage(3); // Desktop: 3 projects per page
      }
    };

    // Set initial value
    updateProjectsPerPage();

    // Update on resize
    window.addEventListener("resize", updateProjectsPerPage);

    return () => {
      window.removeEventListener("resize", updateProjectsPerPage);
    };
  }, []);

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

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(filteredProjects.length / projectsPerPage),
    [filteredProjects.length, projectsPerPage]
  );

  // Reset to first page when category changes or projects per page changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory, projectsPerPage]);

  // Get current page projects
  const currentProjects = useMemo(() => {
    const startIndex = currentPage * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage, projectsPerPage]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentPage(0);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  return {
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
    projectsPerPage,
  };
};
