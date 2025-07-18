import { AboutMe } from "@data/portfolio/about";

/**
 * AboutHeader component that displays the header for the "About Me" section.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const AboutHeader = () => {
  return (
    <div className="mb-20 text-center">
      <h2 className="mb-4 inline-block bg-blue-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
        About Me
      </h2>
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-blue-400"></div>

      <AboutMe />
    </div>
  );
};
