"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@ui/card";
import { services } from "@data/about";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

interface ServicesSectionProps {
  isInView: boolean;
}

/**
 * ServicesSection component that displays a list of services.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const ServicesSection = ({ isInView }: ServicesSectionProps) => {
  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 mb-10 text-center text-3xl font-bold text-white"
      >
        What I Do
      </motion.h3>

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
            <Card className="h-full overflow-hidden border-slate-700/50 bg-slate-800/30 transition-all duration-300 ease-out hover:translate-y-[-2px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-5 rounded-full bg-slate-900/80 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900">
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
