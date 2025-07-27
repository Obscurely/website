import Image from "next/image";

import { IconCalendar, IconClock, IconCoffee } from "@tabler/icons-react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";

import { ShareButton } from "./ShareButton";

interface HeaderProps {
  post: {
    frontmatter: {
      title: string;
      description: string;
      tags: string[];
      featured?: boolean;
      image?: string;
    };
    readingTime: string;
  };
  formattedDate: string;
}

export const Header = ({ post, formattedDate }: HeaderProps) => {
  return (
    <div className="order-1 lg:hidden">
      <header className="not-prose mb-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.frontmatter.featured && (
            <Badge
              variant="outline"
              className="border-cyan-460 bg-cyan-510 hover:bg-cyan-520 text-xs font-medium text-cyan-300"
            >
              Featured
            </Badge>
          )}
          {post.frontmatter.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-slate-650 bg-slate-730 hover:border-slate-570 hover:bg-slate-640 px-3 py-1 text-slate-300 transition-colors hover:shadow-slate-500/10"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mb-6 bg-gradient-to-r bg-clip-text text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
          {post.frontmatter.title}
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-slate-400">
          {post.frontmatter.description}
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <IconCalendar size={18} className="text-cyan-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconClock size={18} className="text-cyan-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://ko-fi.com/Obscurely"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="border-slate-750 bg-slate-840 hover:border-cyan-590 hover:bg-slate-850 z-50 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-slate-300 transition-all duration-300 group-hover:translate-0 hover:translate-0 hover:text-cyan-400 hover:shadow-md">
                <IconCoffee size={18} />
                <span className="hidden sm:inline">Coffee</span>
              </Button>
            </a>
            <ShareButton />
          </div>
        </div>

        {post.frontmatter.image && (
          <div className="relative mb-8 flex justify-center">
            <div className="overflow-visible rounded-2xl">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={400}
                height={300}
                className="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
                priority
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
