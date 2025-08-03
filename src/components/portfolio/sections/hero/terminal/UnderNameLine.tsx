"use client";

import { animated, useSpring } from "@react-spring/web";

/**
 * Animated line that gets drawn under the name in the hero section.
 */
export const UnderNameLine = () => {
  const styles = useSpring({
    from: { width: "0rem" },
    to: { width: "6rem" },
    config: { duration: 600 },
  });

  return (
    <animated.div
      style={styles}
      className="mt-2 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
    />
  );
};
