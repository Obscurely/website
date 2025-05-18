import { useState, useEffect, useRef } from "react";

export const useMaxCardHeight = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const registerCard = (index: number, element: HTMLElement | null) => {
    if (element) {
      cardRefs.current[index] = element;
    }
  };

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
  }, [cardRefs.current.length, maxHeight]);

  return { maxHeight, registerCard };
};
