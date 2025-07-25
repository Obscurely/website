"use client";

import { IconRss } from "@tabler/icons-react";

interface MobileNavItemProps {
  item: { name: string; href: string };
  isBlog: boolean;
  activeSection: string;
  useAnchorLinks: boolean;
  onNavClickAction: (href: string) => void;
  onMenuCloseAction: () => void;
}

/**
 * MobileNavItem component renders a navigation item for mobile view.
 *
 * @param item - The navigation item object containing name and href.
 * @param isBlog - Indicates if the component is called from the blog or not.
 * @param activeSection - The currently active section for highlighting.
 * @param useAnchorLinks - Whether to use anchor links for navigation.
 * @param onNavClickAction - Function to handle navigation click actions.
 * @param onMenuCloseAction - Function to handle closing the mobile menu.
 * @returns
 */
export const MobileNavItem = ({
  item,
  isBlog,
  activeSection,
  useAnchorLinks,
  onNavClickAction: onNavClick,
  onMenuCloseAction: onMenuClose,
}: MobileNavItemProps) => {
  const isRSS = item.name === "RSS";
  const isActive = useAnchorLinks
    ? false
    : activeSection === item.href.substring(1);

  // Add "/" prefix when isMain=false and isBlog=false
  const href = !isBlog && useAnchorLinks ? `/${item.href}` : item.href;

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

  // Use anchor links when isBlog=true OR when useAnchorLinks=true (isMain=false)
  if (isBlog || useAnchorLinks) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${activeClasses} block`}
        onClick={onMenuClose}
      >
        {item.name}
      </a>
    );
  }

  // Use buttons with smooth scrolling when isMain=true and isBlog=false
  return (
    <button
      onClick={() => onNavClick(item.href)}
      className={`${commonClasses} ${activeClasses}`}
    >
      {item.name}
    </button>
  );
};
