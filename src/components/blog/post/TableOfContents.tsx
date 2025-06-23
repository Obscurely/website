"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

/**
 * TableOfContents component displays a list of links to the headings in a blog post.
 */
export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // Debounced setActiveId to prevent rapid updates during scrolling
  const debouncedSetActiveId = useCallback((id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 50); // Small delay to prevent rapid updates
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible
        let mostVisible = entries[0];
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry;
          }
        });

        if (mostVisible && mostVisible.isIntersecting) {
          debouncedSetActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
      }
    );

    // Observe all section headings
    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [debouncedSetActiveId]);

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
                className={`block transition-all duration-300 ease-out ${
                  activeId === item.slug
                    ? "translate-x-1 font-medium text-cyan-400"
                    : "translate-x-0 text-slate-400 hover:text-slate-200"
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
