import { throttle } from "@lib/utils";
import { navItemsBlog, navItemsPortfolio } from "@data/common/navbar";
import { useState, useEffect, useCallback, useMemo } from "react";

const HEADER_HEIGHT = 50;
const SCROLL_THRESHOLD = 20;
const SECTION_OFFSET = 100;

export const useNavbar = (isBlog: boolean, isMain: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

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

  const handleMobileNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - HEADER_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleResumeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/resume.pdf", "_blank");
  }, []);

  return {
    isScrolled,
    mobileMenuOpen,
    activeSection,
    navItems,
    useAnchorLinks,
    handleScroll,
    handleNavClick,
    handleMobileNavClick,
    toggleMobileMenu,
    closeMobileMenu,
    handleResumeClick,
  };
};
