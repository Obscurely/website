"use client";

import { typeAnimation } from "@data/portfolio/hero";
import { TypeAnimation } from "react-type-animation";

export const AnimatedRole = () => {
  return (
    <TypeAnimation
      sequence={typeAnimation}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="bg-blue-400 bg-clip-text text-transparent"
      style={{
        display: "inline-block",
        minHeight: "1em",
        whiteSpace: "nowrap",
      }}
    />
  );
};
