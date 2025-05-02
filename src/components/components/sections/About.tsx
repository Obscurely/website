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

const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "SCSS",
    "Redux",
    "Framer Motion",
    "React Query",
  ],
  design: [
    "Figma",
    "Adobe XD",
    "UI/UX",
    "Responsive Design",
    "Design Systems",
    "Wireframing",
    "Prototyping",
  ],
  backend: [
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "REST API",
    "GraphQL",
    "Firebase",
    "AWS",
  ],
  tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Neovim",
    "Docker",
    "CI/CD",
    "Jest",
    "Testing Library",
    "Webpack",
    "Vite",
  ],
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
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
    <section id="about" ref={ref} className="bg-slate-900/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            About Me
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            I'm a passionate developer with a keen eye for design and a love for
            creating exceptional digital experiences. With a strong foundation
            in modern web technologies, I strive to build applications that are
            not only functional but also intuitive and enjoyable to use.
          </p>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-slate-200">
              My Journey
            </h3>
            <p className="mb-4 text-slate-400">
              I started my journey in web development over 5 years ago, driven
              by curiosity and a desire to create. Since then, I've worked on
              numerous projects, from small business websites to complex web
              applications, constantly learning and improving my skills along
              the way.
            </p>
            <p className="mb-4 text-slate-400">
              My approach combines technical expertise with creative
              problem-solving, allowing me to deliver solutions that are both
              technically sound and aesthetically pleasing. I believe in writing
              clean, maintainable code and creating user experiences that
              delight and inspire.
            </p>
            <p className="text-slate-400">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge
              through writing and mentoring.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-slate-200">
              Skills & Expertise
            </h3>
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="mb-6 grid grid-cols-4 bg-slate-800/50">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-slate-800 py-1.5 text-slate-300 hover:bg-slate-700"
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

        <h3 className="mb-8 text-center text-2xl font-bold text-slate-200">
          What I Do
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Card className="h-full border-slate-700 bg-slate-800/50 transition-all duration-300 hover:border-cyan-500/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-slate-900 p-3">
                    {service.icon}
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-slate-200">
                    {service.title}
                  </h4>
                  <p className="text-slate-400">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
