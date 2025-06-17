"use client";

import { motion } from "framer-motion";
import { IconFilter, IconCalendar, IconTag } from "@tabler/icons-react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { Search } from "./Search";
import { Checkbox } from "@ui/checkbox";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQueryAction: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  selectedTag: string | null;
  setSelectedTagAction: React.Dispatch<React.SetStateAction<string | null>>;
  years: string[];
  selectedYear: string | null;
  setSelectedYearAction: React.Dispatch<React.SetStateAction<string | null>>;
  isFeatured: boolean;
  setIsFeaturedAction: React.Dispatch<React.SetStateAction<boolean>>;
  applyFiltersAction: () => void;
  clearFiltersAction: () => void;
  setDrawerOpenAction: (open: boolean) => void; // Optional for mobile drawer
}

/**
 * FilterSidebar component provides a sidebar for filtering blog posts by search query, tags, years, and featured status.
 */
export function FilterSidebar({
  searchQuery,
  setSearchQueryAction: setSearchQuery,
  tags,
  selectedTag,
  setSelectedTagAction: setSelectedTag,
  years,
  selectedYear,
  setSelectedYearAction: setSelectedYear,
  isFeatured,
  setIsFeaturedAction: setIsFeatured,
  applyFiltersAction: applyFilters,
  clearFiltersAction: clearFilters,
  setDrawerOpenAction: setDrawerOpen, // Optional for mobile drawer
}: FilterSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col"
    >
      {/* Search */}
      <div className="mb-3">
        <Search
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
          onSearch={applyFilters}
          setDrawerOpen={setDrawerOpen} // Pass setDrawerOpen for mobile
        />
      </div>

      {/* filters container */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {/* Filters Accordion */}
        <div>
          <Accordion
            type="multiple"
            defaultValue={["tags", "years"]}
            className="mb-6"
          >
            {/* Tags Filter */}
            <AccordionItem value="tags" className="border-slate-700/50">
              <AccordionTrigger className="cursor-pointer text-white hover:text-cyan-400">
                <div className="flex items-center">
                  <IconTag className="mr-2 h-5 w-5" />
                  Tags
                </div>
              </AccordionTrigger>
              <AccordionContent className="overflow-visible">
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm ${
                        selectedTag === tag
                          ? "border-cyan-500/50 bg-gradient-to-r from-slate-800/70 to-slate-700/70 text-white shadow-sm"
                          : "border-slate-700/50 bg-slate-800/30 text-slate-300 hover:border-cyan-500/50"
                      }`}
                      onClick={() =>
                        setSelectedTag(tag === selectedTag ? null : tag)
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Years Filter */}
            <AccordionItem value="years" className="border-slate-700/50">
              <AccordionTrigger className="cursor-pointer text-white hover:text-cyan-400">
                <div className="flex items-center">
                  <IconCalendar className="mr-2 h-5 w-5" />
                  Years
                </div>
              </AccordionTrigger>
              <AccordionContent className="overflow-visible">
                <div className="flex flex-wrap gap-2 pt-2">
                  {years.map((year) => (
                    <Badge
                      key={year}
                      variant="outline"
                      className={`cursor-pointer border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-slate-700/50 hover:shadow-sm ${
                        selectedYear === year
                          ? "border-cyan-500/50 bg-gradient-to-r from-slate-800/70 to-slate-700/70 text-white shadow-sm"
                          : "border-slate-700/50 bg-slate-800/30 text-slate-300 hover:border-cyan-500/50"
                      }`}
                      onClick={() =>
                        setSelectedYear(year === selectedYear ? null : year)
                      }
                    >
                      {year}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Featured Filter */}
            <div className="mt-4 flex items-center space-x-2 px-0 pt-0 pb-1">
              <Checkbox
                id="featured"
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(!!checked)}
                className="border-slate-700 group-hover:translate-0 group-hover:scale-100 hover:translate-0 hover:scale-100 hover:shadow-md data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:group-hover:translate-0 data-[state=checked]:group-hover:scale-100 data-[state=checked]:hover:translate-0 data-[state=checked]:hover:scale-100 data-[state=checked]:hover:shadow-md"
              />
              <label
                htmlFor="featured"
                className="text-md cursor-pointer leading-none font-medium text-slate-300 select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured posts only
              </label>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => {
            applyFilters();
            setDrawerOpen?.(false); // Close drawer if it exists
          }}
          className="group relative flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-white transition-all duration-300 group-hover:translate-0 group-hover:scale-100 hover:translate-y-0 hover:scale-100 hover:shadow-md hover:shadow-cyan-500/20"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
            <IconFilter className="h-4 w-4" />
            Apply
          </span>
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0"></span>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            clearFilters();
            setDrawerOpen?.(false); // Close drawer if it exists
          }}
          className="group-hover-translate-0 flex-1 cursor-pointer rounded-lg border-slate-700 px-6 py-3 text-slate-300 transition-all duration-300 group-hover:scale-100 hover:translate-y-0 hover:scale-100 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-cyan-500/10"
        >
          Clear All
        </Button>
      </div>
    </motion.div>
  );
}
