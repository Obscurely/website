"use client";

import { Button } from "@ui/button";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface LoadMoreButtonProps {
  isInView: boolean;
  handleLoadMoreAction: () => void;
  disabled?: boolean;
}

export const LoadMoreButton = ({
  isInView,
  handleLoadMoreAction,
  disabled = false,
}: LoadMoreButtonProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInView) {
      timeoutId = setTimeout(() => {
        setVisible(true);
      }, 400);
    } else {
      setVisible(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]);

  const isButtonDisabled = !visible || disabled;

  return (
    <div className="mt-16 text-center">
      <Button
        onClick={handleLoadMoreAction}
        disabled={isButtonDisabled}
        className={`group relative cursor-pointer overflow-hidden rounded-full px-6 py-3 text-white shadow-lg transition-all ${
          isButtonDisabled
            ? "cursor-not-allowed bg-gradient-to-r from-gray-400/80 to-gray-500/80 opacity-70"
            : "bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:shadow-cyan-500/20"
        }`}
        size="lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          {disabled ? "No More Projects" : "View More Projects"}
          <IconChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              !isButtonDisabled ? "group-hover:translate-y-1" : ""
            }`}
          />
        </span>
        <span
          className={`absolute inset-0 ${
            isButtonDisabled
              ? "bg-gradient-to-r from-gray-500 to-gray-600 opacity-0"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          }`}
        ></span>
      </Button>
    </div>
  );
};
