"use client";

import { memo } from "react";

import { IconRss } from "@tabler/icons-react";

interface DesktopNavItemProps {
  item: { name: string; href: string };
  isBlog: boolean;
  activeSection: string;
  useAnchorLinks: boolean;
  onNavClickAction: (href: string) => void;
}

/**
 * DesktopNavItem component renders a navigation item for desktop view.
 *
 * @param item - The navigation item object containing name and href.
 * @param isBlog - Indicates if the component is called from the blog or not.
 * @param activeSection - The currently active section for highlighting.
 * @param useAnchorLinks - Whether to use anchor links for navigation.
 * @param onNavClickAction - Function to handle navigation click actions.
 */
export const DesktopNavItem = memo(
  ({
    item,
    isBlog,
    activeSection,
    useAnchorLinks,
    onNavClickAction: onNavClick,
  }: DesktopNavItemProps) => {
    const isRSS = item.name === "RSS";
    const isActive = useAnchorLinks
      ? false
      : activeSection === item.href.substring(1);

    // Add "/" prefix when isMain=false and isBlog=false
    const href = !isBlog && useAnchorLinks ? `/${item.href}` : item.href;

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
          <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-blue-400 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
        </a>
      );
    }

    // Use anchor links when isBlog=true OR when useAnchorLinks=true (isMain=false)
    if (isBlog || useAnchorLinks) {
      return (
        <a
          href={href}
          className={`${commonClasses} ${activeClasses} flex items-center`}
        >
          <span className="relative z-10">{item.name}</span>
          <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-blue-400 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
        </a>
      );
    }

    // Use buttons with smooth scrolling when isMain=true and isBlog=false
    return (
      <button
        onClick={() => onNavClick(item.href)}
        className={`${commonClasses} ${activeClasses} cursor-pointer`}
      >
        <span className="relative z-10">{item.name}</span>
        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-blue-400 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </button>
    );
  }
);

DesktopNavItem.displayName = "DesktopNavItem";
