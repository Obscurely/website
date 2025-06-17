"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/button";
import {
  IconBookmark,
  IconCode,
  IconTags,
  IconCoffee,
} from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { socials } from "@data/common/socials";

/**
 * Sidebar component that displays the blog sidebar with profile, navigation, and social links.
 */
export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFeatured = searchParams.get("featured") === "true";

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col"
    >
      {/* Profile Section */}
      <div className="mb-8">
        <motion.div
          className="relative mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-full border-2 border-cyan-500/20 shadow-lg shadow-cyan-500/10 transition-all duration-600 hover:border-cyan-500/70">
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
        <div className="mb-1 flex items-center justify-center gap-2 text-sm text-slate-300">
          <IconCode size={16} className="text-cyan-400" />
          <span>Full-Stack Developer</span>
        </div>
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
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 shadow-[inset_0_0_0_1px_rgb(6_182_212_/_0.1)] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
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
        <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>

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
      <motion.div variants={itemVariants} className="mb-6 space-y-2">
        <Button
          variant="ghost"
          className={`group w-full justify-start rounded-xl border border-transparent font-medium transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-800/60 hover:text-cyan-400 hover:shadow-lg ${
            pathname === "/blog" && !isFeatured
              ? "border-cyan-500/30 bg-gradient-to-r from-slate-800/80 to-slate-700/60 text-cyan-400"
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
          className={`group w-full justify-start rounded-xl border border-transparent font-medium transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-800/60 hover:text-cyan-400 hover:shadow-lg ${
            isFeatured
              ? "border-cyan-500/30 bg-gradient-to-r from-slate-800/80 to-slate-700/60 text-cyan-400"
              : "text-slate-300"
          }`}
          asChild
        >
          <Link href="/blog?featured=true">
            <IconTags className="mr-3 h-5 w-5" />
            Featured
          </Link>
        </Button>
      </motion.div>

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
            className="group mb-1 w-full cursor-pointer justify-center rounded-xl border border-slate-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-cyan-300 hover:shadow-lg"
          >
            <IconCoffee className="mr-2 h-5 w-5" />
            Buy Me a Coffee
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
