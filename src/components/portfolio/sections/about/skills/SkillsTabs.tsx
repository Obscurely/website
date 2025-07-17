"use client";

import { Tabs, TabsContent } from "@ui/tabs";
import { memo } from "react";
import { DesktopTabsList, MobileTabsList } from "./SkillsTabsList";
import { tabCategories, useSkillsTabs } from "@hooks/portfolio/useSkillsTabs";
import { CategorySkills } from "./CategorySkills";

/**
 * SkillsTabs component that displays skill categories and their respective skills.
 * It calculates the height of the tabs dynamically based on the content.
 */
export const SkillsTabs = memo(function SkillsTabs() {
  const { containerRef, defaultValue, contentHeight } = useSkillsTabs();

  return (
    <div ref={containerRef}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <DesktopTabsList />
        <MobileTabsList />

        <div
          style={{
            height: contentHeight || "66px",
            minHeight: "66px",
            transition: "height 0.3s ease-in-out",
          }}
        >
          {tabCategories.map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="animate-in fade-in slide-in-from-bottom-2 absolute mt-0 w-11/12 transition-all duration-300 ease-in-out"
            >
              <CategorySkills category={category} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
});

SkillsTabs.displayName = "SkillsTabs";
