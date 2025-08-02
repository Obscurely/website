import { ComponentType } from "react";

import { IconMail as Mail, IconMapPin2 as MapPin2 } from "@tabler/icons-react";

// Create a component that has the icons as properties
const ContactIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconMail: typeof Mail;
  IconMapPin2: typeof MapPin2;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconMail: Mail,
      IconMapPin2: MapPin2,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon {...props} /> : null;
  },
  {
    IconMail: Mail,
    IconMapPin2: MapPin2,
  }
);

export default ContactIcons;
