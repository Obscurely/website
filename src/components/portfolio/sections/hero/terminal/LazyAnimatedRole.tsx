"use client";

import dynamic from "next/dynamic";

const AnimatedRole = dynamic(
  () => import("./AnimatedRole").then((mod) => ({ default: mod.AnimatedRole })),
  {
    ssr: false,
  }
);

export const LazyAnimatedRole = () => {
  return <AnimatedRole />;
};
