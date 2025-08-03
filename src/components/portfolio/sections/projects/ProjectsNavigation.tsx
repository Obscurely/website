"use client";

import { memo } from "react";

import dynamic from "next/dynamic";

import { IconChevronLeft, IconChevronRight } from "@data/portfolio/icons/icons";
import { Button } from "@ui/button";

interface ProjectsNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const ProjectsNavigationAnimated = dynamic(
  () =>
    import("./ProjectsNavigationAnimated").then((mod) => ({
      default: mod.ProjectsNavigationAnimated,
    })),
  {
    loading: () => (
      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="flex-shrink-0">
          <Button
            className="bg-slate-850 h-12 w-12 rounded-full p-3 text-white shadow-lg opacity-50 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            disabled
          >
            <IconChevronLeft
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </div>
        <div className="min-w-[2rem] flex-shrink-0 text-center text-sm text-slate-400 sm:text-sm md:text-sm">
          <span className="font-mono font-medium text-cyan-400">1</span>
          <span className="font-mono font-medium"> / 5</span>
        </div>
        <div className="flex-shrink-0">
          <Button
            className="bg-slate-850 h-12 w-12 rounded-full p-3 text-white shadow-lg opacity-50 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            disabled
          >
            <IconChevronRight
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export const ProjectsNavigation = memo((props: ProjectsNavigationProps) => {
  return <ProjectsNavigationAnimated {...props} />;
});

ProjectsNavigation.displayName = "ProjectsNavigation";
