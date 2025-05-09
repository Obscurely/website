"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { skills } from "@data/skills/skills";
import { AboutMe, MyJourney, services } from "@data/about";
import {
  CategoryAccentColor,
  CategoryColorClass,
  SkillCategory,
} from "@data/skills/types";
import { SkillBadge, SkillBadgeProvider } from "@components/helper/SkillBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { IconClick } from "@tabler/icons-react";

// Get all categories except KeySkills for tabs
const tabCategories = Object.values(SkillCategory).filter(
  (category) => category !== SkillCategory.KeySkills
);

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

        <div
          className="relative mb-24 grid grid-cols-1 gap-12 md:grid-cols-2"
          style={{ zIndex: 30 }}
        >
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
            <h3 className="mb-2 text-2xl font-bold text-white">My Skills</h3>

            {/* Key Skills Section */}
            <SkillBadgeProvider>
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: CategoryAccentColor.KeySkills }}
                  >
                    {SkillCategory.KeySkills}
                  </h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center text-sm text-slate-400">
                          <IconClick size={12} className="mr-1 animate-pulse" />
                          Tap for details
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="max-w-[250px] rounded-lg border border-slate-700/30 bg-gradient-to-b from-slate-800/95 to-slate-900/95 px-4 py-3 text-sm shadow-lg backdrop-blur-md transition-all duration-200"
                        sideOffset={2}
                      >
                        <div className="mb-1 font-medium text-cyan-400">
                          Skill Details
                        </div>
                        <div className="leading-relaxed text-slate-300">
                          Click any skill to see description, proficiency and
                          projects
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkillBadgeProvider>
                    {skills[SkillCategory.KeySkills].map((skill) => (
                      <SkillBadge
                        key={
                          typeof skill.name === "string"
                            ? skill.name
                            : "key-skill-" + Math.random()
                        }
                        skill={skill}
                        colorClass={CategoryColorClass.KeySkills}
                      />
                    ))}
                  </SkillBadgeProvider>
                </div>
              </div>

              <div className="mt-2 mb-2 text-xs text-slate-400 italic">
                And more skills below...
              </div>

              {/* Other Skills Categories */}
              <Tabs
                defaultValue={tabCategories[0] || SkillCategory.Frontend}
                className="w-full"
              >
                <TabsList
                  className={`mb-2 grid w-full rounded-lg bg-slate-800/30`}
                  style={{
                    gridTemplateColumns: `repeat(${tabCategories.length}, minmax(0, 1fr))`,
                  }}
                >
                  {tabCategories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-slate-700/30"
                      style={{
                        color:
                          CategoryAccentColor[
                            category as keyof typeof CategoryAccentColor
                          ],
                      }}
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabCategories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {skills[category].map((skill) => (
                        <SkillBadge
                          key={
                            typeof skill.name === "string"
                              ? skill.name
                              : `${category}-${Math.random()}`
                          }
                          skill={skill}
                          colorClass={
                            CategoryColorClass[
                              category as keyof typeof CategoryColorClass
                            ]
                          }
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </SkillBadgeProvider>
          </motion.div>
        </div>

        {/* What I do Section */}
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
      </div>
    </section>
  );
}
