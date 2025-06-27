import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      // Cap the delay to prevent exponential slowdown
      delay: Math.min(0.1 * (i % 3), 0.2),
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -2,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
