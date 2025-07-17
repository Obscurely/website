import { AboutMe } from "@data/portfolio/about";

/**
 * AboutHeader component that displays the header for the "About Me" section.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const AboutHeader = () => {
  return (
    <div
      className="data-[state=once]:animate-in fade-in slide-in-from-bottom-15 mb-20 text-center opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100"
      data-state="once"
    >
      <h2 className="mb-4 inline-block bg-blue-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
        About Me
      </h2>
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-blue-400"></div>

      <AboutMe />
    </div>
  );
};
