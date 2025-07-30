import { CopyButton } from "./CopyButton";

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
  return (
    <div className="group relative my-6">
      <pre
        className={`${className} bg-slate-970 border-slate-730 overflow-x-auto rounded-xl border p-4 text-sm leading-relaxed break-words whitespace-pre-wrap shadow-lg font-mono`}
      >
        {children}
      </pre>
      <CopyButton />
    </div>
  );
}
