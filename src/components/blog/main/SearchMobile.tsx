import { Button } from "@components/common/ui/button";
import { Input } from "@components/common/ui/input";
import { IconSearch, IconX, IconFilter } from "@tabler/icons-react";

interface SearchMobileProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  applyFilters: (overrideSearchQuery?: string) => void;
  handleClear: () => void;
  setDrawerOpen: (open: boolean) => void;
}

/**
 * SearchMobile component provides a search input and filter button for mobile view.
 */
export const SearchMobile = ({
  searchQuery,
  setSearchQuery,
  applyFilters,
  handleClear,
  setDrawerOpen,
}: SearchMobileProps) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
      <div className="group relative flex-1">
        <IconSearch
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-slate-400 transition-colors duration-200 group-focus-within:text-cyan-400 group-hover:text-cyan-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyFilters();
            }
          }}
          className="w-full rounded-lg border-slate-700/50 bg-slate-800/30 py-3 pr-10 pl-10 text-slate-200 transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600/70 hover:bg-slate-800/50 focus:bg-slate-800/60 focus:shadow-lg focus:!ring-2 focus:!ring-cyan-500/30 focus:!outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => {
              handleClear();
              applyFilters("");
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-slate-400 transition-colors duration-200 hover:text-slate-200 focus:outline-none"
            aria-label="Clear search"
          >
            <IconX size={18} />
          </button>
        )}
      </div>
      <Button
        onClick={() => setDrawerOpen(true)}
        className="group relative shrink-0 cursor-pointer rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
          <IconFilter className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          Filters
        </span>
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      </Button>
    </div>
  );
};
