import { memo } from "react";
import { categoriesDisplay } from "@data/portfolio/projects";

interface ProjectsFilterProps {
  filterCategories: string[];
  activeCategory: string;
  handleCategoryChangeAction: (category: string) => void;
}

/**
 * ProjectsFilter component that displays a filter for project categories.
 *
 * @param filterCategories - An array of category names to filter projects.
 * @param activeCategory - The currently selected category.
 * @param handleCategoryChangeAction - Function to handle category change.
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const ProjectsFilter = memo(
  ({
    filterCategories,
    activeCategory,
    handleCategoryChangeAction: onCategoryChange,
  }: ProjectsFilterProps) => {
    return (
      <div
        className="data-[state=once]:animate-in fade-in slide-in-from-bottom-50 mb-12 flex flex-wrap justify-center gap-3 opacity-0 duration-500 ease-out will-change-transform data-[state=once]:opacity-100"
        data-state="once"
      >
        <div className="border-slate-730 bg-slate-830 flex flex-wrap justify-center gap-2 rounded-xl border p-1.5 shadow-lg">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
                activeCategory === category ? "text-white" : "text-slate-300"
              } transition-all duration-200 hover:text-white`}
            >
              <span className="flex items-center justify-center">
                {categoriesDisplay[category] || category}
              </span>
              {activeCategory === category && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ProjectsFilter.displayName = "ProjectsFilter";
