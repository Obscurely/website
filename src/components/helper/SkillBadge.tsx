import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Skill,
  Project,
  SkillProficiency,
  SkillProficiencyDescription,
  skillProficiencyLevels,
  skillProficiencyColor,
} from "@data/skills/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import React from "react";
import { IconX, IconExternalLink } from "@tabler/icons-react";

// Context to track the currently expanded skill
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
        className={`flex cursor-pointer items-center rounded-full border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 ${
          isExpanded
            ? "bg-gradient-to-r from-slate-800/70 to-slate-700/70 shadow-sm"
            : "hover:bg-slate-700/50 hover:shadow-sm"
        } ${colorClass}`}
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
            className="absolute left-0 z-50 mt-2 w-lg max-w-[95vw] overflow-hidden rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-800/95 to-slate-900/95 p-4 text-slate-200 shadow-xl backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 15px rgba(0, 0, 0, 0.2), 0 0 3px rgba(14, 165, 233, 0.15)",
            }}
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
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Proficiency Level
                  </h5>
                  <span className="mb-1 text-xs text-slate-500 italic">
                    Hover elements for details
                  </span>
                </div>
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
              className="absolute top-2 right-2 cursor-pointer rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              aria-label="Close details"
            >
              <IconX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export function ProficiencyScale({
  proficiency,
}: {
  proficiency: SkillProficiency;
}) {
  const currentIndex = skillProficiencyLevels.indexOf(proficiency);

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-between">
        {skillProficiencyLevels.map((level, index) => (
          <TooltipProvider key={level}>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  {/* Badge */}
                  <div
                    className={`relative z-10 cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:shadow-md ${
                      index !== currentIndex
                        ? "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200"
                        : ""
                    }`}
                    style={{
                      ...(index === currentIndex
                        ? skillProficiencyColor[level]
                        : {}),
                      transform: "translate(0, 0)", // Prevent movement on hover
                      backfaceVisibility: "hidden", // Helps with some browsers
                      willChange: "transform, box-shadow", // Optimize for animation
                    }}
                  >
                    {level}
                  </div>

                  {/* Connector line (except for the last item) */}
                  {index < skillProficiencyLevels.length - 1 && (
                    <div
                      className="absolute h-0.5 bg-slate-700"
                      style={{
                        left: `${(index * 100) / (skillProficiencyLevels.length - 1)}%`,
                        width: `${100 / (skillProficiencyLevels.length - 1)}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 0,
                      }}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="max-w-xs rounded-lg border border-slate-700/30 bg-gradient-to-b from-slate-800/95 to-slate-900/95 px-4 py-3 text-sm shadow-lg backdrop-blur-md transition-all duration-200"
                sideOffset={6}
              >
                <div className="mb-1 font-medium text-cyan-400">{level}</div>
                <div className="leading-relaxed text-slate-300">
                  {SkillProficiencyDescription[level]}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <li>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700/50 bg-slate-800/70 px-2.5 py-1 text-sm font-medium text-cyan-400 transition-all duration-200 hover:border-cyan-500/30 hover:bg-slate-700/50 hover:text-cyan-300 hover:shadow-sm hover:shadow-cyan-500/10"
              style={{
                transform: "translate(0, 0)", // Prevent movement on hover
                backfaceVisibility: "hidden", // Helps with some browsers
                willChange:
                  "transform, box-shadow, background-color, border-color", // Optimize for animation
              }}
            >
              {project.name}
              <IconExternalLink size={12} />
            </a>
          </li>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="w-auto max-w-md rounded-lg border-0 bg-gradient-to-b from-slate-800/95 to-slate-900/95 px-4 py-3 text-sm shadow-xl ring-1 ring-slate-700/30 backdrop-blur-md"
          sideOffset={6}
        >
          <div className="mb-1.5 font-medium text-cyan-400">{project.name}</div>
          <div className="leading-relaxed text-slate-200">
            {project.shortDescription}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
