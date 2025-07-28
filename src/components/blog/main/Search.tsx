"use client";

import { memo } from "react";

import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@ui/input";

interface SearchProps {
  searchQuery: string;
  setSearchQueryAction: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (overrideSearchQuery?: string) => void;
  setDrawerOpen?: (open: boolean) => void; // Optional for mobile drawer
}

/**
 * Search component provides a search input for filtering blog posts.
 */
export const Search = memo(function Search({
  searchQuery,
  setSearchQueryAction: setSearchQuery,
  onSearch,
  setDrawerOpen, // Optional for mobile drawer
}: SearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
      // close drawer on mobile by waiting the results to refresh first
      setTimeout(() => {
        setDrawerOpen?.(false);
      }, 300);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="group relative">
      <IconSearch
        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-slate-400 transition-colors duration-200 group-focus-within:text-cyan-400 group-hover:text-cyan-400"
        size={18}
      />
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-slate-750 bg-slate-830 focus:!ring-cyan-570 w-full rounded-lg pr-10 pl-10 text-slate-200 transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 focus:shadow-lg focus:!ring-2 focus:!outline-none"
        aria-label="Search posts"
      />
      {searchQuery && (
        <button
          onClick={() => {
            handleClear();
            if (onSearch) {
              onSearch("");
            }
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-slate-400 transition-colors duration-200 hover:text-slate-200 focus:outline-none"
          aria-label="Clear search"
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  );
});

Search.displayName = "Search";
