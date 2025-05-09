import { useState } from "react";
import { Skill, Project } from "@data/skills/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

interface SkillBadgeProps {
  skill: Skill;
  colorClass: string;
}

export function SkillBadge({ skill, colorClass }: SkillBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex cursor-pointer items-center rounded-md border px-2 py-1 text-sm text-slate-200 transition-all duration-200 hover:shadow-sm hover:shadow-slate-700/20 ${colorClass}`}
      >
        {skill.name}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md border-slate-700 bg-slate-900 text-slate-200 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
              {skill.name}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            <div>
              <h4 className="mb-1 text-sm font-medium text-slate-400">
                Proficiency
              </h4>
              <div className="flex items-center">
                <ProficiencyBadge proficiency={skill.proficiency} />
              </div>
            </div>

            {skill.notableProjects && skill.notableProjects.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-slate-400">
                  Notable Projects
                </h4>
                <ul className="space-y-2">
                  {skill.notableProjects.map((project) => (
                    <ProjectItem key={project.name} project={project} />
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="mb-1 text-sm font-medium text-slate-400">
                Description
              </h4>
              <div className="text-sm text-slate-300">{skill.description}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProficiencyBadge({ proficiency }: { proficiency: string }) {
  const colors = {
    Familiar: "bg-slate-700 text-slate-300",
    Intermediate: "bg-blue-600 text-blue-100",
    Skilled: "bg-indigo-600 text-indigo-100",
    Proficient: "bg-cyan-600 text-cyan-100",
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
      <Tooltip>
        <TooltipTrigger asChild>
          <li>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
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
        <TooltipContent side="right" className="max-w-xs">
          <p className="text-xs">{project.shortDescription}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
