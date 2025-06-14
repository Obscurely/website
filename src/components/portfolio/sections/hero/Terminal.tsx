"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  terminalVariants,
} from "./animations";
import {
  IconArrowRight,
  IconSearch,
  IconCode,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import { TypeAnimation } from "react-type-animation";
import { typeAnimation } from "@data/portfolio/hero";
import { Description } from "@data/portfolio/hero";
import { socials } from "@data/common/socials";

interface TerminalProps {
  currentTime: Date;
}

export const Terminal = ({ currentTime }: TerminalProps) => {
  return (
    <motion.div
      variants={terminalVariants}
      className="flex rounded-2xl backdrop-blur-xs will-change-transform lg:col-span-2"
    >
      <div className="relative flex w-full transform-gpu flex-col overflow-hidden rounded-2xl border border-slate-600/30 bg-slate-900/30 shadow-2xl shadow-black/20">
        {/* Terminal Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-shrink-0 items-center justify-between border-b border-slate-600/30 bg-slate-800/40 px-6 py-2"
        >
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400/70"></div>
              <div className="h-3 w-3 rounded-full bg-green-400/70"></div>
            </div>
            <div className="flex items-center gap-2">
              <IconCode size={16} className="text-slate-400" />
              <span className="font-mono text-sm text-slate-300">
                adrian@portfolio:~$
              </span>
            </div>
          </div>
          <div className="font-mono text-sm text-slate-400">
            {currentTime.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </motion.div>

        {/* Terminal Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <motion.div variants={containerVariants}>
            {/* whoami Command */}
            <motion.div
              variants={itemVariants}
              className="mb-6 font-mono text-base"
            >
              <span className="text-cyan-400">❯</span>
              <span className="ml-3 text-slate-300">whoami</span>
            </motion.div>

            {/* Name Output */}
            <motion.div variants={itemVariants} className="mb-9">
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-300 md:text-5xl lg:text-4xl">
                <span className="relative">
                  Adrian Crîșmaruc
                  <motion.div
                    className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }} // 6rem = 96 px
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </span>
              </h1>

              {/* Founder badge */}
              <a
                href="https://rekosearch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-4 inline-flex items-center rounded-full border border-cyan-500/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-1 transition-all duration-300 hover:from-cyan-500/20 hover:to-blue-500/20 hover:shadow-xs hover:shadow-cyan-500/20"
              >
                <IconSearch
                  size={16}
                  className="mr-2 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-sm font-semibold text-cyan-400 transition-all duration-300 group-hover:text-cyan-300">
                  Founder of RekoSearch - AI File Search Engine
                </span>
                <span className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <IconArrowRight size={16} className="text-cyan-400" />
                </span>
              </a>

              {/* Animated Role */}
              <div className="mb-6 text-2xl font-semibold md:text-2xl lg:text-3xl">
                <TypeAnimation
                  sequence={typeAnimation}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent will-change-contents"
                  style={{
                    display: "inline-block",
                    minHeight: "1em",
                    whiteSpace: "nowrap",
                  }}
                />
              </div>

              {/* Description */}
              <div className="max-w-xl text-slate-200">
                <div className="mb-3">
                  <Description />
                </div>
                <p
                  className="cursor-pointer text-sm text-slate-400 italic transition-colors duration-300 hover:text-cyan-400"
                  onClick={() => {
                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  ...and many more technologies + skills in my toolkit
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="grid grid-cols-1 gap-3 sm:max-w-[480px] sm:grid-cols-3">
                <Button
                  className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                    Get in Touch
                    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-full cursor-pointer rounded-lg border-cyan-500/20 px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center justify-center gap-2 text-sm">
                    View Projects
                    <IconCode className="h-4 w-4" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-full cursor-pointer rounded-lg border-cyan-500/20 px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  <span className="flex items-center justify-center gap-2 text-sm">
                    View Resume
                    <IconUser className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 sm:justify-start"
            >
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 shadow-[inset_0_0_0_1px_rgb(6_182_212_/_0.1)] transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
                >
                  <social.icon size={20} strokeWidth={2.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
