"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter } from "@ui/card";
import {
  IconBrandGithub,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import { Project } from "@data/projects";

// Updated card variants to match the services section
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -2,
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
export const ProjectCard = memo(({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative z-0 h-full"
    >
      <Card className="h-full overflow-hidden border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 ease-out hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-900/50 p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          {project.image ? (
            <Image
              width={600}
              height={350}
              src={project.image}
              alt={project.name}
              className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-110"
              style={{
                maxWidth: project.imageSize ? `${project.imageSize}%` : "100%",
                maxHeight: project.imageSize ? `${project.imageSize}%` : "100%",
              }}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
            />
          ) : (
            <Image
              width={600}
              height={350}
              src="/projects/github.svg"
              alt={project.name}
              className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-110"
              style={{
                maxWidth: "70%",
                maxHeight: "70%",
                minWidth: "50%",
                minHeight: "50%",
              }}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
            />
          )}

          {project.featured && (
            <Badge
              className="absolute top-3 left-3 border-0 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 text-xs font-medium text-white shadow-md"
              variant="secondary"
            >
              <span className="flex h-5 items-center gap-1">
                <IconStar className="mb-0.5" size={16} /> Featured
              </span>
            </Badge>
          )}
        </div>

        <CardContent className="flex-grow p-6">
          <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
            {project.name}
          </h3>
          <p className="mb-4 text-slate-300">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-700/70 bg-slate-800/30 text-slate-300"
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
});
