"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@data/portfolio/projects";
import { ProjectCard } from "./ProjectCard";
import { carouselVariants, cardVariants } from "./animations";
import { useMaxCardHeight } from "@hooks/portfolio/useMaxCardHeight";

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
