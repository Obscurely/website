"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";
import { carouselVariants, cardVariants } from "./animations";

interface ProjectsListProps {
  isInView: boolean;
  activeCategory: string;
  currentProjects: Project[];
  currentPage: number;
}

export const ProjectsList = memo(
  ({
    isInView,
    activeCategory,
    currentProjects,
    currentPage,
  }: ProjectsListProps) => {
    return (
      <div className="min-h-[550px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={carouselVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="exit"
          >
            {currentProjects.map((project, idx) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                custom={idx}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  isInView={isInView}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

ProjectsList.displayName = "ProjectsList";
