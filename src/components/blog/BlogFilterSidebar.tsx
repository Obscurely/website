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
import { BlogSearch } from "./BlogSearch";

interface BlogFilterSidebarProps {
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

export function BlogFilterSidebar({
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
}: BlogFilterSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col pb-8"
    >
      {/* Search */}
      <div className="mb-3">
        <BlogSearch
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
          isInView
          onSearch={applyFilters}
          setDrawerOpen={setDrawerOpen} // Pass setDrawerOpen for mobile
        />
      </div>

      {/* filters container */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
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
              <AccordionContent className="overflow-hidden">
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer border-slate-700/50 px-3 py-1 text-sm transition-all hover:border-cyan-500/50 ${
                        selectedTag === tag
                          ? "border-cyan-500/50 bg-slate-800/70 text-cyan-400"
                          : "bg-slate-800/30 text-slate-300"
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
              <AccordionContent className="overflow-hidden">
                <div className="flex flex-wrap gap-2 pt-2">
                  {years.map((year) => (
                    <Badge
                      key={year}
                      variant="outline"
                      className={`cursor-pointer border-slate-700/50 px-3 py-1 text-sm transition-all hover:border-cyan-500/50 ${
                        selectedYear === year
                          ? "border-cyan-500/50 bg-slate-800/70 text-cyan-400"
                          : "bg-slate-800/30 text-slate-300"
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
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
                className="h-4 w-4 cursor-pointer rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
              />
              <label
                htmlFor="featured"
                className="ml-2 cursor-pointer text-slate-300 select-none"
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
          className="group relative flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
            <IconFilter className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Apply
          </span>
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            clearFilters();
            setDrawerOpen?.(false); // Close drawer if it exists
          }}
          className="flex-1 cursor-pointer rounded-lg border-slate-700 px-6 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
        >
          Clear All
        </Button>
      </div>
    </motion.div>
  );
}
