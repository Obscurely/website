"use client";

import dynamic from "next/dynamic";

// Dynamic import with loading fallback
const DynamicBackground = dynamic(
  () =>
    import("./BackgroundAnimated").then((mod) => ({
      default: mod.BackgroundAnimated,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
        <div className="bg-slate-850 absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
      </div>
    ),
  }
);

export const Background = () => {
  return <DynamicBackground />;
};
