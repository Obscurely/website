import { ComponentType } from "react";

import {
  IconCloud as Cloud,
  IconCode as Code,
  IconRocket as Rocket,
  IconSettings as Settings,
} from "@tabler/icons-react";

// Create a component that has the icons as properties
const ServicesIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconCode: typeof Code;
  IconCloud: typeof Cloud;
  IconRocket: typeof Rocket;
  IconSettings: typeof Settings;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconCode: Code,
      IconCloud: Cloud,
      IconRocket: Rocket,
      IconSettings: Settings,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon {...props} /> : null;
  },
  {
    IconCode: Code,
    IconCloud: Cloud,
    IconRocket: Rocket,
    IconSettings: Settings,
  }
);

export default ServicesIcons;
