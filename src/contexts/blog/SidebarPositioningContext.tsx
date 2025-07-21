"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSidebarPositioning } from "@hooks/blog/useSidebarPositioning";
import { usePostPage } from "@hooks/blog/usePostPage";

type SidebarState = "initial" | "fixed" | "bottom";

interface SidebarPositioningContextType {
  sidebarState: SidebarState;
  sidebarWidth: number;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  initialWidth: number | null;
  isMobile: boolean;
}

const SidebarPositioningContext = createContext<
  SidebarPositioningContextType | undefined
>(undefined);

interface SidebarPositioningProviderProps {
  children: ReactNode;
}

export function SidebarPositioningProvider({
  children,
}: SidebarPositioningProviderProps) {
  const { sidebarState, sidebarWidth, sidebarRef, footerRef } =
    useSidebarPositioning();
  const { initialWidth, isMobile } = usePostPage(sidebarWidth);

  const value = {
    sidebarState,
    sidebarWidth,
    sidebarRef,
    footerRef,
    initialWidth,
    isMobile,
  };

  return (
    <SidebarPositioningContext.Provider value={value}>
      {children}
    </SidebarPositioningContext.Provider>
  );
}

export function useSidebarPositioningContext() {
  const context = useContext(SidebarPositioningContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarPositioningContext must be used within a SidebarPositioningProvider"
    );
  }
  return context;
}
