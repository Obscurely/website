import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
} from "@tabler/icons-react";

interface Social {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href: string;
}

export const socials: Social[] = [
  { icon: IconBrandGithub, href: "https://github.com/Obscurely" },
  {
    icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/adrian-crismaruc-2a1b832a0/",
  },
  {
    icon: IconBrandReddit,
    href: "https://www.reddit.com/user/CrismarucAdrian/",
  },
];
