"use client";

import Image from "next/image";
import { TableOfContents } from "./TableOfContents";
import { Separator } from "@common/mdx";
import { useMemo } from "react";
import { getTableOfContents } from "@lib/blogToc";
import { useSidebarPositioningContext } from "@contexts/blog/SidebarPositioningContext";

const SIDEBAR_CLASSES = {
  base: "space-y-8 overflow-y-auto pb-4 transition-all duration-300 ease-out",
  initial: "sticky top-32 z-0 opacity-100 translate-y-0",
  fixed: "fixed top-30 z-40 opacity-100 translate-y-0",
  bottom:
    "fixed top-30 -z-50 opacity-0 translate-y-0 transition-opacity duration-300",
  mobile: "static top-auto z-0 opacity-100 translate-y-0",
} as const;

interface SidebarProps {
  post: {
    content: string;
  };
}

export const Sidebar = ({ post }: SidebarProps) => {
  const { sidebarState, sidebarWidth, sidebarRef, initialWidth, isMobile } =
    useSidebarPositioningContext();

  const toc = useMemo(() => getTableOfContents(post.content), [post.content]);

  // Memoized sidebar styling with consistent width
  const getSidebarStyles = useMemo(() => {
    const effectiveWidth = initialWidth || sidebarWidth;

    const baseStyles = {
      maxHeight: isMobile
        ? "auto"
        : sidebarState === "fixed"
          ? "calc(100vh - 8rem)"
          : "calc(100vh - 10rem)",
      // Always maintain consistent width to prevent flickering on desktop
      width: !isMobile && effectiveWidth > 0 ? `${effectiveWidth}px` : "auto",
      minWidth:
        !isMobile && effectiveWidth > 0 ? `${effectiveWidth}px` : "auto",
      transform: "translateZ(0)", // Force hardware acceleration
      backfaceVisibility: "hidden" as const, // Prevent flickering
      WebkitFontSmoothing: "antialiased", // Improve text rendering
      MozOsxFontSmoothing: "grayscale", // Improve text rendering on macOS
    };

    return baseStyles;
  }, [sidebarState, sidebarWidth, initialWidth, isMobile]);

  // Determine sidebar animation state
  const currentSidebarState = isMobile ? "mobile" : sidebarState;

  // Get the appropriate CSS classes for current state
  const sidebarClasses = `${SIDEBAR_CLASSES.base} ${SIDEBAR_CLASSES[currentSidebarState]} ${isMobile ? "mb-0" : ""}`;

  return (
    <div className="order-2 lg:order-2 lg:col-span-1">
      <div ref={sidebarRef} className={sidebarClasses} style={getSidebarStyles}>
        <TableOfContents toc={toc} />

        <div className="border-slate-730 bg-slate-980 rounded-2xl border p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            About the Author
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/profile.webp"
                alt="Adrian Crîșmaruc"
                width={60}
                height={60}
                className="ring-cyan-520 rounded-full ring-2"
              />
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-white">
                Adrian Crîșmaruc
              </h4>
              <div className="mb-0.5 flex items-center gap-1 text-sm text-slate-300">
                <span>Full-Stack Developer</span>
              </div>
              <p className="mb-0 text-sm text-slate-400">
                Founder of{" "}
                <a
                  href="https://rekosearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 not-italic transition-colors hover:text-cyan-300"
                >
                  RekoSearch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Separator />
      </div>
    </div>
  );
};
