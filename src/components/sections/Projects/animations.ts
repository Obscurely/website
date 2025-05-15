export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Reduced from 0.1
      when: "beforeChildren",
      duration: 0.2, // Faster overall duration
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02, // Reduced from 0.05
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.15, // Faster exit
    },
  },
};

export const projectsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

export const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const cardVariants = {
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

export const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
