"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { IconArrowDown, IconArrowRight, IconSearch } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { typeAnimation } from "@data/portfolio/hero";
import { Description } from "@data/portfolio/hero";
import { socials } from "@data/common/socials";

/*
 * Hero component that displays the hero section of the portfolio.
 *
 * @returns A section containing the hero content.
 */
export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center pt-20 pb-10"
    >
      <div className="z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            {/* Animated gradient text with pulse effect for the welcome text */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
              <h2 className="text-xl font-medium text-cyan-400 md:text-2xl">
                Hello, I'm
              </h2>
            </div>

            {/* Name with netral color and underline effect */}
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-400 md:text-6xl lg:text-5xl">
              <span className="relative">
                Adrian Crîșmaruc
                <span className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
              </span>
            </h1>

            {/* Founder badge */}
            <a
              href="https://rekosearch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-1 backdrop-blur-sm transition-all duration-300 hover:from-cyan-500/20 hover:to-blue-500/20 hover:shadow-xs hover:shadow-cyan-500/20"
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

            {/* Animated text with TypeAnimation */}
            <div className="mb-2.5 h-12 text-2xl font-semibold md:text-2xl lg:text-3xl">
              <TypeAnimation
                sequence={typeAnimation}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
              />
            </div>

            {/* Description */}
            <div className="mb-8 max-w-xl">
              <Description />
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

            {/* Call to action buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-6 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  Get in Touch
                  <IconArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer rounded-lg border-slate-700 px-6 py-6 text-slate-300 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
              </Button>
            </div>

            <div className="mt-8 flex justify-center gap-5 md:justify-start">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white"
                >
                  <social.icon size={22} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Profile image with glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-md flex-1"
          >
            {/* Glow effects */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-75 blur-lg"></div>
            <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-xl"></div>

            {/* Image container with overflow hidden to contain the zoom effect */}
            <div className="group relative overflow-hidden rounded-full border-2 border-slate-800 bg-slate-900">
              {/* The image itself with hover effect */}
              <div className="transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Image
                  src="/profile.webp"
                  width={512}
                  height={512}
                  alt="Adrian Crîșmaruc"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Arrow down button for scrolling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 transform sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-full border border-slate-700 text-slate-400"
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
