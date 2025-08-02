import { ComponentType } from "react";

import {
  SiKubernetes as Kubernetes,
  SiLinux as Linux,
} from "@icons-pack/react-simple-icons";
import {
  IconBrandAws as BrandAws,
  IconBrandDocker as BrandDocker,
  IconBrandNextjs as BrandNextjs,
  IconBrandPython as BrandPython,
  IconBrandReact as BrandReact,
  IconBrandRust as BrandRust,
  IconBrandTerraform as BrandTerraform,
  IconBrandTypescript as BrandTypescript,
  IconGitMerge as GitMerge,
} from "@tabler/icons-react";

// Create a component that has the backend icons as properties
const BackendIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconBrandAws: typeof BrandAws;
  IconBrandDocker: typeof BrandDocker;
  IconBrandNextjs: typeof BrandNextjs;
  IconBrandPython: typeof BrandPython;
  IconBrandReact: typeof BrandReact;
  IconBrandRust: typeof BrandRust;
  IconBrandTerraform: typeof BrandTerraform;
  IconBrandTypescript: typeof BrandTypescript;
  IconGitMerge: typeof GitMerge;
  SiKubernetes: typeof Kubernetes;
  SiLinux: typeof Linux;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconBrandAws: BrandAws,
      IconBrandDocker: BrandDocker,
      IconBrandNextjs: BrandNextjs,
      IconBrandPython: BrandPython,
      IconBrandReact: BrandReact,
      IconBrandRust: BrandRust,
      IconBrandTerraform: BrandTerraform,
      IconBrandTypescript: BrandTypescript,
      IconGitMerge: GitMerge,
      SiKubernetes: Kubernetes,
      SiLinux: Linux,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon name={icon} {...props} /> : null;
  },
  {
    IconBrandAws: BrandAws,
    IconBrandDocker: BrandDocker,
    IconBrandNextjs: BrandNextjs,
    IconBrandPython: BrandPython,
    IconBrandReact: BrandReact,
    IconBrandRust: BrandRust,
    IconBrandTerraform: BrandTerraform,
    IconBrandTypescript: BrandTypescript,
    IconGitMerge: GitMerge,
    SiKubernetes: Kubernetes,
    SiLinux: Linux,
  }
);

export default BackendIcons;
