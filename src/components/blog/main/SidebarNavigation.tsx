"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { IconBookmark, IconCoffee, IconTags } from "@tabler/icons-react";
import { Button } from "@ui/button";

export const SidebarNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFeatured = searchParams.get("featured") === "true";

  return (
    <>
      {/* Navigation Buttons */}
      <div className="mb-6 space-y-2">
        <Button
          variant="ghost"
          className={`group hover:border-slate-750 hover:bg-slate-850 w-full justify-start rounded-xl border border-transparent font-medium transition-all duration-300 hover:text-cyan-400 hover:shadow-lg ${
            pathname === "/blog" && !isFeatured
              ? "border-cyan-590 bg-slate-740 text-cyan-400"
              : "text-slate-300"
          }`}
          asChild
        >
          <Link href="/blog">
            <IconBookmark className="mr-3 h-5 w-5" />
            All Posts
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`group hover:border-slate-750 hover:bg-slate-850 w-full justify-start rounded-xl border border-transparent font-medium transition-all duration-300 hover:text-cyan-400 hover:shadow-lg ${
            isFeatured
              ? "border-cyan-590 bg-slate-880 text-cyan-400"
              : "text-slate-300"
          }`}
          asChild
        >
          <Link href="/blog?featured=true">
            <IconTags className="mr-3 h-5 w-5" />
            Featured
          </Link>
        </Button>
      </div>

      {/* Buy Me a Coffee Button */}
      <div className="mt-auto">
        <a
          href="https://ko-fi.com/Obscurely"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full"
        >
          <Button
            variant="ghost"
            className="group border-slate-750 bg-blue-510 hover:border-cyan-590 hover:bg-blue-520 mb-1 w-full cursor-pointer justify-center rounded-xl border font-medium text-slate-300 transition-all duration-300 hover:text-cyan-300 hover:shadow-lg"
          >
            <IconCoffee className="mr-2 h-5 w-5" />
            Buy Me a Coffee
          </Button>
        </a>
      </div>
    </>
  );
};
