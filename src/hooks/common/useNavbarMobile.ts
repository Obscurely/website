import { useCallback, useState } from "react";

const HEADER_HEIGHT = 50;

/**
 * Custom hook to manage mobile navigation bar behavior.
 */
export const useNavbarMobile = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    window.open("/Adrian-Crismaruc-Resume.pdf", "_blank");
  }, []);

  return {
    mobileMenuOpen,
    handleMobileNavClick,
    toggleMobileMenu,
    closeMobileMenu,
    handleResumeClick,
  };
};
