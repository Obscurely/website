import { skills } from "@data/portfolio/skills/skills";
import { SkillCategory } from "@data/portfolio/skills/types";

// Constants for height calculation
const BADGE_HEIGHT = 28; // Height of a skill badge in pixels
const BADGE_MARGIN = 6; // Margin between badges (gap-1.5 = 0.375rem = ~6px)
const CHARS_PER_BADGE_WIDTH = 8; // Approximate characters per badge width unit
const BASE_PADDING = 4; // Base padding in pixels
export const MIN_HEIGHT = 60; // Minimum height in pixels

/**
 * Calculate the height of a skill category based on the number of skills
 */
export const calculateContentHeight = (
  containerWidth: number,
  category: SkillCategory
) => {
  const categorySkills = skills[category];
  if (!categorySkills || categorySkills.length === 0) return MIN_HEIGHT;

  // Calculate average characters per skill
  const totalChars = categorySkills.reduce(
    (sum, skill) =>
      sum +
      (typeof skill.name === "string"
        ? skill.name.length
        : String(skill.id).length || 5),
    0
  );
  const avgCharsPerSkill = totalChars / categorySkills.length;

  // Estimate badge width based on character count
  const avgBadgeWidth = Math.max(avgCharsPerSkill * CHARS_PER_BADGE_WIDTH, 80);

  // Estimate badges per row based on container width
  const badgesPerRow = Math.floor(
    (containerWidth - BASE_PADDING) / (avgBadgeWidth + BADGE_MARGIN)
  );

  // Calculate rows needed
  const rows = Math.ceil(categorySkills.length / Math.max(badgesPerRow, 1));

  // Calculate height
  return Math.max(
    rows * (BADGE_HEIGHT + BADGE_MARGIN) - BADGE_MARGIN + BASE_PADDING,
    MIN_HEIGHT
  );
};
