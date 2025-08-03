"use client";

import { memo, useState } from "react";

import dynamic from "next/dynamic";

import { Project } from "@data/portfolio/projects";
import { useMaxCardHeight } from "@hooks/portfolio/useMaxCardHeight";

import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
  activeCategory: string;
  currentProjects: Project[];
  currentPage: number;
  direction?: "next" | "prev" | null;
}

// Lazy load the animated version
const ProjectsListAnimated = dynamic(
  () =>
    import("./ProjectsListAnimated").then((mod) => ({
      default: mod.ProjectsListAnimated,
    })),
  {
    ssr: false,
    loading: () => null, // No loading component, we'll handle it ourselves
  }
);

const ProjectsListStatic = memo(({ currentProjects }: ProjectsListProps) => {
  const { maxHeight, registerCard } = useMaxCardHeight();

  return (
    <div className="min-h-[550px]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProjects.map((project, index) => (
          <div key={project.name}>
            <ProjectCard
              project={project}
              index={index}
              registerCard={registerCard}
              maxHeight={maxHeight}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

ProjectsListStatic.displayName = "ProjectsListStatic";

export const ProjectsList = memo((props: ProjectsListProps) => {
  const [isAnimatedLoaded, setIsAnimatedLoaded] = useState(false);

  return (
    <>
      {/* Static version - hidden once animated loads */}
      {!isAnimatedLoaded && <ProjectsListStatic {...props} />}

      {/* Animated version - loads lazily */}
      <div style={{ display: isAnimatedLoaded ? "block" : "none" }}>
        <ProjectsListAnimated
          {...props}
          onLoad={() => setIsAnimatedLoaded(true)}
        />
      </div>
    </>
  );
});

ProjectsList.displayName = "ProjectsList";
