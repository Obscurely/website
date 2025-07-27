import Image from "next/image";
import Link from "next/link";

import { SITE_CONFIG } from "@data/common/site";
import { socials } from "@data/common/socials";
import { IconCode } from "@tabler/icons-react";

import { SidebarNavigation } from "./SidebarNavigation";

/**
 * Sidebar component that displays the blog sidebar with profile, navigation, and social links.
 */
export function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* Profile Section */}
      <div className="mb-8">
        <div className="relative mb-6 flex justify-center">
          <div className="border-cyan-520 hover:border-cyan-590 relative overflow-hidden rounded-full border-2 shadow-lg shadow-cyan-500/10 transition-all duration-600">
            <Image
              src="/profile.webp"
              alt={SITE_CONFIG.name}
              width={128}
              height={128}
              className="transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              priority
            />
          </div>
        </div>
        <h3 className="mb-2 text-center text-xl font-medium text-white">
          {SITE_CONFIG.name}
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
              className="group"
              aria-label={`Follow on ${social.name}`}
            >
              <div className="bg-slate-880 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 shadow-[inset_0_0_0_1px_rgb(6_182_212_/_0.1)] transition-colors duration-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none">
                <social.icon size={20} strokeWidth={2.5} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Blog Title */}
      <div className="mb-6">
        <Link href="/blog">
          <h1 className="bg-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            Blog
          </h1>
        </Link>
        <div className="mt-2 h-1 w-20 rounded-full bg-blue-400"></div>

        {/* Description text */}
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {SITE_CONFIG.blogDescription}
        </p>
      </div>

      <SidebarNavigation />
    </div>
  );
}
