"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { skills } from "@data/skills/skills";
import { AboutMe, MyJourney, services } from "@data/about";
import { SkillCategory } from "@data/skills/types";
import { SkillBadge } from "@components/helper/SkillBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            About Me
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>

          {/* Paragraph about me focusing on my soft skills and approach to work. */}
          <div className="mx-auto max-w-3xl">
            <AboutMe />
          </div>
        </motion.div>

        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left side: My Journey */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">My Journey</h3>
            <MyJourney />
          </motion.div>

          {/* Right side: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">My Skills</h3>

            {/* Key Skills Section */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-cyan-400/90">
                  Key Skills
                </h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        Click for details
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-xs">
                      <p>Click any skill to see proficiency and projects</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills[SkillCategory.KeySkills].map((skill) => (
                  <SkillBadge
                    key={
                      typeof skill.name === "string"
                        ? skill.name
                        : "key-skill-" + Math.random()
                    }
                    skill={skill}
                    colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-cyan-500/10 hover:border-cyan-500/20"
                  />
                ))}
              </div>
            </div>

            {/* Other Skills Categories */}
            <Tabs defaultValue={SkillCategory.Frontend} className="w-full">
              <TabsList className="mb-4 grid grid-cols-5 rounded-lg bg-slate-800/30">
                <TabsTrigger
                  value={SkillCategory.Frontend}
                  className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-cyan-400/90"
                >
                  Frontend
                </TabsTrigger>
                <TabsTrigger
                  value={SkillCategory.Backend}
                  className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-indigo-400/90"
                >
                  Backend
                </TabsTrigger>
                <TabsTrigger
                  value={SkillCategory.Languages}
                  className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-emerald-400/90"
                >
                  Languages
                </TabsTrigger>
                <TabsTrigger
                  value={SkillCategory.DevOps}
                  className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-amber-400/90"
                >
                  DevOps
                </TabsTrigger>
                <TabsTrigger
                  value={SkillCategory.Business}
                  className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-rose-400/90"
                >
                  Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value={SkillCategory.Frontend} className="mt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skills[SkillCategory.Frontend].map((skill) => (
                    <SkillBadge
                      key={
                        typeof skill.name === "string"
                          ? skill.name
                          : "frontend-" + Math.random()
                      }
                      skill={skill}
                      colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-cyan-500/10 hover:border-cyan-500/20"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-400 italic">
                  And more skills in this category...
                </div>
              </TabsContent>

              <TabsContent value={SkillCategory.Backend} className="mt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skills[SkillCategory.Backend].map((skill) => (
                    <SkillBadge
                      key={
                        typeof skill.name === "string"
                          ? skill.name
                          : "backend-" + Math.random()
                      }
                      skill={skill}
                      colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-indigo-500/10 hover:border-indigo-500/20"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-400 italic">
                  And more skills in this category...
                </div>
              </TabsContent>

              <TabsContent value={SkillCategory.Languages} className="mt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skills[SkillCategory.Languages].map((skill) => (
                    <SkillBadge
                      key={
                        typeof skill.name === "string"
                          ? skill.name
                          : "lang-" + Math.random()
                      }
                      skill={skill}
                      colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-emerald-500/10 hover:border-emerald-500/20"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-400 italic">
                  And more skills in this category...
                </div>
              </TabsContent>

              <TabsContent value={SkillCategory.DevOps} className="mt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skills[SkillCategory.DevOps].map((skill) => (
                    <SkillBadge
                      key={
                        typeof skill.name === "string"
                          ? skill.name
                          : "devops-" + Math.random()
                      }
                      skill={skill}
                      colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-amber-500/10 hover:border-amber-500/20"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-400 italic">
                  And more skills in this category...
                </div>
              </TabsContent>

              <TabsContent value={SkillCategory.Business} className="mt-0">
                <div className="flex flex-wrap gap-1.5">
                  {skills[SkillCategory.Business].map((skill) => (
                    <SkillBadge
                      key={
                        typeof skill.name === "string"
                          ? skill.name
                          : "business-" + Math.random()
                      }
                      skill={skill}
                      colorClass="bg-slate-800/50 hover:bg-slate-700/50 border-rose-500/10 hover:border-rose-500/20"
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-400 italic">
                  And more skills in this category...
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* What I do Section */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10 text-center text-3xl font-bold text-white"
        >
          What I Do
        </motion.h3>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group"
            >
              <Card className="h-full overflow-hidden border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-5 rounded-full bg-slate-900/80 p-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-900">
                    {service.icon}
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-white">
                    {service.title}
                  </h4>
                  <p className="text-slate-300">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
