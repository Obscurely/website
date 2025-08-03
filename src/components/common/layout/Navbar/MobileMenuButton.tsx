"use client";

import dynamic from "next/dynamic";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@ui/button";

interface MobileNavbarProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

// Fallback component without animations
const MobileMenuButtonFallback = ({
  mobileMenuOpen,
  toggleMobileMenu,
}: MobileNavbarProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMobileMenu}
      className="ml-2 cursor-pointer text-slate-200 hover:bg-transparent"
      aria-label="Toggle mobile menu"
    >
      {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
    </Button>
  );
};

// Lazy load the animated component with fallback
export const MobileMenuButton = dynamic(
  () =>
    import("./MobileMenuButtonAnimated").then((mod) => ({
      default: mod.MobileMenuButtonAnimated,
    })),
  {
    loading: (props) => (
      <MobileMenuButtonFallback {...(props as MobileNavbarProps)} />
    ),
    ssr: false,
  }
);
