"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Hero() {
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
            <div>
              <h2 className="mb-3 inline-block rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-1 text-lg font-medium text-cyan-400 backdrop-blur-sm md:text-2xl">
                Hello, I'm
              </h2>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-100 md:text-6xl lg:text-7xl">
              <span className="block">Adrian Crîșmaruc</span>
            </h1>
            <div className="mb-4 h-12 text-xl font-semibold text-slate-300 md:text-2xl lg:text-3xl">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1000,
                  "AWS Certified",
                  1000,
                  "Kubernetes Certified",
                  1000,
                  "Rust & Python Programmer",
                  1000,
                  "Next.js & React Developer",
                  1000,
                  "Self-Taught",
                  1000,
                  "Linux Power User",
                  1000,
                  "Infrastructure Engineer",
                  1000,
                  "Home Lab Administrator",
                  1000,
                  "Always Learning",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              />
            </div>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
              I am a Full-Stack Developer specializing in Rust, Python, React,
              Typescript, Next.js, Flask and cloud-native technologies. I build
              secure and scalable systems from the backend and infrastructure to
              the user interface while leveraging my certified knowledge of AWS
              and Kubernetes and my experience using the best DevOps practices
              to deliver optimized and automated solutions across all platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button
                className="relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10">Get in Touch</span>
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
              {[
                { icon: IconBrandGithub, href: "https://github.com/Obscurely" },
                {
                  icon: IconBrandLinkedin,
                  href: "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
                },
                {
                  icon: IconBrandReddit,
                  href: "https://www.reddit.com/user/CrismarucAdrian/",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 backdrop-blur-sm transition-all duration-50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white"
                >
                  <social.icon
                    size={22}
                    strokeWidth={2.5}
                    className="transition-transform duration-50 group-hover:scale-110"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md flex-1"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur-lg"></div>
              <div className="relative overflow-hidden rounded-full border-2 border-slate-800 bg-slate-900">
                <Image
                  src="/profile.webp"
                  width={512}
                  height={512}
                  alt="John Doe"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
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
}
