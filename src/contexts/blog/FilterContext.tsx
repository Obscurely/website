"use client";

import { ReactNode, createContext, useContext } from "react";

import { useFilter } from "@hooks/blog/useFilter";

interface CurrentFilters {
  search?: string;
  tag?: string;
  year?: string;
  featured?: string;
}

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
  selectedYear: string | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<string | null>>;
  isFeatured: boolean;
  setIsFeatured: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilters: (overrideSearchQuery?: string) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  currentFilters: CurrentFilters;
}

export function FilterProvider({
  children,
  currentFilters,
}: FilterProviderProps) {
  const filterState = useFilter(currentFilters);

  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
