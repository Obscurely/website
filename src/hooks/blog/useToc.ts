import { TocItem } from "@data/blog/toc";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export const useToc = (toc: TocItem[]) => {
  const [activeId, setActiveId] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingsRef = useRef<Element[]>([]);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize observer options for performance
  const observerOptions = useMemo(
    () => ({
      rootMargin: "-10% 0px -80% 0px", // detection zone
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }),
    []
  );

  // Debounced setActiveId with persistence logic
  const debouncedSetActiveId = useCallback((id: string) => {
    // Don't update during programmatic scrolling
    if (isScrollingRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveId((prevId) => {
        // Only update if we have a new valid ID or no previous ID
        return id || prevId;
      });
    }, 100);
  }, []);

  // Handle manual scroll events
  const handleScroll = useCallback(() => {
    // If user manually scrolls, re-enable observer after a short delay
    if (isScrollingRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    }
  }, []);

  useEffect(() => {
    // Create a Set of valid TOC slugs for quick lookup
    const validSlugs = new Set(toc.map((item) => item.slug));

    // Find headings that match our TOC items
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).filter((heading) => heading.id && validSlugs.has(heading.id));

    headingsRef.current = headings;

    if (headings.length === 0) {
      return;
    }

    // Set initial active heading if none is set
    if (!activeId && headings.length > 0) {
      const firstHeading = headings.find((heading) => {
        const rect = heading.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.3;
      });

      if (firstHeading) {
        setActiveId(firstHeading.id);
      } else {
        // Default to first heading if none are visible
        if (headings[0]) {
          setActiveId(headings[0].id);
        }
      }
    }

    const observer = new IntersectionObserver((entries) => {
      // Skip observer updates during programmatic scrolling
      if (isScrollingRef.current) return;

      // Filter entries to only include those in our TOC
      const validEntries = entries.filter((entry) =>
        validSlugs.has(entry.target.id)
      );

      if (validEntries.length === 0) return;

      // Find the most visible intersecting heading
      const intersectingEntries = validEntries.filter(
        (entry) => entry.isIntersecting
      );

      if (intersectingEntries.length > 0) {
        // Sort by intersection ratio and position
        const mostVisible = intersectingEntries.reduce((prev, current) => {
          const prevRect = prev.target.getBoundingClientRect();
          const currentRect = current.target.getBoundingClientRect();

          // Prefer headings closer to the top of the viewport
          if (Math.abs(currentRect.top) < Math.abs(prevRect.top)) {
            return current;
          }

          // If positions are similar, prefer higher intersection ratio
          return current.intersectionRatio > prev.intersectionRatio
            ? current
            : prev;
        });

        debouncedSetActiveId(mostVisible.target.id);
      } else {
        // No headings are intersecting, find the closest one above the viewport
        const headingsAbove = validEntries
          .filter((entry) => entry.target.getBoundingClientRect().top < 0)
          .sort((a, b) => {
            const aTop = a.target.getBoundingClientRect().top;
            const bTop = b.target.getBoundingClientRect().top;
            return bTop - aTop; // Closest to 0 (most recently passed)
          });

        if (headingsAbove[0]) {
          debouncedSetActiveId(headingsAbove[0].target.id);
        }
      }
    }, observerOptions);

    observerRef.current = observer;
    headings.forEach((heading) => observer.observe(heading));

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (observerRef.current) {
        headingsRef.current.forEach((heading) =>
          observerRef.current?.unobserve(heading)
        );
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc, debouncedSetActiveId, observerOptions, activeId, handleScroll]);

  // Smooth scroll handler
  const handleClick = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();

    const element = document.getElementById(slug);
    if (element) {
      // Set scrolling flag and update active state immediately
      isScrollingRef.current = true;
      setActiveId(slug);

      // Clear any existing scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Calculate position with offset for navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Re-enable observer after scrolling is likely complete
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  return {
    activeId,
    handleClick,
  };
};
