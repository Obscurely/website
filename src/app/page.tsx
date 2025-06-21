"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@portfolio/sections/hero/Hero";
import { About } from "@portfolio/sections/about/About";
import { Projects } from "@portfolio/sections/projects/Projects";
import { Blog } from "@portfolio/sections/Blog";
import { Contact } from "@portfolio/sections/Contact";
import { Navbar } from "@portfolio/layout/Navbar";
import { Footer } from "@common/layout/Footer";

export default function Home() {
  // Create a ref for the entire page
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the document as the scroll container instead of a specific element
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-200"
    >
      <Navbar />
      <main className="relative">
        <motion.div
          style={{ opacity, scale }}
          className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
        >
          <div className="absolute inset-0 h-full w-full bg-slate-800/75" />
          <div className="absolute inset-0 h-full w-full bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat opacity-10" />
        </motion.div>

        <div className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Blog />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
