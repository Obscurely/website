"use client";

import { useNavbar } from "@hooks/common/useNavbar";
import { cn } from "@lib/utils";
import { IconDownload } from "@tabler/icons-react";
import { buttonVariants } from "@ui/button";

import { DesktopNavItem } from "./DesktopNavItem";

interface DesktopNavbarProps {
  isBlog: boolean;
  isMain: boolean;
}

/**
 * DesktopNavbar component renders a navigation bar for desktop devices.
 *
 * @param isBlog - Indicates if the navbar is for the blog section.
 * @param isMain - Indicates if the navbar is for the main section.
 */
export const DesktopNavbar = ({ isBlog, isMain }: DesktopNavbarProps) => {
  const { handleNavClick, activeSection, navItems, useAnchorLinks } = useNavbar(
    isBlog,
    isMain
  );

  return (
    <nav className="hidden items-center gap-4 md:flex lg:gap-6">
      {navItems.map((item) => (
        <DesktopNavItem
          key={item.name}
          item={item}
          isBlog={isBlog}
          activeSection={activeSection}
          useAnchorLinks={useAnchorLinks}
          onNavClickAction={handleNavClick}
        />
      ))}

      <div className="ml-0 lg:ml-1">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "group relative w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 group-hover:translate-0 group-hover:scale-100 hover:translate-y-0 hover:scale-100"
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
            <IconDownload className="h-4 w-4 transition-transform duration-300" />
            Resume
          </span>
        </a>
      </div>
    </nav>
  );
};
