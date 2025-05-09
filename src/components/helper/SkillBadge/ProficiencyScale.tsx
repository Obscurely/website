import {
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

/**
 * @param proficiency - The proficiency level of the skill.
 * @returns A component that displays a proficiency linear scale with tooltips
 */
export default function ProficiencyScale({
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
                    className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:shadow-md ${
                      index !== currentIndex
                        ? "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200"
                        : ""
                    }`}
                    style={{
                      ...(index === currentIndex
                        ? skillProficiencyColor[level]
                        : {}),
                      transform: "translate(0, 0)",
                      backfaceVisibility: "hidden",
                      willChange: "transform, box-shadow",
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
                sideOffset={2}
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
