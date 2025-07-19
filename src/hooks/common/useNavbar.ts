import { throttle } from "@lib/utils";
import { navItemsBlog, navItemsPortfolio } from "@data/common/navbar";
import { useState, useEffect, useCallback, useMemo } from "react";

const SECTION_OFFSET = 100;

export const useNavbar = (isBlog: boolean, isMain: boolean) => {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo(
    () => (isBlog ? navItemsBlog : navItemsPortfolio),
    [isBlog]
  );

  // Determine navigation behavior based on isBlog and isMain
  const useAnchorLinks = useMemo(() => {
    if (isBlog) return true; // isBlog overrides isMain
    return !isMain; // if not blog, use anchor links when isMain is false
  }, [isBlog, isMain]);

  const handleScroll = useCallback(() => {
    // Only track sections when isMain is true
    if (isMain) {
      const sections = navItems
        .map((item) => item.href.substring(1))
        .filter((section) => section.startsWith("#") === false);

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= SECTION_OFFSET && rect.bottom >= SECTION_OFFSET;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    }
  }, [navItems, isMain]);

  const throttledHandleScroll = useMemo(
    () => throttle(handleScroll, 16), // ~60fps
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [throttledHandleScroll]);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return {
    handleNavClick,
    activeSection,
    navItems,
    useAnchorLinks,
  };
};
