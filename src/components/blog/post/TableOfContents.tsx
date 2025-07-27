"use client";

import { TocItem } from "@data/blog/toc";
import { useToc } from "@hooks/blog/useToc";

interface TableOfContentsProps {
  toc: TocItem[];
}

/**
 * TableOfContents component displays a list of links to the headings in a blog post.
 */
export function TableOfContents({ toc }: TableOfContentsProps) {
  const { activeId, handleClick } = useToc(toc);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="border-slate-730 bg-slate-980 rounded-xl border p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Table of Contents
      </h3>
      <nav aria-label="Table of Contents">
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
                onClick={(e) => handleClick(e, item.slug)}
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
