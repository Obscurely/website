"use client";

import { useSidebarPositioningContext } from "@contexts/blog/SidebarPositioningContext";

export const Footer = () => {
  const { footerRef } = useSidebarPositioningContext();

  return <div ref={footerRef} className="absolute bottom-0 h-0 w-full" />;
};
