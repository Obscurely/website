"use client";

import { IconRss } from "@tabler/icons-react";

interface MobileNavItemProps {
  item: { name: string; href: string };
  isBlog: boolean;
  activeSection: string;
  onNavClickAction: (href: string) => void;
  onMenuCloseAction: () => void;
}

export const MobileNavItem = ({
  item,
  isBlog,
  activeSection,
  onNavClickAction: onNavClick,
  onMenuCloseAction: onMenuClose,
}: MobileNavItemProps) => {
  const isRSS = item.name === "RSS";
  const isActive = activeSection === item.href.substring(1);

  const commonClasses =
    "w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200";
  const activeClasses = isActive
    ? "text-cyan-400"
    : "text-slate-300 hover:text-white";

  if (isRSS) {
    return (
      <a
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonClasses} ${activeClasses} flex items-center gap-2`}
        onClick={onMenuClose}
      >
        <IconRss size={16} />
        RSS
      </a>
    );
  }

  if (isBlog) {
    return (
      <a
        href={item.href}
        className={`${commonClasses} ${activeClasses} block`}
        onClick={onMenuClose}
      >
        {item.name}
      </a>
    );
  }

  return (
    <button
      onClick={() => onNavClick(item.href)}
      className={`${commonClasses} ${activeClasses}`}
    >
      {item.name}
    </button>
  );
};
