import { Variants } from "framer-motion";

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const containerAnimation = {
  initial: { opacity: 0, x: -50 },
  transition: { duration: 0.7, delay: 0.2 },
};

export const socialSectionAnimation = {
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.7, delay: 0.5 },
};
