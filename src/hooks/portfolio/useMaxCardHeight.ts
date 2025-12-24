import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook to manage the maximum height of a set of card elements.
 */
export const useMaxCardHeight = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const registerCard = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) {
        // Disable the eslint rule because we are using a ref array
        // eslint-disable-next-line security/detect-object-injection
        cardRefs.current[index] = element;
      }
    },
    []
  );

  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = cardRefs.current
        .filter(Boolean)
        .map((el) => el?.getBoundingClientRect().height || 0);

      if (heights.length > 0) {
        const newMaxHeight = Math.max(...heights);
        if (newMaxHeight > 0 && newMaxHeight !== maxHeight) {
          setMaxHeight(newMaxHeight);
        }
      }
    };

    // Initialize ResizeObserver
    resizeObserver.current = new ResizeObserver(() => {
      calculateMaxHeight();
    });

    // Observe all card elements
    cardRefs.current.forEach((card) => {
      if (card) resizeObserver.current?.observe(card);
    });

    // Initial calculation
    calculateMaxHeight();

    return () => {
      // Cleanup
      resizeObserver.current?.disconnect();
    };
  }, [maxHeight]);

  return { maxHeight, registerCard };
};
