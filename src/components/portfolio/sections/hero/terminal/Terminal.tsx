import { SITE_CONFIG } from "@data/common/site";
import { socials } from "@data/common/socials";
import { Description } from "@data/portfolio/hero";
import { IconArrowRight, IconCode, IconSearch } from "@tabler/icons-react";

import { AnimatedRole } from "./AnimatedRole";
import { Buttons } from "./Buttons";
import { ManyMore } from "./ManyMore";
import { TerminalClock } from "./TerminalClock";
import { UnderNameLine } from "./UnderNameLine";

/**
 * The terminal and main part of the portfolio hero section.
 */
export const Terminal = () => {
  return (
    <div
      className="data-[state=once]:animate-in data-[state=once]:zoom-in-90 flex rounded-2xl opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100 lg:col-span-2"
      data-state="once"
    >
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-600/30 bg-slate-900/40 shadow-2xl shadow-black/20">
        {/* Terminal Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-600/30 bg-slate-800/40 px-6 py-2">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="bg-red-470 h-3 w-3 rounded-full"></div>
              <div className="bg-yellow-470 h-3 w-3 rounded-full"></div>
              <div className="bg-green-470 h-3 w-3 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <IconCode size={16} className="text-slate-400" />
              <span className="font-mono text-sm text-slate-300">
                adrian@portfolio:~$
              </span>
            </div>
          </div>
          <TerminalClock />
        </div>

        {/* Terminal Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          {/* whoami Command */}
          <div className="mb-6 font-mono text-base">
            <span className="text-cyan-400">❯</span>
            <span className="ml-3 text-slate-300">whoami</span>
          </div>

          {/* Name Output */}
          <div className="mb-9">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-300 md:text-5xl lg:text-4xl">
              <span className="relative">
                {SITE_CONFIG.name}
                <UnderNameLine />
              </span>
            </h1>

            {/* Founder badge */}
            <a
              href="https://rekosearch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-cyan-510 from-cyan-530 to-blue-520 hover:from-cyan-550 hover:to-blue-550 hover:shadow-cyan-520 mb-4 inline-flex items-center rounded-full border bg-gradient-to-r px-3 py-1 transition-all duration-300 hover:shadow-xs"
            >
              <IconSearch size={16} className="mr-2 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400 transition-all duration-300 group-hover:text-cyan-300">
                Founder of RekoSearch - AI File Search Engine
              </span>
              <span className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                <IconArrowRight size={16} className="text-cyan-400" />
              </span>
            </a>

            {/* Animated Role */}
            <div className="mb-6 min-h-[2.5rem] text-2xl font-semibold md:text-2xl lg:text-3xl">
              <AnimatedRole />
            </div>

            {/* Description */}
            <div className="max-w-xl text-slate-200">
              <div className="mb-3">
                <Description />
              </div>
              <ManyMore />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3 sm:max-w-[480px] sm:grid-cols-3">
              <Buttons />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 sm:justify-start">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-880 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 shadow-[inset_0_0_0_1px_rgb(6_182_212_/_0.1)] transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
                aria-label={`Follow me on ${social.name}`}
              >
                <social.icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
