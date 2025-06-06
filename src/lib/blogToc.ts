/**
 * Generate the table of contents for a blog post.
 */
export function getTableOfContents(content: string) {
  const headingLines = content
    .split("\n")
    .filter((line) => line.match(/^#{2,3}\s+(.*)$/));

  return headingLines.map((line) => {
    const level = line.match(/^(#{2,3})\s+/)?.[1]?.length || 2;
    const text = line.replace(/^#{2,3}\s+/, "");
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return {
      level,
      text,
      slug,
    };
  });
}
