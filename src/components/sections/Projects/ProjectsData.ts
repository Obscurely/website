import { projects, categories } from "@data/projects";

// Convert projects to array and sort featured first
export const projectsArray = Object.values(projects).sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
);

// Add "All" and "Featured" to the categories for filtering
export const filterCategories = ["All", "Featured", ...categories];
