"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconDownload, IconX, IconRss } from "@tabler/icons-react";
import { Button } from "@ui/button";

const navItemsPortfolio = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

const navItemsBlog = [
  { name: "Home", href: "/blog" },
  { name: "Portfolio", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
  { name: "RSS", href: "/blog/rss.xml" },
];

const HEADER_HEIGHT = 50;

interface NavbarProps {
  isBlog?: boolean;
}
/**
 * Navbar component that displays the navigation bar at the top of the page.
 */
export const Navbar = ({ isBlog }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = isBlog ? navItemsBlog : navItemsPortfolio;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClickDesktop = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClickMobile = (href: string) => {
    setMobileMenuOpen(false);

    // Add a small delay to ensure mobile menu closes first
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Calculate offset for fixed header
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - HEADER_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 py-2 shadow-md backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="#home" className="text-2xl font-bold text-slate-100">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="sm:text-1xl truncate bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-xl font-extrabold text-transparent md:text-2xl">
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
              {item.name !== "RSS" && isBlog !== true ? (
                <button
                  onClick={() => handleNavClickDesktop(item.href)}
                  className={`group relative cursor-pointer px-0 text-base font-medium transition-all duration-300 lg:px-1 ${
                    activeSection === item.href.substring(1)
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Bottom border */}
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                </button>
              ) : item.name !== "RSS" && isBlog === true ? (
                <a
                  href={item.href}
                  key={item.name}
                  rel="noopener noreferrer"
                  className="group relative flex items-center px-0 text-base font-medium text-slate-300 transition-all duration-300 hover:text-white lg:px-1"
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Bottom border */}
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                </a>
              ) : (
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-1 px-0 text-base font-medium text-slate-300 transition-all duration-300 hover:text-white lg:px-1"
                >
                  <IconRss size={16} className="" />
                  <span className="relative z-10">RSS</span>

                  {/* Bottom border */}
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                </a>
              )}
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
              className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20"
              onClick={(e) => {
                e.preventDefault();
                window.open("/resume.pdf", "_blank");
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <IconDownload className="h-4 w-4 transition-transform duration-300" />
                Resume
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 cursor-pointer text-slate-200 backdrop-blur-none hover:bg-transparent hover:backdrop-blur-none"
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
            className="overflow-hidden border-t border-slate-700/50 bg-slate-900/95 md:hidden"
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
                    {item.name !== "RSS" && isBlog !== true ? (
                      <button
                        onClick={() => handleNavClickMobile(item.href)}
                        className={`w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                          activeSection === item.href.substring(1)
                            ? "text-cyan-400"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </button>
                    ) : item.name !== "RSS" && isBlog === true ? (
                      <a
                        href={item.href}
                        className="block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        href="/rss.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-left text-base font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IconRss size={16} />
                        RSS
                      </a>
                    )}
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
                    className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-cyan-500/20"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("/resume.pdf", "_blank");
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium backface-hidden">
                      <IconDownload className="h-4 w-4 transition-transform duration-300" />
                      Resume
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
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
