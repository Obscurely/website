"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";

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
          <ProjectCard
            key={project.name}
            project={project}
            index={project.index}
            isInView={isInView}
          />
        )),
      [visibleProjectsList, isInView]
    );

    return (
      <div className="min-h-[400px]">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projectCards}
        </motion.div>
      </div>
    );
  }
);
