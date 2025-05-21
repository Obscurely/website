"use client";

import { useState, useEffect } from "react";

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    // Observe all section headings
    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Table of Contents
      </h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {toc.map((item) => (
            <li key={item.slug} className={`${item.level === 3 ? "ml-4" : ""}`}>
              <a
                href={`#${item.slug}`}
                className={`block transition-colors duration-200 ${
                  activeId === item.slug
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${item.slug}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
