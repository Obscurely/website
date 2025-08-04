"use client";

import { memo, useEffect, useRef } from "react";

import { Project } from "@data/portfolio/projects";
import { useMaxCardHeight } from "@hooks/portfolio/useMaxCardHeight";
import { LazyMotion, domAnimation, m } from "framer-motion";

import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
  activeCategory: string;
  currentProjects: Project[];
  currentPage: number;
  direction?: "next" | "prev" | null;
  onLoad?: () => void;
}

export const ProjectsListAnimated = memo(
  ({
    activeCategory,
    currentProjects,
    currentPage,
    direction = "next",
    onLoad,
  }: ProjectsListProps) => {
    const { maxHeight, registerCard } = useMaxCardHeight();
    const previousCategory = useRef<string | null>(null);
    const isFirstRender = useRef(true);

    // Check if this is a category change
    const isCategoryChange = previousCategory.current !== activeCategory;

    // Determine if we should apply translateY animation
    const shouldAnimateY = isCategoryChange && !isFirstRender.current;

    // mark component as loaded
    useEffect(() => {
      onLoad?.();
    }, [onLoad]);

    // Update refs after render
    useEffect(() => {
      if (isCategoryChange) {
        previousCategory.current = activeCategory;
        isFirstRender.current = false;
      }
    }, [activeCategory, isCategoryChange]);

    const pageKey = `${activeCategory}-${currentPage}`;

    return (
      <div className="min-h-[550px]">
        <LazyMotion features={domAnimation}>
          <m.div
            key={pageKey}
            initial={{
              opacity: 1,
              x: isCategoryChange ? 0 : direction === "prev" ? -300 : 300,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              ease: "linear",
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentProjects.map((project, index) => (
              <m.div
                key={`${activeCategory}-${project.name}`}
                initial={{
                  opacity: 1,
                  y: shouldAnimateY ? 30 : 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: Math.min(0.1 * (index % 3), 0.2),
                  ease: "linear",
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  registerCard={registerCard}
                  maxHeight={maxHeight}
                />
              </m.div>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    );
  }
);

ProjectsListAnimated.displayName = "ProjectsListAnimated";
