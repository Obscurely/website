import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
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
    name: "Reddit",
    icon: IconBrandReddit,
    href: SITE_CONFIG.social.reddit,
  },
];
