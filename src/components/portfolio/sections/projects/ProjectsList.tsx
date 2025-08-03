"use client";

import { memo, useEffect, useRef } from "react";

import { Project } from "@data/portfolio/projects";
import { useMaxCardHeight } from "@hooks/portfolio/useMaxCardHeight";
import { animated, easings, useTransition } from "@react-spring/web";

import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
  activeCategory: string;
  currentProjects: Project[];
  currentPage: number;
  direction?: "next" | "prev" | null;
}

export const ProjectsList = memo(
  ({
    activeCategory,
    currentProjects,
    currentPage,
    direction = "next",
  }: ProjectsListProps) => {
    const { maxHeight, registerCard } = useMaxCardHeight();
    const previousCategory = useRef<string | null>(null);
    const isFirstRender = useRef(true);

    // Check if this is a category change
    const isCategoryChange = previousCategory.current !== activeCategory;

    // Determine if we should apply translateY animation
    const shouldAnimateY = isCategoryChange && !isFirstRender.current;

    // Update refs after render
    useEffect(() => {
      if (isCategoryChange) {
        previousCategory.current = activeCategory;
        isFirstRender.current = false;
      }
    }, [activeCategory, isCategoryChange]);

    // Transition for individual card animations
    const cardTransitions = useTransition(currentProjects, {
      keys: (project: Project) => `${activeCategory}-${project.name}`,
      from: {
        opacity: 1,
        transform: shouldAnimateY ? "translateY(30px)" : "translateY(0px)",
      },
      enter: (_, index) => ({
        opacity: 1,
        transform: "translateY(0px)",
        delay: Math.min(100 * (index % 3), 200),
        config: {
          easing: easings.linear,
        },
      }),
      onStart: () => {
        previousCategory.current = activeCategory;
      },
    });

    // Transition for page changes
    const pageTransitions = useTransition(currentPage, {
      keys: `${activeCategory}-${currentPage}`,
      from: {
        opacity: 1,
        transform: isCategoryChange
          ? "translateX(0px)"
          : direction === "prev"
            ? "translateX(-300px)"
            : "translateX(300px)",
      },
      enter: {
        opacity: 1,
        transform: "translateX(0px)",
        config: {
          easing: easings.linear,
        },
      },
    });

    return (
      <div className="min-h-[550px]">
        <animated.div>
          {pageTransitions((pageStyle, page) => (
            <animated.div
              key={page}
              style={pageStyle}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cardTransitions((cardStyle, project, _, index) => (
                <animated.div key={project.name} style={cardStyle}>
                  <ProjectCard
                    project={project}
                    index={index}
                    registerCard={registerCard}
                    maxHeight={maxHeight}
                  />
                </animated.div>
              ))}
            </animated.div>
          ))}
        </animated.div>
      </div>
    );
  }
);

ProjectsList.displayName = "ProjectsList";
