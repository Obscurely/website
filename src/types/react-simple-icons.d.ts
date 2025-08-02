declare module "@icons-pack/react-simple-icons/icons/*.mjs" {
  import { ComponentType, SVGProps } from "react";

  interface SimpleIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    name?: string;
    title?: string;
  }

  const Icon: ComponentType<SimpleIconProps>;
  export default Icon;
}
