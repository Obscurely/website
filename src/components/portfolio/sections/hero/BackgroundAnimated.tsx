"use client";

import { animated, easings, useScroll, useSpring } from "@react-spring/web";

/**
 * Background component that applies a background image and color
 */
export const BackgroundAnimated = () => {
  const { scrollYProgress } = useScroll();

  const springs = useSpring({
    opacity: scrollYProgress.to([0, 0.2], [1, 0]),
    config: { easing: easings.linear },
  });

  return (
    <animated.div
      style={springs}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    >
      <div className="bg-slate-850 absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
    </animated.div>
  );
};
