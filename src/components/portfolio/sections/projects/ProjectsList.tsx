"use client";

import { memo } from "react";

import { cardVariants, carouselVariants } from "@data/portfolio/animations";
import { Project } from "@data/portfolio/projects";
import { useMaxCardHeight } from "@hooks/portfolio/useMaxCardHeight";
import { AnimatePresence, motion } from "framer-motion";

import { ProjectCard } from "./ProjectCard";

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
    const { maxHeight, registerCard } = useMaxCardHeight();

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
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  isInView={isInView}
                  registerCard={registerCard}
                  maxHeight={maxHeight}
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
