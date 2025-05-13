"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter } from "@ui/card";
import {
  IconBrandGithub,
  IconExternalLink,
  IconChevronDown,
} from "@tabler/icons-react";
import Image from "next/image";
import { projects, categories, Project } from "@data/projects";

// Convert projects to array and sort featured first
const projectsArray = Object.values(projects).sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
);

// Add "All" and "Featured" to the categories for filtering
const filterCategories = ["All", "Featured", ...categories];

// Animations with reduced intensity for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
    },
  },
};

const projectsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * @param project - The project object containing details about the project.
 * @returns A card component displaying project details.
 */
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={projectVariants}
      layout
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:border-cyan-500/30">
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-900/50 p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <Image
            width={600}
            height={350}
            src={project.image}
            alt={project.name}
            className="h-auto max-h-full w-auto max-w-full object-contain transition-all duration-500 group-hover:scale-105"
            style={{
              maxHeight: project.image.endsWith(".svg") ? "85%" : "100%",
              maxWidth: project.image.endsWith(".svg") ? "85%" : "100%",
            }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
          />

          {project.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-xs font-medium text-white shadow-md">
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="flex-grow p-6">
          <h3 className="mb-3 text-xl font-bold text-slate-100 group-hover:text-cyan-50">
            {project.name}
          </h3>
          <p className="mb-4 text-slate-400 group-hover:text-slate-300">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-700/70 bg-slate-800/30 text-slate-300 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-800/50 bg-slate-900/30 p-5">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-cyan-400 hover:bg-slate-800/80 hover:text-cyan-300"
            asChild
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <IconBrandGithub size={16} />
              <span>Code</span>
            </a>
          </Button>

          {project.liveUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-cyan-400 hover:bg-slate-800/80 hover:text-cyan-300"
              asChild
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <span>Live Demo</span>
                <IconExternalLink size={16} />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 projects initially
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });

  // Memoize filtered projects with featured ones first
  const filteredProjects = useMemo(() => {
    let filtered = projectsArray.filter((project: Project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Featured") return project.featured;
      return project.category === activeCategory;
    });

    // If showing all projects, ensure featured ones appear first
    if (activeCategory === "All") {
      filtered = [
        ...filtered.filter((p) => p.featured),
        ...filtered.filter((p) => !p.featured),
      ];
    }

    return filtered;
  }, [activeCategory]);

  // Memoize visible projects
  const visibleProjectsList = useMemo(() => {
    return filteredProjects.slice(0, visibleProjects);
  }, [filteredProjects, visibleProjects]);

  // Use callback for category change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleProjects(6); // Reset to show 6 projects when changing category
  }, []);

  // Use callback for loading more projects
  const handleLoadMore = useCallback(() => {
    setVisibleProjects((prev) => prev + 6);
  }, []);

  return (
    <section id="projects" className="relative">
      {/* Transition element */}
      <div className="absolute top-0 left-0 h-24 w-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(15, 23, 42, 0.95)"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div
        ref={ref}
        className="relative overflow-hidden bg-slate-950 pt-16 pb-20"
      >
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[50%] w-[50%] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute -right-[10%] -bottom-[30%] h-[50%] w-[50%] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16 text-center"
          >
            <h2 className="mb-2 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl leading-relaxed font-bold text-transparent md:text-4xl lg:text-5xl">
              My Projects
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              Here are some of the projects I've made. Each project posed a new
              challenge and showcases my different skills and knowledge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-slate-800/50 bg-slate-900/50 p-1.5 shadow-lg backdrop-blur-sm">
              {filterCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  className={
                    activeCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                  }
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isInView && (
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={projectsContainerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {visibleProjectsList.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {visibleProjects < filteredProjects.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <Button
                onClick={handleLoadMore}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 px-6 py-3 text-white shadow-lg transition-all hover:shadow-cyan-500/20"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View More Projects
                  <IconChevronDown
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
