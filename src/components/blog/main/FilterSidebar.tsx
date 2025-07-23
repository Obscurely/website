"use client";

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
import { useFilterContext } from "@contexts/blog/FilterContext";

interface FilterSidebarProps {
  isMobile?: boolean; // Optional prop for mobile drawer
  tags: string[];
  years: string[];
}

/**
 * FilterSidebar component provides a sidebar for filtering blog posts by search query, tags, years, and featured status.
 */
export function FilterSidebar({ isMobile, tags, years }: FilterSidebarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedYear,
    setSelectedYear,
    isFeatured,
    setIsFeatured,
    setDrawerOpen,
    applyFilters,
    clearFilters,
  } = useFilterContext();

  return (
    <div className="flex h-full flex-col">
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
            <AccordionItem value="tags" className="border-slate-750">
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
                      className={`hover:bg-slate-750 cursor-pointer border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:shadow-sm ${
                        selectedTag === tag
                          ? "border-cyan-590 from-slate-870 to-slate-770 bg-gradient-to-r text-white shadow-sm"
                          : isMobile
                            ? "border-slate-750 bg-slate-720 hover:border-cyan-590 text-slate-300"
                            : "border-slate-750 bg-slate-840 hover:border-cyan-590 text-slate-300"
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
            <AccordionItem value="years" className="border-slate-750">
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
                      className={`hover:bg-slate-750 cursor-pointer border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:shadow-sm ${
                        selectedYear === year
                          ? "border-cyan-590 from-slate-870 to-slate-770 bg-gradient-to-r text-white shadow-sm"
                          : isMobile
                            ? "border-slate-750 bg-slate-720 hover:border-cyan-590 text-slate-300"
                            : "border-slate-750 bg-slate-840 hover:border-cyan-590 text-slate-300"
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
          className="group relative flex-1 cursor-pointer px-6 py-3 text-white transition-all duration-300 group-hover:translate-0 group-hover:scale-100 hover:translate-y-0 hover:scale-100 hover:shadow-md"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
            <IconFilter className="h-4 w-4" />
            Apply
          </span>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            clearFilters();
            setDrawerOpen?.(false); // Close drawer if it exists
          }}
          className="group-hover-translate-0 hover:border-cyan-590 hover:bg-slate-850 flex-1 cursor-pointer rounded-lg border-slate-700 px-6 py-3 text-slate-300 transition-all duration-300 group-hover:scale-100 hover:translate-y-0 hover:scale-100 hover:text-white hover:shadow-md hover:shadow-cyan-500/10"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
