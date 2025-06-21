import Link from "next/link";
import { Button } from "@ui/button";

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
            <Button className="relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 hover:shadow-cyan-500/20">
              Back to Blog
            </Button>
          </Link>

          <Link href="/" passHref>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-slate-200 transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
