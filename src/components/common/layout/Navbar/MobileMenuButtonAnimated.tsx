"use client";

import { animated, useSpring } from "@react-spring/web";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@ui/button";

interface MobileNavbarProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const MobileMenuButtonAnimated = ({
  mobileMenuOpen,
  toggleMobileMenu,
}: MobileNavbarProps) => {
  const iconSpring = useSpring({
    transform: `rotate(${mobileMenuOpen ? 90 : 0}deg)`,
    config: { duration: 300 },
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMobileMenu}
      className="ml-2 cursor-pointer text-slate-200 hover:bg-transparent"
      aria-label="Toggle mobile menu"
    >
      <animated.div style={iconSpring}>
        {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </animated.div>
    </Button>
  );
};
