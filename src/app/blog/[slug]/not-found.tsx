import Link from "next/link";
import { Button } from "@ui/button";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="bg-main-bg-light flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="border-slate-730 bg-slate-850 relative mx-auto max-w-2xl rounded-2xl border p-8 shadow-xl">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="bg-slate-880 relative flex h-40 w-40 items-center justify-center rounded-full shadow-lg">
            <span className="bg-blue-400 bg-clip-text text-6xl font-bold text-transparent">
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
            <Button className="group relative h-10 w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 will-change-transform">
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Blog
              </span>
            </Button>
          </Link>

          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-cyan-560 hover:border-cyan-590 h-10 w-full cursor-pointer rounded-lg px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
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
