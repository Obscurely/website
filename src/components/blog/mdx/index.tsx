"use client";

import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = children?.toString() || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <pre className={className}>{children}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-md bg-slate-700/50 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <IconCheck size={16} className="text-green-400" />
        ) : (
          <IconCopy size={16} className="text-slate-400" />
        )}
      </button>
    </div>
  );
}

export function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
}) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    success: "bg-green-500/10 border-green-500/30 text-green-400",
  };

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
  Callout,
};
