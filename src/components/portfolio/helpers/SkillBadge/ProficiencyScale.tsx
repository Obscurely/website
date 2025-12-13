import {
  SkillProficiency,
  SkillProficiencyDescription,
  skillProficiencyColor,
  skillProficiencyLevels,
} from "@data/portfolio/skills/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

/**
 * @param proficiency - The proficiency level of the skill.
 * @returns A component that displays a proficiency linear scale with tooltips
 */
export const ProficiencyScale = ({
  proficiency,
}: {
  proficiency: SkillProficiency;
}) => {
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
                        ? // Disable the rule because it's not a user input
                          // eslint-disable-next-line security/detect-object-injection
                          skillProficiencyColor[level]
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
                className="border-slate-630 max-w-xs rounded-lg border bg-gradient-to-b from-[#1e2a3e] to-[#0f182c] px-4 py-3 text-sm shadow-lg transition-all duration-200"
                sideOffset={2}
              >
                <div className="mb-1 font-medium text-cyan-400">{level}</div>
                <div className="leading-relaxed text-slate-300">
                  {/* Disable the rule because it's not a user input */}
                  {/* eslint-disable-next-line security/detect-object-injection */}
                  {SkillProficiencyDescription[level]}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
