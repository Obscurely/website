import { useEffect, useMemo, useRef, useState } from "react";

import { SkillCategory } from "@data/portfolio/skills/types";
import { MIN_HEIGHT, calculateContentHeight } from "@utils/portfolio/skills";

// Memoize static data
export const tabCategories = Object.values(SkillCategory).filter(
  (category) => category !== SkillCategory.KeySkills
);

/**
 * Custom hook to manage skills tabs and their content height.
 */
export const useSkillsTabs = () => {
  const defaultValue = useMemo(
    () => tabCategories[0] || SkillCategory.Frontend,
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(MIN_HEIGHT);

  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;

      // Calculate height for each category and find the maximum
      const heights = tabCategories.map((category) =>
        calculateContentHeight(containerWidth, category)
      );

      setContentHeight(Math.max(...heights));
    };

    // Calculate on mount and window resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return {
    containerRef,
    defaultValue,
    contentHeight,
  };
};
