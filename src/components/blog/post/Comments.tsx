"use client";

import Giscus from "@giscus/react";

/**
 * Comments component integrates Giscus for blog post comments.
 */
export function Comments() {
  return (
    <div className="min-h-[300px] rounded-lg border border-slate-700/30 bg-slate-800/20 p-3 sm:min-h-[380px] sm:rounded-xl sm:p-4 lg:min-h-[430px] lg:p-6">
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
