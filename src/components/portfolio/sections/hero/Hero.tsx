"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "./animations";
import { IconArrowDown } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { Terminal } from "./Terminal";
import { Sidebar } from "./Sidebar";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
            <Terminal currentTime={currentTime} />

            {/* Right Column - Profile & Status Widgets */}
            <Sidebar currentTime={currentTime} />
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
              className="border-slate-630 cursor-pointer rounded-full border text-slate-400 backdrop-blur-[2px]"
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
