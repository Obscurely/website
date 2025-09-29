import { ProjectsContent } from "./ProjectsContent";
import { ProjectsHeader } from "./ProjectsHeader";

/**
 * Projects component that displays a list of projects with filtering and pagination.
 *
 * @returns A section containing the projects list with navigation controls.
 */
export const Projects = () => {
  return (
    <section id="projects" className="relative">
      <div className="bg-main-bg-light relative z-0 w-full overflow-hidden pt-16 pb-20">
        {/* Subtle background elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500 blur-[100px]"></div>
          <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and description */}
          <ProjectsHeader />

          {/* Projects list and navigation controls */}
          <ProjectsContent />
        </div>
      </div>
    </section>
  );
};
