"use client";

import { useIsMobile } from "@hooks/common/useIsMobile";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Background component that applies a background image and color
 */
export const BackgroundAnimated = () => {
  const isMobile = useIsMobile();

  // Use the document as the scroll container instead of a specific element
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const className = "pointer-events-none fixed inset-0 z-0 h-screen w-screen";

  const content = (
    <>
      <div className="bg-slate-850 absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
    </>
  );

  if (isMobile) {
    return <div className={className}>{content}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div style={{ opacity }} className={className}>
        {content}
      </m.div>
    </LazyMotion>
  );
};
