import Link from "next/link";
import { Button } from "@ui/button";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center">
      <div className="relative mx-auto max-w-2xl rounded-2xl border border-slate-700/30 bg-slate-800/50 p-8 shadow-xl backdrop-blur-sm">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-slate-800/80 shadow-lg">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-6xl font-bold text-transparent">
              404
            </span>
          </div>
        </div>

        <h1 className="mt-16 mb-4 text-4xl font-bold text-white">
          Post Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-md text-slate-300">
          The blog post you're looking for doesn't exist or has been moved to a
          different location.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/blog" passHref>
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20">
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Blog
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </Link>

          <Link href="/" passHref>
            <Button
              variant="outline"
              className="h-10 w-full cursor-pointer rounded-lg border-cyan-500/20 px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <IconHome className="h-4 w-4" />
                Go Home
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
