import { ComponentType } from "react";

import {
  IconApps as Apps,
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
  IconDeviceDesktop as DeviceDesktop,
  IconStar as Star,
  IconTools as Tools,
  IconWorld as World,
} from "@tabler/icons-react";

// Create a component that has the icons as properties
const ProjectsIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconApps: typeof Apps;
  IconDeviceDesktop: typeof DeviceDesktop;
  IconStar: typeof Star;
  IconTools: typeof Tools;
  IconWorld: typeof World;
  IconChevronLeft: typeof ChevronLeft;
  IconChevronRight: typeof ChevronRight;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconApps: Apps,
      IconDeviceDesktop: DeviceDesktop,
      IconStar: Star,
      IconTools: Tools,
      IconWorld: World,
      IconChevronLeft: ChevronLeft,
      IconChevronRight: ChevronRight,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon {...props} /> : null;
  },
  {
    IconApps: Apps,
    IconDeviceDesktop: DeviceDesktop,
    IconStar: Star,
    IconTools: Tools,
    IconWorld: World,
    IconChevronLeft: ChevronLeft,
    IconChevronRight: ChevronRight,
  }
);

export default ProjectsIcons;
