"use client";

import { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";
import { containerVariants } from "./animations";

interface ProjectsListProps {
  isInView: boolean;
  activeCategory: string;
  visibleProjectsList: Project[];
}

/**
 * ProjectsList component that displays a list of projects with animation.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 * @param activeCategory - The currently selected category.
 * @param visibleProjectsList - An array of projects to display.
 */
export const ProjectsList = memo(
  ({ isInView, activeCategory, visibleProjectsList }: ProjectsListProps) => {
    // Calculate local index for animation purposes
    const getLocalIndex = useCallback((globalIndex: number): number => {
      // This ensures each row starts with indices 0, 1, 2 for proper staggering
      return globalIndex % 3;
    }, []);

    return (
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {visibleProjectsList.map((project, idx) => (
              <div key={project.name}>
                <ProjectCard
                  project={project}
                  index={getLocalIndex(idx)}
                  isInView={isInView}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

ProjectsList.displayName = "ProjectsList";
