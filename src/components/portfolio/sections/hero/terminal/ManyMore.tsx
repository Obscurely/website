"use client";

/**
 * The many more button that scrolls you to the "About" section
 */
export const ManyMore = () => {
  return (
    <p
      className="cursor-pointer text-sm text-slate-400 italic transition-colors duration-300 hover:text-cyan-400"
      onClick={() => {
        document
          .querySelector("#about")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      ...and many more technologies + skills in my toolkit
    </p>
  );
};
