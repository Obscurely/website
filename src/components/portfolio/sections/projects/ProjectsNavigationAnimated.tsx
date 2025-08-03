"use client";

import { memo, useState } from "react";

import { IconChevronLeft, IconChevronRight } from "@data/portfolio/icons/icons";
import { animated, useSpring } from "@react-spring/web";
import { Button } from "@ui/button";

interface ProjectsNavigationAnimatedProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const ProjectsNavigationAnimated = memo(
  ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
  }: ProjectsNavigationAnimatedProps) => {
    // Ensure totalPages is at least 1
    const pages = Math.max(totalPages, 1);
    const isPrevDisabled = totalPages <= 1 || currentPage === 0;
    const isNextDisabled = totalPages <= 1 || currentPage >= totalPages - 1;

    const [prevHovered, setPrevHovered] = useState(false);
    const [prevPressed, setPrevPressed] = useState(false);
    const [nextHovered, setNextHovered] = useState(false);
    const [nextPressed, setNextPressed] = useState(false);

    const prevButtonSpring = useSpring({
      scale: isPrevDisabled ? 1 : prevPressed ? 0.95 : prevHovered ? 1.05 : 1,
      config: { tension: 300, friction: 20 },
    });

    const nextButtonSpring = useSpring({
      scale: isNextDisabled ? 1 : nextPressed ? 0.95 : nextHovered ? 1.05 : 1,
      config: { tension: 300, friction: 20 },
    });

    return (
      <div className="mt-12 flex items-center justify-center gap-4">
        <animated.div
          style={prevButtonSpring}
          className="flex-shrink-0"
          onMouseEnter={() => !isPrevDisabled && setPrevHovered(true)}
          onMouseLeave={() => setPrevHovered(false)}
          onMouseDown={() => !isPrevDisabled && setPrevPressed(true)}
          onMouseUp={() => setPrevPressed(false)}
        >
          <Button
            onClick={onPrevPage}
            className="bg-slate-850 hover:bg-slate-790 disabled:bg-slate-980 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-100 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Previous page"
            disabled={isPrevDisabled}
          >
            <IconChevronLeft
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </animated.div>

        <div className="min-w-[2rem] flex-shrink-0 text-center text-sm text-slate-400 sm:text-sm md:text-sm">
          <span className="font-mono font-medium text-cyan-400">
            {currentPage + 1}
          </span>
          <span className="font-mono font-medium"> / {pages}</span>
        </div>

        <animated.div
          style={nextButtonSpring}
          className="flex-shrink-0"
          onMouseEnter={() => !isNextDisabled && setNextHovered(true)}
          onMouseLeave={() => setNextHovered(false)}
          onMouseDown={() => !isNextDisabled && setNextPressed(true)}
          onMouseUp={() => setNextPressed(false)}
        >
          <Button
            onClick={onNextPage}
            className="bg-slate-850 hover:bg-slate-790 disabled:bg-slate-980 h-12 w-12 cursor-pointer rounded-full p-3 text-white shadow-lg disabled:cursor-not-allowed disabled:text-slate-400 disabled:opacity-100 sm:h-10 sm:w-10 sm:p-3 md:h-10 md:w-10 md:p-3"
            size="icon"
            variant="ghost"
            aria-label="Next page"
            disabled={isNextDisabled}
          >
            <IconChevronRight
              size={24}
              className="sm:h-5 sm:w-5 md:h-5 md:w-5"
            />
          </Button>
        </animated.div>
      </div>
    );
  }
);

ProjectsNavigationAnimated.displayName = "ProjectsNavigationAnimated";
