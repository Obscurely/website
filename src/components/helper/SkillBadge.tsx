"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill, Project } from "@data/skills/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import React from "react";

// Create a context to track the currently expanded skill
const SkillContext = createContext<{
  expandedSkillId: string | null;
  setExpandedSkillId: (id: string | null) => void;
}>({
  expandedSkillId: null,
  setExpandedSkillId: () => {},
});

export function SkillBadgeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  return (
    <SkillContext.Provider value={{ expandedSkillId, setExpandedSkillId }}>
      {children}
    </SkillContext.Provider>
  );
}

interface SkillBadgeProps {
  skill: Skill;
  colorClass: string;
}

export const SkillBadge = React.memo(function SkillBadge({
  skill,
  colorClass,
}: SkillBadgeProps) {
  const { expandedSkillId, setExpandedSkillId } = useContext(SkillContext);
  const isExpanded = expandedSkillId === skill.id;
  const skillRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        skillRef.current &&
        !skillRef.current.contains(event.target as Node) &&
        isExpanded
      ) {
        setExpandedSkillId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, setExpandedSkillId]);

  const toggleExpand = () => {
    if (isExpanded) {
      setExpandedSkillId(null);
    } else {
      setExpandedSkillId(skill.id);
    }
  };

  return (
    <div className="relative" ref={skillRef}>
      <button
        onClick={toggleExpand}
        className={`flex cursor-pointer items-center rounded-full border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:shadow-sm ${
          isExpanded
            ? "ring-opacity-50 ring-1 ring-offset-1 ring-offset-slate-900"
            : ""
        } ${colorClass}`}
        aria-expanded={isExpanded}
      >
        {skill.name}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 mt-3 w-lg max-w-[95vw] overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/95 p-4 text-slate-200 shadow-xl backdrop-blur-sm"
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {skill.name}
                </h4>
                <div className="mt-2 text-sm leading-relaxed text-slate-300">
                  {skill.description}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                  Proficiency Level
                </h5>
                <ProficiencyScale proficiency={skill.proficiency} />
              </div>

              {skill.notableProjects && skill.notableProjects.length > 0 && (
                <div>
                  <h5 className="mb-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Notable Projects
                  </h5>
                  <ul className="flex flex-wrap gap-2">
                    {skill.notableProjects.map((project) => (
                      <ProjectItem key={project.name} project={project} />
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setExpandedSkillId(null)}
              className="absolute top-2 right-2 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              aria-label="Close details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export function ProficiencyScale({ proficiency }: { proficiency: string }) {
  const levels = ["Familiar", "Intermediate", "Proficient", "Expert"];
  const currentIndex = levels.indexOf(proficiency);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full items-center justify-between">
        {levels.map((level, index) => (
          <span
            key={level}
            className={`text-xs font-medium ${
              index === currentIndex ? "text-cyan-400" : "text-slate-500"
            }`}
          >
            {level}
          </span>
        ))}
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-slate-700">
        {levels.map((_, index) => (
          <div
            key={`marker-${index}`}
            className={`absolute h-1.5 rounded-full ${
              index <= currentIndex
                ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                : "bg-slate-700"
            }`}
            style={{
              left: `${(index / (levels.length - 1)) * 100}%`,
              width: index === 0 ? `${100 / (levels.length - 1)}%` : "2px",
              transform: index === 0 ? "none" : "translateX(-50%)",
            }}
          />
        ))}
        <div
          className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/20"
          style={{
            left: `${(currentIndex / (levels.length - 1)) * 100}%`,
            top: "-3px",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}

export function ProficiencyBadge({ proficiency }: { proficiency: string }) {
  const colors = {
    Familiar: "bg-slate-700 text-slate-300",
    Intermediate: "bg-blue-600 text-blue-100",
    Proficient: "bg-cyan-600 text-cyan-100",
    Expert: "bg-indigo-600 text-indigo-100",
  };

  const color = colors[proficiency as keyof typeof colors] || colors.Familiar;

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {proficiency}
    </span>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <li>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700/50 bg-slate-800/70 px-2.5 py-1 text-sm font-medium text-cyan-400 transition-all duration-200 hover:border-cyan-500/30 hover:bg-slate-700/50 hover:text-cyan-300 hover:shadow-sm hover:shadow-cyan-500/10"
            >
              {project.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </li>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs rounded-md border border-slate-700/50 bg-slate-800/95 px-3 py-2 text-sm"
        >
          {project.shortDescription}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
