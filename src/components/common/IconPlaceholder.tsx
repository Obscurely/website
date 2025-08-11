import { memo } from "react";

// Loading placeholder component
export const IconPlaceholder = memo(function IconPlaceholder({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-slate-600 rounded ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      aria-label="Loading icon..."
      role="img"
    />
  );
});
