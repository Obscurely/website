import { ComponentType } from "react";

import {
  SiMui as Mui,
  SiShadcnui as Shadcnui,
} from "@icons-pack/react-simple-icons";
import {
  IconBrandFramerMotion as BrandFramerMotion,
  IconBrandTailwind as BrandTailwind,
  IconDeviceDesktop as DeviceDesktop,
  IconWorldWww as WorldWww,
} from "@tabler/icons-react";

// Create a component that has the frontend icons as properties
const FrontendIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconBrandFramerMotion: typeof BrandFramerMotion;
  IconBrandTailwind: typeof BrandTailwind;
  IconDeviceDesktop: typeof DeviceDesktop;
  IconWorldWww: typeof WorldWww;
  SiMui: typeof Mui;
  SiShadcnui: typeof Shadcnui;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconBrandFramerMotion: BrandFramerMotion,
      IconBrandTailwind: BrandTailwind,
      IconDeviceDesktop: DeviceDesktop,
      IconWorldWww: WorldWww,
      SiMui: Mui,
      SiShadcnui: Shadcnui,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon name={icon} {...props} /> : null;
  },
  {
    IconBrandFramerMotion: BrandFramerMotion,
    IconBrandTailwind: BrandTailwind,
    IconDeviceDesktop: DeviceDesktop,
    IconWorldWww: WorldWww,
    SiMui: Mui,
    SiShadcnui: Shadcnui,
  }
);

export default FrontendIcons;
