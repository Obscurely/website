import { useCallback, useMemo } from "react";
import {
  FooterSection,
  getLegalLinks,
  getResourceLinks,
  navItemsBlog,
  navItemsPortfolio,
} from "@data/common/footer";

export const useFooter = (isBlog: boolean, isMain: boolean) => {
  const navItems = useMemo(
    () => (isBlog ? navItemsBlog : navItemsPortfolio),
    [isBlog]
  );

  // Determine navigation behavior based on isBlog and isMain
  const useAnchorLinks = useMemo(() => {
    if (isBlog) return true; // isBlog overrides isMain
    return !isMain; // if not blog, use anchor links when isMain is false
  }, [isBlog, isMain]);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const footerSections: FooterSection[] = [
    {
      title: "Navigation",
      links: navItems.map((item) => ({
        name: item.name,
        href: item.href,
        external: false,
      })),
    },
    {
      title: "Resources",
      links: getResourceLinks(),
    },
    {
      title: "Legal",
      links: getLegalLinks(),
    },
  ];

  return {
    useAnchorLinks,
    handleNavClick,
    scrollToTop,
    footerSections,
  };
};
