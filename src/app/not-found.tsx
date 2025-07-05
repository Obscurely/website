import Link from "next/link";
import { Button } from "@ui/button";
import { IconHome } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c1327] px-6 text-center">
      <div className="border-slate-730 bg-slate-850 relative mx-auto max-w-2xl rounded-2xl border p-8 shadow-xl">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="bg-slate-880 relative flex h-40 w-40 items-center justify-center rounded-full shadow-lg">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-6xl font-bold text-transparent">
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
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20 sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconHome className="h-4 w-4" />
                Go Home
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
