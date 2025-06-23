"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TableOfContents } from "./TableOfContents";
import { Separator } from "../mdx";
import { sidebarVariants } from "./variants";
import { useMemo } from "react";
import { getTableOfContents } from "@lib/blogToc";

const SIDEBAR_CLASSES = {
  base: "space-y-8 overflow-y-auto pb-4 transform-gpu",
} as const;

interface SidebarProps {
  post: {
    content: string;
  };
  sidebarState: "initial" | "fixed" | "bottom";
  sidebarWidth: number;
  initialWidth?: number | null;
  isMobile: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

export const Sidebar = ({
  post,
  sidebarState,
  sidebarWidth,
  initialWidth,
  isMobile,
  sidebarRef,
}: SidebarProps) => {
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
    };

    return baseStyles;
  }, [sidebarState, sidebarWidth, initialWidth, isMobile]);

  // Determine sidebar animation state
  const currentSidebarState = isMobile ? "mobile" : sidebarState;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="order-2 lg:order-2 lg:col-span-1"
    >
      <motion.div
        ref={sidebarRef}
        className={`${SIDEBAR_CLASSES.base} ${isMobile ? "mb-0" : ""}`}
        variants={sidebarVariants}
        animate={currentSidebarState}
        style={{
          ...getSidebarStyles,
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering
          WebkitFontSmoothing: "antialiased", // Improve text rendering
          MozOsxFontSmoothing: "grayscale", // Improve text rendering on macOS
        }}
        layout="position"
        layoutRoot
      >
        <TableOfContents toc={toc} />

        <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 p-6">
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
                className="rounded-full ring-2 ring-cyan-500/20"
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
      </motion.div>

      <div className="lg:hidden">
        <Separator />
      </div>
    </motion.div>
  );
};
