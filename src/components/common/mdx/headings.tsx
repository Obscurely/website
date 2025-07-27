import React from "react";

import Image from "next/image";

import { IconExternalLink } from "@tabler/icons-react";

export const MDXHeadings = {
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-6 text-3xl font-bold text-white" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-2xl font-bold text-white" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-bold text-white" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-4 mb-2 text-lg font-semibold text-white" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="mt-4 mb-2 text-base font-semibold text-white" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="mt-4 mb-2 text-sm font-semibold text-white" {...props}>
      {children}
    </h6>
  ),

  // Text elements
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-slate-300" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 ml-6 list-disc space-y-2 text-slate-300 marker:text-cyan-400"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 ml-6 list-decimal space-y-2 text-slate-300 marker:text-cyan-400"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-slate-300" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");

    return (
      <a
        href={href}
        className="inline-flex items-center gap-1 text-cyan-400 transition-colors duration-200 hover:text-cyan-300 underline"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {isExternal && <IconExternalLink size={14} className="inline" />}
      </a>
    );
  },

  // Text formatting
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-slate-200 italic" {...props}>
      {children}
    </em>
  ),

  // Blockquotes
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="bg-slate-970 my-6 border-l-4 border-cyan-500 p-6 text-slate-300 italic shadow-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-slate-700 text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-slate-970" {...props}>
      {children}
    </thead>
  ),
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-slate-830 border-b border-slate-700" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-slate-700 px-4 py-2 text-left font-semibold text-white"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-slate-700 px-4 py-2 text-slate-300" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-slate-700" {...props} />
  ),

  // Images (if you want custom styling)
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) =>
    typeof src === "string" &&
    alt && (
      <Image
        src={src}
        alt={alt}
        className="my-6 h-auto max-w-xs rounded-xl shadow-2xl sm:max-w-sm md:max-w-md"
        {...props}
        width={400}
        height={300}
      />
    ),
};
