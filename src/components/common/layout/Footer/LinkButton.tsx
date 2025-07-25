"use client";

import { useCallback } from "react";

interface LinkButtonProps {
  name: string;
  href: string;
}

/**
 * LinkButton component that renders a button to navigate to a specific section.
 *
 * @param name - The name of the button to display.
 * @param href - The target section ID to scroll to when the button is clicked.
 */
export const LinkButton = ({ name, href }: LinkButtonProps) => {
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={() => handleNavClick(href)}
      className="cursor-pointer text-sm text-slate-400 transition-all duration-300 hover:text-cyan-400"
    >
      {name}
    </button>
  );
};
