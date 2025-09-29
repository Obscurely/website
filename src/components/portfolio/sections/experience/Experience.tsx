import { experiences } from "@data/portfolio/experience";

import { ExperienceCard } from "./ExperienceCard";

/**
 * Experience component that serves as the main section for professional experience.
 */
export const Experience = () => {
  return (
    <section
      id="experience"
      className="relative z-0 overflow-hidden bg-main-bg-dark pt-16 pb-21"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-indigo-600 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-2 inline-block bg-blue-400 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
            Experience
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-blue-400"></div>
        </div>

        <div className="relative" style={{ zIndex: 10 }}>
          <div className="space-y-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
