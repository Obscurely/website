import { Variants } from "framer-motion";

// Legacy framer-motion variants for other components (blog, etc.)
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      // Cap the delay to prevent exponential slowdown
      delay: Math.min(0.1 * (i % 3), 0.2),
      duration: 0.2,
      ease: "easeOut",
    },
  }),
};
