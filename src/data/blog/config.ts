export const SCROLL_CONFIG = {
  SIDEBAR_ACTIVATION_THRESHOLD: 100,
  BACK_TO_TOP_THRESHOLD: 400,
  FOOTER_OFFSET_RATIO: 0.25,
  THROTTLE_DELAY: 16, // ~60fps
  SIDEBAR_TOP_OFFSET: 120, // Distance from top when fixed (30 * 4 = 120px in Tailwind)
  FOOTER_MARGIN: 40, // Margin from footer
} as const;
