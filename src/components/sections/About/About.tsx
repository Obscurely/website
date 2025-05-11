"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import AboutHeader from "./AboutHeader";
import AboutJourney from "./AboutJourney";
import SkillsSection from "./SkillsSection";
import ServicesSection from "./ServicesSection";
import CertificationsSection from "./CertificationsSection";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95))",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-[100px]"></div>
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-blue-500 blur-[100px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeader isInView={isInView} />

        <div
          className="relative mb-10 grid grid-cols-1 gap-10 md:grid-cols-2"
          style={{ zIndex: 30 }}
        >
          <AboutJourney isInView={isInView} />
          <SkillsSection isInView={isInView} />
        </div>

        <div className="mb-20">
          <CertificationsSection isInView={isInView} />
        </div>

        <div>
          <ServicesSection isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
