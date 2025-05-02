"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
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
            <h2 className="mb-2 text-xl font-medium text-cyan-400 md:text-2xl">
              Hello, I'm
            </h2>
            <h1 className="mb-4 text-4xl font-bold text-slate-100 md:text-6xl lg:text-7xl">
              <span className="block">Adrian Crîșmaruc</span>
            </h1>
            <div className="mb-6 h-12 text-xl font-semibold text-slate-300 md:text-2xl lg:text-3xl">
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
            <p className="mb-8 max-w-xl text-lg text-slate-400 md:text-xl">
              I am a Full-Stack Developer specializing in Rust, Python, React,
              Typescript, Next.js, Flask and cloud-native technologies. I build
              secure and scalable systems from the backend and infrastructure to
              the user interface while leveraging my certified knowledge of AWS
              and Kubernetes and my experience using the best DevOps practices
              to deliver optimized and automated solutions across all platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 text-white hover:from-cyan-600 hover:to-blue-600">
                Get in Touch
              </Button>
              <Button
                variant="outline"
                className="border-slate-700 px-6 py-6 text-slate-300 hover:border-slate-500 hover:text-white"
              >
                View Projects
              </Button>
            </div>
            <div className="mt-8 flex justify-center gap-4 md:justify-start">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Twitter size={20} />
              </motion.a>
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
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-slate-700 text-slate-400"
              onClick={() => {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ArrowDown size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
