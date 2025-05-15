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
import { cardVariants } from "./animations";

const ProjectImage = ({ project }: { project: Project }) => {
  const imageSrc = project.image || "/projects/github.svg";
  const imageStyle = project.image
    ? {
        maxWidth: project.imageSize ? `${project.imageSize}%` : "100%",
        maxHeight: project.imageSize ? `${project.imageSize}%` : "100%",
      }
    : {
        maxWidth: "70%",
        maxHeight: "70%",
        minWidth: "50%",
        minHeight: "50%",
      };

  return (
    <Image
      width={600}
      height={350}
      src={imageSrc}
      alt={project.name}
      className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-110"
      style={imageStyle}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
    />
  );
};

/**
 * @param project - The project object containing details about the project.
 * @returns A card component displaying project details.
 */
export const ProjectCard = memo(
  ({
    project,
    index = 0,
    isInView = false,
  }: {
    project: Project;
    index?: number;
    isInView?: boolean;
  }) => {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={index}
        whileHover="hover"
        className="group relative z-0 h-full"
      >
        <Card className="h-full overflow-hidden border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 ease-out hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-900/50 p-4">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <ProjectImage project={project} />

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
  }
);
