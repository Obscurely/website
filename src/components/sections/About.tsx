"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import {
  IconCode,
  IconPalette,
  IconBulb,
  IconRocket,
} from "@tabler/icons-react";
import { skills } from "@data/skills";

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

  const services = [
    {
      icon: <IconCode className="h-10 w-10 text-cyan-400" />,
      title: "Web Development",
      description:
        "Building responsive and performant web applications with modern technologies and best practices.",
    },
    {
      icon: <IconPalette className="h-10 w-10 text-cyan-400" />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and beautiful user interfaces with a focus on user experience and accessibility.",
    },
    {
      icon: <IconBulb className="h-10 w-10 text-cyan-400" />,
      title: "Consultation",
      description:
        "Providing expert advice on web technologies, architecture, and development strategies.",
    },
    {
      icon: <IconRocket className="h-10 w-10 text-cyan-400" />,
      title: "Performance Optimization",
      description:
        "Improving website speed and performance for better user experience and SEO rankings.",
    },
  ];

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
          <div className="mx-auto max-w-3xl">
            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              From a very young age, I got captivated by tech, first by
              tinkering with <span className="font-bold">Linux</span> and then
              with programming, leading to my <strong>self-taught</strong>{" "}
              journey. Being <strong>self-taught</strong> has helped me become{" "}
              <strong>highly adaptable</strong> and{" "}
              <strong>quick to learn</strong> new technologies, enabling me to
              develop{" "}
              <span className="font-semibold italic">
                clever and elegant solutions to complex problems
              </span>
              . I am <strong>constantly learning</strong>, improving and staying
              current with the tech space to deliver{" "}
              <span className="font-semibold italic">
                high-quality end products on par with industry standards
              </span>{" "}
              by managing my time and{" "}
              <span className="font-semibold italic">
                focusing on what's important first.
              </span>
            </p>
          </div>
        </motion.div>

        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">My Journey</h3>
            <p className="leading-relaxed text-slate-300">
              My journey in tech began in my{" "}
              <strong>earliest years of childhood</strong>. Initially, I
              experimented with different software, tried new things and was
              genuinely <strong>curious</strong> to see the outcome of doing
              something new while also{" "}
              <span className="font-semibold italic">
                breaking stuff in the process and learning from it
              </span>
              . By age 10, I had already been experimenting with
              <span className="font-bold"> virtual machines, Linux</span>, and
              more advanced tools, and two years later, I started{" "}
              <strong>formally programming</strong> and setting up a home server
              on an older laptop. I went from building small projects to now,{" "}
              <strong>7 years later</strong>, having built{" "}
              <span className="font-semibold italic">
                RekoSearch - an almost 50k LoC SaaS app made with Rust, Python
                and web technologies on AWS and Kubernetes
              </span>{" "}
              - and my <span className="font-bold">Home Lab</span> with{" "}
              <strong>47+ user-accessible services</strong> securely exposed to
              the internet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">
              Skills & Expertise
            </h3>
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="mb-6 grid grid-cols-4 rounded-lg bg-slate-800/50">
                <TabsTrigger
                  value="frontend"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  Frontend
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="backend"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  Backend
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  Tools
                </TabsTrigger>
              </TabsList>
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        className="border border-slate-700/50 bg-slate-800/70 px-3 py-1.5 text-slate-200 transition-colors hover:bg-slate-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>

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
