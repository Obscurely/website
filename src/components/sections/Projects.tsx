"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter } from "@ui/card";
import {
  IconBrandGithub,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "next/image";
import { projects, categories, Project } from "@data/projects";

export default function Projects() {
  // Add "All" and "Featured" to the categories for filtering
  const filterCategories = ["All", "Featured", ...categories];
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Convert projects object to array for easier manipulation
  const projectsArray = Object.values(projects);

  const filteredProjects = projectsArray.filter((project: Project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    return project.category === activeCategory;
  });

  const projectVariants = {
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

  return (
    <section id="projects" ref={ref} className="bg-slate-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            My Projects
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Here are some of the projects I've worked on. Each project
            represents a unique challenge and showcases different aspects of my
            skills and expertise.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filterCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.slice(0, visibleProjects).map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={projectVariants}
            >
              <Card className="flex h-full flex-col overflow-hidden border-slate-800 bg-slate-900 transition-all duration-300 hover:border-cyan-500/50">
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-900 p-4">
                  <Image
                    width={500}
                    height={300}
                    src={project.image}
                    alt={project.name}
                    className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-500 hover:scale-110"
                    style={{
                      maxHeight: project.image.endsWith(".svg")
                        ? "90%"
                        : "100%",
                      maxWidth: project.image.endsWith(".svg") ? "90%" : "100%",
                    }}
                  />
                  {project.featured && (
                    <Badge className="absolute top-2 right-2 bg-cyan-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-200">
                    {project.name}
                  </h3>
                  <p className="mb-4 text-slate-400">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-slate-700 bg-slate-800/50 text-slate-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <IconBrandGithub size={16} />
                      <span>Code</span>
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <IconExternalLink size={16} />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => setVisibleProjects((prev) => prev + 3)}
              className="bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Load More Projects
              <IconArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
