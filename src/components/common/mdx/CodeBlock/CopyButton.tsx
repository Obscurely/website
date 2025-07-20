"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export const CopyButton = () => {
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
  );
};
