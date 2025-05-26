"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
}

export function BlogFilterSidebar({
  searchQuery,
  setSearchQueryAction: setSearchQuery,
  tags,
  selectedTag,
  setSelectedTagAction: setSelectedTag,
  years,
}: BlogFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const yearParam = searchParams.get("year");
    const searchParam = searchParams.get("search");
    const featuredParam = searchParams.get("featured");

    if (tagParam) setSelectedTag(tagParam);
    if (yearParam) setSelectedYear(yearParam);
    if (searchParam) setSearchQuery(searchParam);
    if (featuredParam === "true") setIsFeatured(true);
  }, [searchParams, setSearchQuery, setSelectedTag]);

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedTag) params.set("tag", selectedTag);
    if (selectedYear) params.set("year", selectedYear);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (isFeatured) params.set("featured", "true");

    router.push(`/blog?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSelectedYear(null);
    setIsFeatured(false);
    router.push("/blog");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col overflow-y-auto pb-8"
    >
      {/* Search */}
      <div className="mb-6">
        <BlogSearch
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
          isInView
          onSearch={applyFilters}
        />
      </div>

      {/* Filters Accordion */}
      <Accordion
        type="multiple"
        defaultValue={["tags", "years"]}
        className="mb-6"
      >
        {/* Tags Filter */}
        <AccordionItem value="tags" className="border-slate-700/50">
          <AccordionTrigger className="text-white hover:text-cyan-400">
            <div className="flex items-center">
              <IconTag className="mr-2 h-5 w-5" />
              Tags
            </div>
          </AccordionTrigger>
          <AccordionContent>
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
          <AccordionTrigger className="text-white hover:text-cyan-400">
            <div className="flex items-center">
              <IconCalendar className="mr-2 h-5 w-5" />
              Years
            </div>
          </AccordionTrigger>
          <AccordionContent>
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
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
          />
          <label htmlFor="featured" className="ml-2 text-slate-300">
            Featured posts only
          </label>
        </div>
      </Accordion>

      {/* Filter Actions */}
      <div className="flex gap-3">
        <Button
          onClick={applyFilters}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <IconFilter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex-1 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50"
        >
          Clear All
        </Button>
      </div>
    </motion.div>
  );
}
