"use client";

import { IconMenu2, IconDownload, IconX } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { MobileNavItem } from "./MobileNavItem";
import { motion } from "framer-motion";
import { useNavbarMobile } from "@hooks/common/useNavbarMobile";
import { useNavbar } from "@hooks/common/useNavbar";

interface MobileNavbarProps {
  isBlog: boolean;
  isMain: boolean;
}

export const MobileNavbar = ({ isBlog, isMain }: MobileNavbarProps) => {
  const { activeSection, navItems, useAnchorLinks } = useNavbar(isBlog, isMain);

  const {
    mobileMenuOpen,
    handleMobileNavClick,
    toggleMobileMenu,
    closeMobileMenu,
    handleResumeClick,
  } = useNavbarMobile();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="ml-2 cursor-pointer text-slate-200 hover:bg-transparent"
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-slate-750 bg-slate-980 animate-in fade-in absolute top-full right-0 left-0 overflow-hidden border-t duration-300 ease-in-out md:hidden">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  isBlog={isBlog}
                  activeSection={activeSection}
                  useAnchorLinks={useAnchorLinks}
                  onNavClickAction={handleMobileNavClick}
                  onMenuCloseAction={closeMobileMenu}
                />
              ))}

              <div className="pt-4 will-change-transform">
                <Button
                  className="group relative w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 hover:shadow-md"
                  onClick={handleResumeClick}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                    <IconDownload className="h-4 w-4 transition-transform duration-300" />
                    Resume
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
