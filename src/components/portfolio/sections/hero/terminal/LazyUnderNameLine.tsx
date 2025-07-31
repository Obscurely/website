"use client";

import dynamic from "next/dynamic";

const UnderNameLine = dynamic(
  () =>
    import("./UnderNameLine").then((mod) => ({ default: mod.UnderNameLine })),
  {
    ssr: false,
    loading: () => (
      <div className="mt-2 h-1 w-24 rounded-full bg-transparent" />
    ),
  }
);

export const LazyUnderNameLine = () => {
  return <UnderNameLine />;
};
