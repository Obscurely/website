"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    date: "2021 - Present",
    description:
      "Leading the frontend development team in building modern web applications using React, Next.js, and TypeScript. Implementing design systems and optimizing performance.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Performance Optimization",
    ],
  },
  {
    type: "work",
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    date: "2019 - 2021",
    description:
      "Developed responsive web applications and collaborated with designers to implement UI/UX designs. Worked on improving website performance and accessibility.",
    skills: ["JavaScript", "React", "CSS3", "SCSS", "Responsive Design"],
  },
  {
    type: "education",
    title: "Master of Computer Science",
    company: "University of Technology",
    date: "2017 - 2019",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on optimizing user experiences in web applications.",
    skills: ["Research", "UI/UX", "Web Technologies", "HCI"],
  },
  {
    type: "work",
    title: "Junior Web Developer",
    company: "Creative Web Agency",
    date: "2016 - 2019",
    description:
      "Developed websites for clients across various industries. Collaborated with designers and backend developers to deliver complete web solutions.",
    skills: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress"],
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    company: "State University",
    date: "2012 - 2016",
    description:
      "Graduated with honors. Focused on software development and web technologies.",
    skills: ["Programming", "Algorithms", "Web Development", "Databases"],
  },
  {
    type: "award",
    title: "Innovation Award",
    company: "Web Development Conference",
    date: "2020",
    description:
      "Recognized for innovative approach to frontend architecture and performance optimization techniques.",
    skills: ["Innovation", "Frontend Architecture", "Performance"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-5 w-5 text-cyan-400" />;
      case "education":
        return <GraduationCap className="h-5 w-5 text-cyan-400" />;
      case "award":
        return <Award className="h-5 w-5 text-cyan-400" />;
      default:
        return <Briefcase className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" ref={ref} className="bg-slate-900/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Experience & Education
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            My professional journey and educational background that have shaped
            my skills and expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mx-auto max-w-4xl"
        >
          {/* Timeline line */}
          <div className="absolute left-0 h-full w-0.5 transform bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-700 md:left-1/2 md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-12 md:mb-8 ${
                index % 2 === 0
                  ? "md:mr-1/2 md:ml-auto md:pr-12 md:text-right"
                  : "md:ml-1/2 md:pl-12"
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-0 ${
                  index % 2 === 0 ? "right-0 md:-right-3" : "left-0 md:-left-3"
                } z-10 h-6 w-6 rounded-full border-2 border-cyan-500 bg-slate-900`}
              ></div>

              <Card className="border-slate-700 bg-slate-800/50 transition-all duration-300 hover:border-cyan-500/50">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    {getIcon(exp.type)}
                    <Badge
                      className={` ${exp.type === "work" ? "border-cyan-500/30 bg-cyan-500/20 text-cyan-400" : ""} ${exp.type === "education" ? "border-blue-500/30 bg-blue-500/20 text-blue-400" : ""} ${exp.type === "award" ? "border-amber-500/30 bg-amber-500/20 text-amber-400" : ""} `}
                    >
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </Badge>
                    <span className="ml-auto text-sm text-slate-400">
                      {exp.date}
                    </span>
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-slate-200">
                    {exp.title}
                  </h3>
                  <h4 className="mb-3 text-cyan-400">{exp.company}</h4>
                  <p className="mb-4 text-slate-400">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-slate-700 bg-slate-900/50 text-slate-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
