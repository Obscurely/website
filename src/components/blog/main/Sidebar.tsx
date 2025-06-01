"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/button";
import { IconBookmark, IconTags } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { socials } from "@data/common/socials";

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFeatured = searchParams.get("featured") === "true";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col overflow-y-auto pb-8"
    >
      {/* Profile Section */}
      <div className="mb-8">
        <motion.div
          className="relative mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-full border-2 border-slate-700 shadow-lg shadow-cyan-500/10 transition-all duration-600 hover:border-cyan-500/70">
            <Image
              src="/profile.webp"
              alt="Adrian Crîșmaruc"
              width={128}
              height={128}
              className="transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              priority
            />
          </div>
        </motion.div>
        <h3 className="mb-2 text-center text-xl font-medium text-white">
          Adrian Crîșmaruc
        </h3>
        <p className="mb-1 text-center text-sm text-slate-300">
          Full-Stack Developer
        </p>
        <p className="mb-2 text-center text-sm text-slate-400">
          Founder of{" "}
          <a
            href="https://rekosearch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 not-italic transition-colors hover:text-cyan-300"
          >
            RekoSearch
          </a>
        </p>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-3">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white"
            >
              <social.icon size={20} strokeWidth={2.5} />
            </a>
          ))}
        </div>
      </div>

      {/* Blog Title */}
      <div className="mb-6">
        <Link href="/blog">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
            Blog
          </h1>
        </Link>
        <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-sm shadow-cyan-500/30"></div>

        {/* Description text */}
        <motion.p
          className="mt-4 text-sm leading-relaxed text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Practical tutorials, in-depth guides and insights on software
          development, Linux, servers and more.
        </motion.p>
      </div>

      {/* Navigation Buttons */}
      <div className="mb-8 space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-start rounded-lg font-medium transition-all duration-300 hover:bg-slate-800/60 hover:text-cyan-400 ${
            pathname === "/blog" && !isFeatured
              ? "bg-slate-800/80 text-cyan-400"
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
          className={`w-full justify-start rounded-lg font-medium transition-all duration-300 hover:bg-slate-800/60 hover:text-cyan-400 ${
            isFeatured ? "bg-slate-800/80 text-cyan-400" : "text-slate-300"
          }`}
          asChild
        >
          <Link href="/blog?featured=true">
            <IconTags className="mr-3 h-5 w-5" />
            Featured
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
