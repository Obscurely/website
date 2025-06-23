import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const usePostPage = (sidebarWidth: number) => {
  const [initialWidth, setInitialWidth] = useState<number | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Capture initial width to prevent flickering
  useEffect(() => {
    if (sidebarWidth > 0 && initialWidth === null) {
      setInitialWidth(sidebarWidth);
    }
  }, [sidebarWidth, initialWidth]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = url;
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

      setShareState("copied");
      toast.success("Link copied to clipboard!");
      setTimeout(() => setShareState("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      setShareState("error");
      toast.error("Failed to copy link. Please try again.");
      setTimeout(() => setShareState("idle"), 2000);
    }
  }, []);

  return {
    initialWidth,
    shareState,
    isMobile,
    handleShare,
  };
};
