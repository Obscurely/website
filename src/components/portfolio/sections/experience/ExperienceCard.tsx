import { memo } from "react";

import { ExperienceEntry } from "@data/portfolio/experience";
import {
  IconBriefcase,
  IconCalendar,
  IconExternalLink,
} from "@tabler/icons-react";
import { Card, CardContent } from "@ui/card";

interface ExperienceCardProps {
  experience: ExperienceEntry;
}

export const ExperienceCard = memo(function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  return (
    <Card className="border-slate-730 bg-slate-800/20 hover:border-purple-590 group overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-purple-500/10">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-990 rounded-full p-2">
              <IconBriefcase size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-purple-400">
                  {experience.company}
                </h3>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition-colors duration-300 hover:text-purple-400"
                    aria-label={`Visit ${experience.company} website`}
                  >
                    <IconExternalLink size={16} />
                  </a>
                )}
              </div>
              <p className="text-lg font-semibold text-purple-400">
                {experience.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <IconCalendar size={16} />
            <span className="text-sm font-medium">{experience.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-slate-300 leading-relaxed">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-white">
            Key Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 transition-colors duration-300 hover:bg-purple-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400"></span>
                <span className="leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
});

ExperienceCard.displayName = "ExperienceCard";
