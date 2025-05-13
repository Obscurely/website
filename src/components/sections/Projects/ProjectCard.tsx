import { motion } from "framer-motion";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter } from "@ui/card";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { Project } from "@data/projects";
import { projectVariants } from "./animations";

/**
 * @param project - The project object containing details about the project.
 * @returns A card component displaying project details.
 */
export const ProjectCard = ({ project }: { project: Project }) => {
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
