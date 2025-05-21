"use client";

import Giscus from "@giscus/react";

export function BlogComments() {
  return (
    <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
      <Giscus
        id="comments"
        repo="Obscurely/website"
        repoId="975676884"
        category="blog-comments"
        categoryId="59087558"
        mapping="pathname"
        term="Welcome to the comments!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
