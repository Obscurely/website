import { ComponentType } from "react";

import {
  IconSettings2 as Settings2,
  IconWorldSearch as WorldSearch,
} from "@tabler/icons-react";

// Create a component that has the business icons as properties
const BusinessIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconSettings2: typeof Settings2;
  IconWorldSearch: typeof WorldSearch;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconSettings2: Settings2,
      IconWorldSearch: WorldSearch,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon {...props} /> : null;
  },
  {
    IconSettings2: Settings2,
    IconWorldSearch: WorldSearch,
  }
);

export default BusinessIcons;
