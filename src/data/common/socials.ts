import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandUpwork,
} from "@tabler/icons-react";

import { SITE_CONFIG } from "./site";

interface Social {
  name: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href: string;
}

export const socials: Social[] = [
  { name: "GitHub", icon: IconBrandGithub, href: SITE_CONFIG.social.github },
  {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    href: SITE_CONFIG.social.linkedIn,
  },
  {
    name: "Upwork",
    icon: IconBrandUpwork,
    href: SITE_CONFIG.social.upwork,
  },
  {
    name: "Reddit",
    icon: IconBrandReddit,
    href: SITE_CONFIG.social.reddit,
  },
];
