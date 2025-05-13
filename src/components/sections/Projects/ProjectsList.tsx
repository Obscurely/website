"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";
import { projectsContainerVariants } from "./animations";

interface ProjectsListProps {
  isInView: boolean;
  activeCategory: string;
  visibleProjectsList: Project[];
}

export const ProjectsList = ({
  isInView,
  activeCategory,
  visibleProjectsList,
}: ProjectsListProps) => {
  return (
    <AnimatePresence mode="wait">
      {isInView && (
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={projectsContainerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {visibleProjectsList.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
