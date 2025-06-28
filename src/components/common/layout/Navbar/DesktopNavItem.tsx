"use client";

import { IconRss } from "@tabler/icons-react";

interface DesktopNavItemProps {
  item: { name: string; href: string };
  isBlog: boolean;
  activeSection: string;
  onNavClickAction: (href: string) => void;
}

export const DesktopNavItem = ({
  item,
  isBlog,
  activeSection,
  onNavClickAction: onNavClick,
}: DesktopNavItemProps) => {
  const isRSS = item.name === "RSS";
  const isActive = activeSection === item.href.substring(1);

  const commonClasses =
    "group relative px-0 text-base font-medium transition-all duration-300 lg:px-1";
  const activeClasses = isActive
    ? "text-cyan-400"
    : "text-slate-300 hover:text-white";

  if (isRSS) {
    return (
      <a
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonClasses} ${activeClasses} flex items-center gap-1`}
      >
        <IconRss size={16} />
        <span className="relative z-10">RSS</span>
        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </a>
    );
  }

  if (isBlog) {
    return (
      <a
        href={item.href}
        className={`${commonClasses} ${activeClasses} flex items-center`}
      >
        <span className="relative z-10">{item.name}</span>
        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </a>
    );
  }

  return (
    <button
      onClick={() => onNavClick(item.href)}
      className={`${commonClasses} ${activeClasses} cursor-pointer`}
    >
      <span className="relative z-10">{item.name}</span>
      <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
    </button>
  );
};
