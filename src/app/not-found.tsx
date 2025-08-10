import { Metadata } from "next";
import Link from "next/link";

import { IconHome } from "@tabler/icons-react";
import { Button } from "@ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="bg-main-bg-light flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <main className="border-slate-730 bg-slate-850 relative mx-auto max-w-2xl rounded-2xl border p-8 shadow-xl">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="bg-slate-880 relative flex h-40 w-40 items-center justify-center rounded-full shadow-lg">
            <span className="bg-blue-400 bg-clip-text text-6xl font-bold text-transparent">
              404
            </span>
          </div>
        </div>

        <h1 className="mt-16 mb-4 text-4xl font-bold text-white">
          Page Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-md text-slate-300">
          The page you're looking for doesn't exist or has been moved to a
          different location.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" passHref>
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconHome className="h-4 w-4" />
                Go Home
              </span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
