import { useCallback, useEffect, useRef, useState } from "react";

import { SCROLL_CONFIG } from "@data/blog/config";
import { throttle } from "@lib/utils";

type SidebarState = "initial" | "fixed" | "bottom";

/**
 * Custom hook to manage sidebar positioning based on scroll position.
 */
export function useSidebarPositioning() {
  const [sidebarState, setSidebarState] = useState<SidebarState>("initial");
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const getFooterPosition = useCallback((): number => {
    // Try multiple selectors to find the footer
    const footerSelectors = ["footer", "[data-footer]", ".footer", "#footer"];

    let footer: Element | null = null;

    for (const selector of footerSelectors) {
      footer = document.querySelector(selector);
      if (footer) break;
    }

    // Fallback to footerRef if no footer found
    if (!footer && footerRef.current) {
      footer = footerRef.current;
    }

    if (!footer) return Infinity;

    const rect = footer.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  const calculateSidebarState = useCallback(
    (
      scrollY: number,
      _windowHeight: number,
      sidebarHeight: number,
      footerTop: number
    ): SidebarState => {
      // Stay in initial state until we scroll past the activation threshold
      if (scrollY <= SCROLL_CONFIG.SIDEBAR_ACTIVATION_THRESHOLD) {
        return "initial";
      }

      // Calculate where the bottom of the fixed sidebar would be
      const sidebarTopWhenFixed = 120; // top-30 = 7.5rem = 120px
      const sidebarBottomWhenFixed =
        scrollY + sidebarTopWhenFixed + sidebarHeight;

      // Add some padding before the footer
      const footerPadding = window.innerWidth >= 1024 ? 80 : 40; // lg:80px, smaller:40px
      const footerWithPadding = footerTop - footerPadding;

      // If sidebar would overlap with footer, switch to bottom positioning
      return sidebarBottomWhenFixed > footerWithPadding ? "bottom" : "fixed";
    },
    []
  );

  const handleScroll = useCallback(() => {
    const throttledHandler = throttle(() => {
      if (!sidebarRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const footerTop = getFooterPosition();

      const newState = calculateSidebarState(
        scrollY,
        windowHeight,
        sidebarHeight,
        footerTop
      );

      // Only update state if it actually changed
      setSidebarState((prevState) =>
        prevState !== newState ? newState : prevState
      );
    }, SCROLL_CONFIG.THROTTLE_DELAY);

    return throttledHandler();
  }, [calculateSidebarState, getFooterPosition]);

  // Measure sidebar width
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const updateWidth = () => {
      const rect = sidebar.getBoundingClientRect();
      setSidebarWidth(rect.width);
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateWidth);
    });

    resizeObserver.observe(sidebar);

    // Initial measurement
    updateWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Scroll event listener
  useEffect(() => {
    // Initial call to set correct state
    handleScroll();

    // Handle both scroll and resize events
    const handleResize = throttle(() => {
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll]);

  return {
    sidebarState,
    sidebarWidth,
    sidebarRef,
    footerRef,
  };
}
