"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconDownload, IconX } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { DesktopNavItem } from "./DesktopNavItem";
import { MobileNavItem } from "./MobileNavItem";
import { useNavbar } from "@hooks/common/useNavbar";

interface NavbarProps {
  isBlog?: boolean;
  isMain?: boolean;
}

export const Navbar = ({ isBlog = false, isMain = false }: NavbarProps) => {
  const {
    isScrolled,
    mobileMenuOpen,
    activeSection,
    navItems,
    useAnchorLinks,
    handleNavClick,
    handleMobileNavClick,
    toggleMobileMenu,
    closeMobileMenu,
    handleResumeClick,
  } = useNavbar(isBlog, isMain);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-slate-980 py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="text-2xl font-bold text-slate-100">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="sm:text-1xl truncate bg-blue-400 bg-clip-text text-xl font-extrabold text-transparent md:text-2xl">
              Adrian Crîșmaruc
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex lg:gap-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
            >
              <DesktopNavItem
                item={item}
                isBlog={isBlog}
                activeSection={activeSection}
                useAnchorLinks={useAnchorLinks}
                onNavClickAction={handleNavClick}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: navItems.length * 0.1 + 0.1,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="ml-0 lg:ml-1"
          >
            <Button
              className="group relative w-full cursor-pointer overflow-hidden px-4 py-3 text-white transition-all duration-300 group-hover:translate-0 group-hover:scale-100 hover:translate-y-0 hover:scale-100"
              onClick={handleResumeClick}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconDownload className="h-4 w-4 transition-transform duration-300" />
                Resume
              </span>
            </Button>
          </motion.div>
        </nav>

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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-slate-750 bg-slate-980 overflow-hidden border-t md:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <MobileNavItem
                      item={item}
                      isBlog={isBlog}
                      activeSection={activeSection}
                      useAnchorLinks={useAnchorLinks}
                      onNavClickAction={handleMobileNavClick}
                      onMenuCloseAction={closeMobileMenu}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.1 + 0.1,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="pt-4"
                >
                  <Button
                    className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 group-hover:translate-0 group-hover:scale-100 hover:translate-y-0 hover:scale-100 hover:shadow-md hover:shadow-cyan-500/20"
                    onClick={handleResumeClick}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                      <IconDownload className="h-4 w-4 transition-transform duration-300" />
                      Resume
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
