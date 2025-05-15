"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
  isInView: boolean;
  activeCategory: string;
  visibleProjectsList: Project[];
}

export const ProjectsList = memo(
  ({ isInView, activeCategory, visibleProjectsList }: ProjectsListProps) => {
    const prevCountRef = useRef(0);
    const newItemsRef = useRef<HTMLDivElement>(null);

    // Track when new projects are added
    useEffect(() => {
      if (
        visibleProjectsList.length > prevCountRef.current &&
        newItemsRef.current
      ) {
        // Only scroll to new items if they were added by clicking "Load More"
        if (prevCountRef.current > 0) {
          // Smooth scroll to the first new item
          newItemsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
      prevCountRef.current = visibleProjectsList.length;
    }, [visibleProjectsList.length]);

    // Determine which items are newly added
    const isNewItem = useCallback(
      (index: number) =>
        index >= prevCountRef.current - 3 && index < visibleProjectsList.length,
      [visibleProjectsList.length]
    );

    return (
      <div className="min-h-[400px]">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {visibleProjectsList.map((project, idx) => (
              <div
                key={project.name}
                ref={
                  isNewItem(idx) && idx === prevCountRef.current
                    ? newItemsRef
                    : null
                }
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  isInView={isInView}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }
);
