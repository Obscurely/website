"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/components/sections/Hero";
import About from "../components/components/sections/About";
import Projects from "../components/components/sections/Projects";
import Experience from "../components/components/sections/Experience";
import Blog from "../components/components/sections/Blog";
import Contact from "../components/components/sections/Contact";
import Navbar from "../components/components/layout/Navbar";
import Footer from "../components/components/layout/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 h-full w-full bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat opacity-10" />
        </motion.div>

        <div className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
