import React from "react";

export const MDXHeadings = {
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
};
