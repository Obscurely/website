import { ComponentType } from "react";

import {
  IconArrowUp as ArrowUp,
  IconForms as Forms,
  IconMail as Mail,
  IconMapPin as MapPin,
} from "@tabler/icons-react";

// Create a component that has the icons as properties
const FooterIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconForms: typeof Forms;
  IconMail: typeof Mail;
  IconMapPin: typeof MapPin;
  IconArrowUp: typeof ArrowUp;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconForms: Forms,
      IconMail: Mail,
      IconMapPin: MapPin,
      IconArrowUp: ArrowUp,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon {...props} /> : null;
  },
  {
    IconForms: Forms,
    IconMail: Mail,
    IconMapPin: MapPin,
    IconArrowUp: ArrowUp,
  }
);

export default FooterIcons;
