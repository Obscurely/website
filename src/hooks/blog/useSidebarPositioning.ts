import { SCROLL_CONFIG } from "@data/blog/config";
import { throttle } from "@lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";

type SidebarState = "initial" | "fixed" | "bottom";

export function useSidebarPositioning() {
  const [sidebarState, setSidebarState] = useState<SidebarState>("initial");
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Footer position calculation
  const getFooterPosition = useCallback((): number => {
    const footer = document.querySelector("footer") || footerRef.current;
    if (!footer) return Infinity;

    const rect = footer.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  // Calculate sidebar state based on scroll position
  const calculateSidebarState = useCallback(
    (
      scrollY: number,
      windowHeight: number,
      sidebarHeight: number,
      footerTop: number
    ): SidebarState => {
      if (scrollY <= SCROLL_CONFIG.SIDEBAR_ACTIVATION_THRESHOLD) {
        return "initial";
      }

      const sidebarBottom =
        scrollY +
        windowHeight * SCROLL_CONFIG.FOOTER_OFFSET_RATIO +
        sidebarHeight;

      return sidebarBottom > footerTop ? "bottom" : "fixed";
    },
    []
  );

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const throttledHandler = throttle(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sidebarHeight = sidebarRef.current?.offsetHeight || 0;
      const footerTop = getFooterPosition();

      const newState = calculateSidebarState(
        scrollY,
        windowHeight,
        sidebarHeight,
        footerTop
      );
      setSidebarState(newState);
    }, SCROLL_CONFIG.THROTTLE_DELAY);

    return throttledHandler();
  }, [calculateSidebarState, getFooterPosition]);

  // Measure sidebar width
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSidebarWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(sidebar);

    // Initial measurement
    setSidebarWidth(sidebar.offsetWidth);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Scroll event listener
  useEffect(() => {
    // Initial call to set correct state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    sidebarState,
    sidebarWidth,
    sidebarRef,
    footerRef,
  };
}
