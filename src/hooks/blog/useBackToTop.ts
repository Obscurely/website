import { useCallback, useEffect, useState } from "react";

import { SCROLL_CONFIG } from "@data/blog/config";
import { throttle } from "@lib/utils";

/**
 * Handle scrolling back to the top of the page.
 */
export function useBackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    const throttledHandler = throttle(() => {
      setShowBackToTop(window.scrollY > SCROLL_CONFIG.BACK_TO_TOP_THRESHOLD);
    }, SCROLL_CONFIG.THROTTLE_DELAY);

    return throttledHandler();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { showBackToTop, scrollToTop };
}
