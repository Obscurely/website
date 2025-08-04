"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface MobileNavbarProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const MobileMenuButtonAnimated = ({
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
      <LazyMotion features={domAnimation} strict>
        <m.div
          animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </m.div>
      </LazyMotion>
    </Button>
  );
};
