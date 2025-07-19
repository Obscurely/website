"use client";

import { useCallback } from "react";

interface LinkButtonProps {
  name: string;
  href: string;
}

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
