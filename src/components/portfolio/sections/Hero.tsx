"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconArrowRight,
  IconSearch,
  IconCode,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { typeAnimation } from "@data/portfolio/hero";
import { Description } from "@data/portfolio/hero";
import { socials } from "@data/common/socials";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const terminalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center pt-16 pb-6"
    >
      <div className="z-10 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-8xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-8">
            {/* Left Column - Terminal Window */}
            <motion.div
              variants={terminalVariants}
              className="flex backdrop-blur-xs will-change-transform lg:col-span-2"
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
                          className="mr-1 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
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

            {/* Right Column - Profile & Status Widgets */}
            <motion.div
              variants={sidebarVariants}
              className="flex flex-col justify-between space-y-6 backdrop-blur-sm will-change-transform"
            >
              {/* Profile Widget */}
              <div className="rounded-2xl border border-slate-600/30 bg-slate-900/40 p-6 shadow-xl shadow-black/10">
                <div className="mb-3.25 flex items-center gap-2 font-mono text-sm text-slate-400">
                  <IconUser size={16} />
                  <span>profile.sys</span>
                </div>

                {/* Profile Image */}
                <div className="xs:h-30 xs:w-30 relative mx-auto h-50 w-50 sm:h-50 sm:w-50 md:h-60 md:w-60 lg:h-60 lg:w-60 xl:h-80 xl:w-80 2xl:h-98 2xl:w-98">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-75 blur-sm"></div>
                  <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-md"></div>

                  <div className="group relative mx-auto h-full w-full overflow-hidden rounded-full border-2 border-cyan-500/20 bg-slate-900">
                    <Image
                      src="/profile.webp"
                      width={200}
                      height={200}
                      alt="Adrian Crîșmaruc"
                      className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/20"></div>
                  </div>
                </div>
              </div>

              {/* Status Widget */}
              <div className="rounded-2xl border border-slate-600/30 bg-slate-900/40 p-6 shadow-xl shadow-black/10">
                <div className="mb-4 font-mono text-base font-medium text-slate-300">
                  System Status
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <div className="mb-0.5 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                      Available for hire
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-slate-200">
                      UTC+2 (Iași, Romania)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Local Time:</span>
                    <span className="text-slate-200">
                      {currentTime.toLocaleTimeString("en-US", {
                        hour12: false,
                        timeZone: "Europe/Bucharest",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Available for Work:</span>
                    <span className="text-slate-200">
                      08:00 – 22:00 (UTC+2)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Time:</span>
                    <span className="text-cyan-400">~24h</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-full border border-cyan-500/20 text-slate-400"
              onClick={() => {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <IconArrowDown size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
