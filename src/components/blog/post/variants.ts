import { Variants } from "framer-motion";

// variants for sidebar states
export const sidebarVariants: Variants = {
  initial: {
    position: "sticky" as const,
    top: "8rem",
    zIndex: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      opacity: { duration: 0.2 },
    },
  },
  fixed: {
    position: "fixed" as const,
    top: "7.5rem",
    zIndex: 40,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.2 },
    },
  },
  bottom: {
    position: "fixed" as const,
    top: "7.5rem",
    zIndex: -50,
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.3 },
      y: { duration: 0.3 },
    },
  },
  mobile: {
    position: "static" as const,
    top: "auto",
    zIndex: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.2 },
    },
  },
};
