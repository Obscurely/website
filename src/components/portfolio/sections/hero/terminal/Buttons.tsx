"use client";

import { IconArrowRight, IconCode, IconUser } from "@tabler/icons-react";
import { Button } from "@ui/button";

export const Buttons = () => {
  return (
    <>
      <Button
        className="group relative h-10 w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 will-change-transform"
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
      </Button>
      <Button
        variant="outline"
        className="border-cyan-570 hover:border-cyan-590 h-10 w-full cursor-pointer rounded-lg px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
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
        className="border-cyan-570 hover:border-cyan-590 h-10 w-full cursor-pointer rounded-lg px-4 py-3 text-slate-300 transition-all duration-300 will-change-transform hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
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
    </>
  );
};
