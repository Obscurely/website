"use client";

import { useFilterContext } from "@contexts/blog/FilterContext";
import { Dialog, DialogPanel } from "@headlessui/react";

import { FilterSidebar } from "./FilterSidebar";

interface MobileFilterDrawerProps {
  allTags: string[];
  allYears: string[];
}

export const MobileFilterDrawer = ({
  allTags,
  allYears,
}: MobileFilterDrawerProps) => {
  const { drawerOpen, setDrawerOpen } = useFilterContext();

  return (
    <Dialog
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" />
      <DialogPanel
        transition
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto bg-slate-800 px-6 py-8 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
      >
        <FilterSidebar isMobile={true} tags={allTags} years={allYears} />
      </DialogPanel>
    </Dialog>
  );
};
