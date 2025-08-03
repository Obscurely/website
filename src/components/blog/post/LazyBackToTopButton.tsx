"use client";

import dynamic from "next/dynamic";

const BackToTopButton = dynamic(
  () =>
    import("./BackToTopButton").then((mod) => ({
      default: mod.BackToTopButton,
    })),
  { ssr: false }
);

export const LazyBackToTopButton = () => {
  return <BackToTopButton />;
};
