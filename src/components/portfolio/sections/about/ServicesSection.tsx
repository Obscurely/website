"use client";

import { Card, CardContent } from "@ui/card";
import { services } from "@data/portfolio/about";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
};

/**
 * ServicesSection component that displays a list of services.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "0px 0px 0px 0px",
    amount: 0.2,
    once: true,
  });

  return (
    <div className="relative" style={{ zIndex: 10 }} ref={ref}>
      <h3
        className="data-[state=once]:animate-in fade-in slide-in-from-bottom-50 relative z-10 mb-10 text-center text-3xl font-bold text-white opacity-0 duration-500 ease-out data-[state=once]:opacity-100"
        data-state="once"
      >
        What I Do
      </h3>

      <div className="relative z-0 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="group relative z-0"
          >
            <Card className="border-slate-730 bg-slate-830 hover:border-cyan-590 h-full transform-gpu overflow-hidden transition-all duration-300 ease-out will-change-transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/10">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="bg-slate-990 mb-5 rounded-full p-4">
                  {service.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {service.title}
                </h4>
                <p className="text-slate-300">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
