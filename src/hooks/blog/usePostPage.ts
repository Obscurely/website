import { useEffect, useState } from "react";

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
      setInitialWidth(sidebarWidth);
    }
  }, [sidebarWidth, initialWidth]);

  return {
    initialWidth,
    isMobile,
  };
};
