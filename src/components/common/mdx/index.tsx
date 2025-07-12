"use client";

import { useState } from "react";
import {
  IconCopy,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconX,
  IconCircleCheck,
  IconBulb,
  IconExternalLink,
} from "@tabler/icons-react";
import { MDXHeadings } from "./headings";
import { Card, CardContent } from "@ui/card";

/**
 * CodeBlock component that displays code snippets with a copy button.
 */
export function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: React.MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const container = button.parentElement;
    const preElement = container?.querySelector("pre") as HTMLPreElement;
    const code = preElement?.textContent || "";

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Execute copy command
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="group relative my-6">
      <pre
        className={`${className} bg-slate-970 border-slate-730 overflow-x-auto rounded-xl border p-4 text-sm leading-relaxed break-words whitespace-pre-wrap shadow-lg`}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="bg-slate-880 hover:bg-slate-780 absolute top-3 right-3 cursor-pointer rounded-lg p-2 opacity-50 transition-all duration-200 group-hover:opacity-100"
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

/**
 * Callout component for displaying important messages or warnings.
 */
export function Callout({
  children,
  type = "info",
  title,
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success" | "tip";
  title?: string;
}) {
  const config = {
    info: {
      icon: IconInfoCircle,
      styles: "bg-blue-510 border-blue-540 text-blue-100",
      iconColor: "text-blue-400",
      titleColor: "text-blue-300",
    },
    warning: {
      icon: IconAlertTriangle,
      styles: "bg-yellow-510 border-yellow-530 text-yellow-100",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-300",
    },
    error: {
      icon: IconX,
      styles: "bg-red-510 border-red-530 text-red-100",
      iconColor: "text-red-400",
      titleColor: "text-red-300",
    },
    success: {
      icon: IconCircleCheck,
      styles: "bg-green-510 border-green-530 text-green-100",
      iconColor: "text-green-400",
      titleColor: "text-green-300",
    },
    tip: {
      icon: IconBulb,
      styles: "bg-purple-510 border-purple-530 text-purple-100",
      iconColor: "text-purple-400",
      titleColor: "text-purple-300",
    },
  };

  const { icon: Icon, styles, iconColor, titleColor } = config[type];

  return (
    <div className={`my-8 rounded-xl border p-6 shadow-lg ${styles}`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`mt-0.5 flex-shrink-0 ${iconColor}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`mb-2 font-semibold ${titleColor}`}>{title}</h4>
          )}
          <div className="prose prose-sm prose-invert max-w-none [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FeatureGrid component for showcasing key features or benefits.
 */
export function FeatureGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

/**
 * FeatureCard component for individual feature items.
 */
export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className="group relative">
      <Card className="border-slate-730 bg-slate-840 hover:border-cyan-590 h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10">
        <CardContent className="flex flex-col items-center px-3 text-center">
          {icon && (
            <div className="bg-slate-990 mb-2 rounded-full p-4">
              <div className="text-2xl">{icon}</div>
            </div>
          )}
          <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
            {title}
          </h3>
          <p className="text-sm text-slate-300">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * StepGuide component for step-by-step instructions.
 */
export function StepGuide({ children }: { children: React.ReactNode }) {
  return <div className="my-10 space-y-6">{children}</div>;
}

/**
 * Step component for individual steps.
 */
export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="bg-cyan-530 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-cyan-400">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
        <div className="prose prose-sm prose-invert max-w-none text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * QuickLinks component for related resources.
 */
export function QuickLinks({
  links,
}: {
  links: Array<{ title: string; href: string; description?: string }>;
}) {
  return (
    <div className="border-slate-740 bg-slate-980 my-10 rounded-xl border p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <IconExternalLink size={20} className="text-cyan-400" />
        Quick Links
      </h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="border-slate-740 bg-slate-840 hover:border-cyan-590 hover:bg-slate-860 block rounded-lg border p-4 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-cyan-300">{link.title}</h4>
                {link.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {link.description}
                  </p>
                )}
              </div>
              <IconExternalLink size={16} className="text-slate-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Separator component for visual breaks.
 */
export function Separator() {
  return (
    <div className="my-12 flex items-center justify-center">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      <div className="mx-4 h-2 w-2 rounded-full bg-cyan-500/50"></div>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
    </div>
  );
}

export const mdxComponents = {
  ...MDXHeadings,
  pre: CodeBlock,
  Callout,
  FeatureGrid,
  FeatureCard,
  StepGuide,
  Step,
  QuickLinks,
  Separator,
};
