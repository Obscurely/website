import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
} from "@tabler/icons-react";

import { SITE_CONFIG } from "./site";

interface Social {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href: string;
}

export const socials: Social[] = [
  { icon: IconBrandGithub, href: SITE_CONFIG.social.github },
  {
    icon: IconBrandLinkedin,
    href: SITE_CONFIG.social.linkedIn,
  },
  {
    icon: IconBrandReddit,
    href: SITE_CONFIG.social.reddit,
  },
];
