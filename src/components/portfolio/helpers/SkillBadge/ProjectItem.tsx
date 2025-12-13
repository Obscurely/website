import { Project } from "@data/portfolio/skills/types";
import { IconExternalLink } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

/**
 * Simple Box with the name of the project and the link as an anchor tag
 *
 * @param project - The project object containing details about the project.
 */
export const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <li>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border-slate-750 bg-slate-880 hover:border-cyan-590 hover:bg-slate-750 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm font-medium text-cyan-400 transition-all duration-200 hover:text-cyan-300 hover:shadow-sm hover:shadow-cyan-500/10"
              style={{
                transform: "translate(0, 0)",
                backfaceVisibility: "hidden",
                willChange:
                  "transform, box-shadow, background-color, border-color",
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
          className="ring-slate-630 w-auto max-w-md rounded-lg border-0 bg-gradient-to-b from-[#1e2a3e] to-[#0f182c] px-4 py-3 text-sm shadow-xl ring-1"
          sideOffset={2}
        >
          <div className="mb-1.5 font-medium text-cyan-400">{project.name}</div>
          <div className="leading-relaxed text-slate-200">
            {project.shortDescription}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
