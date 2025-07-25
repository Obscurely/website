"use client";

import { useCallback } from "react";

/**
 * NameButton component that renders a button with the name "Adrian Crîșmaruc".
 */
export const NameButton = () => {
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={() => handleNavClick("#home")}
      className="group mb-6 block cursor-pointer text-2xl font-bold text-slate-100 transition-all duration-300"
    >
      <span className="bg-blue-400 bg-clip-text text-2xl font-extrabold text-transparent">
        Adrian Crîșmaruc
      </span>
    </button>
  );
};
