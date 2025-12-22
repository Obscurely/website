import { useEffect, useState } from "react";

/**
 * Custom hook to manage the post page state, including initial sidebar width and mobile viewport detection.
 */
export const usePostPage = (sidebarWidth: number) => {
  const [initialWidth, setInitialWidth] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Capture initial width to prevent flickering
  useEffect(() => {
    if (sidebarWidth > 0 && initialWidth === null) {
      // This won't cause cascading re-renders because we are checking for prev ?? sidebarWidth
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialWidth((prev) => prev ?? sidebarWidth);
    }
  }, [sidebarWidth, initialWidth]);

  return {
    initialWidth,
    isMobile,
  };
};
