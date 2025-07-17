"use client";

import { memo } from "react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter } from "@ui/card";
import {
  IconBrandGithub,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import { Project } from "@data/portfolio/projects";

/**
 * ProjectImage component that displays the project image.
 *
 * @param project - The project object containing details about the project.
 * @returns An image element displaying the project image.
 */
const ProjectImage = memo(({ project }: { project: Project }) => {
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
      className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 will-change-transform group-hover:scale-105"
      style={imageStyle}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7oQAAAABJRU5ErkJggg=="
      priority={false}
    />
  );
});

ProjectImage.displayName = "ProjectImage";

/**
 * @param project - The project object containing details about the project.
 * @returns A card component displaying project details.
 */
export const ProjectCard = memo(
  ({
    project,
    index = 0,
    registerCard = () => {},
    maxHeight = 0,
  }: {
    project: Project;
    index?: number;
    isInView?: boolean;
    registerCard?: (index: number, element: HTMLElement | null) => void;
    maxHeight?: number;
  }) => {
    return (
      <div
        className="group relative z-0 h-full"
        ref={(el) => registerCard(index, el)}
      >
        <Card
          className="border-slate-740 hover:border-cyan-590 relative flex h-full flex-col overflow-hidden bg-transparent transition-all duration-300 ease-out will-change-transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/10"
          style={{
            background: "transparent",
            transformStyle: "preserve-3d",
            height: maxHeight > 0 ? `${maxHeight}px` : undefined,
          }}
        >
          {/* Background layers for different sections */}
          <div className="absolute inset-0 z-0">
            <div className="h-58 bg-slate-900/30"></div>
            <div className="h-[calc(100%-13rem)] bg-slate-800/30"></div>
            <div className="h-[3.25rem] bg-slate-900/30"></div>
          </div>

          {/* Card content */}
          <div className="relative z-[5] flex h-full flex-col">
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-900/30 p-4">
              <ProjectImage project={project} />

              {project.featured && (
                <Badge
                  className="absolute top-3 left-3 border-0 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 text-xs font-medium text-white shadow-md"
                  variant="secondary"
                >
                  <span className="flex h-5 items-center gap-1">
                    <IconStar className="mb-0.25" size={16} /> Featured
                  </span>
                </Badge>
              )}
            </div>

            <CardContent className="flex min-h-[200px] flex-grow flex-col p-6">
              <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                {project.name}
              </h3>
              <div className="mb-4 text-slate-300">{project.description}</div>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-slate-770 bg-slate-840 text-slate-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="border-slate-850 mt-auto flex justify-between border-t bg-slate-900/30 p-5">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-slate-880 rounded-lg text-cyan-400 hover:text-cyan-300"
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
                  className="hover:bg-slate-880 rounded-lg text-cyan-400 hover:text-cyan-300"
                  asChild
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    <span>Live</span>
                    <IconExternalLink size={16} />
                  </a>
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </div>
    );
  },
  // Prevent unnecessary re-renders
  (prevProps, nextProps) => {
    return (
      prevProps.project.name === nextProps.project.name &&
      prevProps.isInView === nextProps.isInView &&
      prevProps.index === nextProps.index
    );
  }
);

ProjectCard.displayName = "ProjectCard";
