const HEADER_TEXT = {
  title: "My Projects",
  description:
    "Here are some of the projects I've made. Each project posed a new challenge and showcases my different skills and knowledge.",
};

/**
 * ProjectsHeader component that displays the header for the "Projects" section.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const ProjectsHeader = () => {
  return (
    <div className="mb-16 text-center">
      <h2 className="mb-2 inline-block bg-blue-400 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
        {HEADER_TEXT.title}
      </h2>
      <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-blue-400"></div>
      <p className="mx-auto max-w-3xl text-lg text-slate-400">
        {HEADER_TEXT.description}
      </p>
    </div>
  );
};
