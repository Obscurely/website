import { ComponentType } from "react";

import {
  SiKubernetes as Kubernetes,
  SiLinux as Linux,
} from "@icons-pack/react-simple-icons";
import {
  IconHeartRateMonitor as HeartRateMonitor,
  IconPackage as Package,
  IconServer as Server,
} from "@tabler/icons-react";

// Create a component that has the devops icons as properties
const DevopsIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconHeartRateMonitor: typeof HeartRateMonitor;
  IconPackage: typeof Package;
  IconServer: typeof Server;
  SiKubernetes: typeof Kubernetes;
  SiLinux: typeof Linux;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconHeartRateMonitor: HeartRateMonitor,
      IconPackage: Package,
      IconServer: Server,
      SiKubernetes: Kubernetes,
      SiLinux: Linux,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon name={icon} {...props} /> : null;
  },
  {
    IconHeartRateMonitor: HeartRateMonitor,
    IconPackage: Package,
    IconServer: Server,
    SiKubernetes: Kubernetes,
    SiLinux: Linux,
  }
);

export default DevopsIcons;
