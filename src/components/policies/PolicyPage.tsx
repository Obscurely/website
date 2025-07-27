import { useMemo } from "react";

import Link from "next/link";

import { MDXPolicy } from "@lib/policies";
import { IconArrowLeft, IconCalendar } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { format } from "date-fns";

interface PolicyPageProps {
  policy: MDXPolicy;
}

/**
 * PolicyPage component displays a policy document with its content and metadata.
 */
export function PolicyPage({ policy }: PolicyPageProps) {
  // Memoized calculations
  const formattedDate = useMemo(
    () => format(new Date(policy.frontmatter.lastUpdated), "MMMM d, yyyy"),
    [policy.frontmatter.lastUpdated]
  );

  return (
    <section className="relative overflow-hidden py-20 pt-26">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to home button */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <Button
              variant="link"
              className="group inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border-cyan-500/20 px-4 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500/50 hover:text-white"
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to home
              </span>
            </Button>
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="mb-6 bg-gradient-to-r bg-clip-text text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
              {policy.frontmatter.title}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-400">
              {policy.frontmatter.description}
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <IconCalendar size={18} className="text-cyan-400" />
              <span>Last updated: {formattedDate}</span>
            </div>
          </header>

          {/* Main content */}
          <article className="prose prose-invert prose-slate prose-lg prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:no-underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-cyan-300 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:shadow-lg prose-code:rounded prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-2xl prose-hr:border-slate-700 max-w-none">
            {/* MDX Content */}
            <div className="mdx-content space-y-8">{policy.mdxContent}</div>
          </article>
        </div>
      </div>
    </section>
  );
}
