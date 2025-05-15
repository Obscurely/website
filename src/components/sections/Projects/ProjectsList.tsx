"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";
import { projectsContainerVariants } from "./animations";

interface ProjectsListProps {
  isInView: boolean;
  activeCategory: string;
  visibleProjectsList: Project[];
}

export const ProjectsList = memo(
  ({ isInView, activeCategory, visibleProjectsList }: ProjectsListProps) => {
    // Memoize the project cards to prevent unnecessary re-renders
    const projectCards = useMemo(
      () =>
        visibleProjectsList.map((project) => (
          <ProjectCard key={project.name} project={project} />
        )),
      [visibleProjectsList]
    );

    return (
      <div className="min-h-[400px]">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={projectsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projectCards}
        </motion.div>
      </div>
    );
  }
);
