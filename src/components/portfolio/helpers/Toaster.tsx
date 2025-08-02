"use client";

import dynamic from "next/dynamic";

export const Toaster = dynamic(
  () => import("sonner").then((mod) => ({ default: mod.Toaster })),
  { ssr: false }
);
