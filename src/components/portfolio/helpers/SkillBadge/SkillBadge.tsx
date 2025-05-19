import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@data/portfolio/skills/types";
import React from "react";
import { IconX } from "@tabler/icons-react";
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  flip,
} from "@floating-ui/react";
import { ProficiencyScale } from "./ProficiencyScale";
import { ProjectItem } from "./ProjectItem";

// Context to track the currently expanded skill
const SkillContext = createContext<{
  expandedSkillId: string | null;
  setExpandedSkillId: (id: string | null) => void;
}>({
  expandedSkillId: null,
  setExpandedSkillId: () => {},
});

/**
 * SkillBadgeProvider component that provides the skill context to its children.
 *
 * @param children - The child components that will have access to the skill context.
 * @returns A context provider that manages the expanded skill state.
 */
export const SkillBadgeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  return (
    <SkillContext.Provider value={{ expandedSkillId, setExpandedSkillId }}>
      {children}
    </SkillContext.Provider>
  );
};

interface SkillBadgeProps {
  skill: Skill;
  colorClass: string;
}

export const SkillBadge = React.memo(function SkillBadge({
  skill,
  colorClass,
}: SkillBadgeProps) {
  const { expandedSkillId, setExpandedSkillId } = useContext(SkillContext);
  const isExpanded = expandedSkillId === skill.id;

  // Making the popup responsive
  const { x, y, strategy, refs, context } = useFloating({
    open: isExpanded,
    onOpenChange: (open) => {
      setExpandedSkillId(open ? skill.id : null);
    },
    middleware: [
      offset({ mainAxis: 8 }),
      shift({ padding: 8 }),
      flip({ padding: 16 }),
    ],
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  // Setup interactions
  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`flex cursor-pointer items-center rounded-full border px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 ${
          isExpanded
            ? "bg-gradient-to-r from-slate-800/70 to-slate-700/70 shadow-sm"
            : "hover:bg-slate-700/50 hover:shadow-sm"
        } ${colorClass}`}
      >
        {skill.name}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={refs.setFloating}
            {...getFloatingProps()}
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[60] w-lg max-w-[95vw] overflow-hidden rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-800/95 to-slate-900/99 p-4 text-slate-200 shadow-xl backdrop-blur-sm"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 9999,
              boxShadow:
                "0 0 15px rgba(0, 0, 0, 0.2), 0 0 3px rgba(14, 165, 233, 0.15)",
            }}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {skill.name}
                </h4>
                <div className="mt-2 text-sm leading-relaxed text-slate-300">
                  {skill.description}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Proficiency Level
                  </h5>
                  <span className="mb-1 text-xs text-slate-500 italic">
                    Hover elements for details
                  </span>
                </div>
                <ProficiencyScale proficiency={skill.proficiency} />
              </div>

              {skill.notableProjects && skill.notableProjects.length > 0 && (
                <div>
                  <h5 className="mb-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
                    Notable Projects
                  </h5>
                  <ul className="flex flex-wrap gap-2">
                    {skill.notableProjects.map((project) => (
                      <ProjectItem key={project.name} project={project} />
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setExpandedSkillId(null)}
              className="absolute top-2 right-2 cursor-pointer rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              aria-label="Close details"
            >
              <IconX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SkillBadge.displayName = "SkillBadge";
