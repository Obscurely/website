"use client";

/**
 * The many more button that scrolls you to the "About" section
 */
export const ManyMore = () => {
  return (
    <button
      className="cursor-pointer text-sm text-slate-400 italic transition-colors duration-300 hover:text-cyan-400 bg-transparent border-none p-0 font-inherit text-left block w-fit"
      onClick={() => {
        document
          .querySelector("#about")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      ...and many more technologies + skills in my toolkit
    </button>
  );
};
