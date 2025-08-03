"use client";

import { useBackToTop } from "@hooks/blog/useBackToTop";
import { animated, useSpring } from "@react-spring/web";
import { IconArrowUp } from "@tabler/icons-react";

export const BackToTopButton = () => {
  const { showBackToTop, scrollToTop } = useBackToTop();

  const springProps = useSpring({
    opacity: showBackToTop ? 1 : 0,
    scale: showBackToTop ? 1 : 0,
    config: { duration: 300 },
  });

  return (
    <animated.button
      onClick={scrollToTop}
      style={springProps}
      className="border-slate-750 bg-slate-880 hover:border-cyan-590 hover:bg-slate-890 focus:ring-cyan-590 fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border text-slate-300 shadow-lg transition-all duration-300 hover:text-cyan-400 hover:shadow-xl focus:ring-2 focus:outline-none sm:h-14 sm:w-14"
      aria-label="Back to top"
    >
      <IconArrowUp size={20} className="sm:h-6 sm:w-6" />
    </animated.button>
  );
};
