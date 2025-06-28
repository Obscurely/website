"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconBrandX, IconRss } from "@tabler/icons-react";
import { Button } from "@ui/button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Portfolio", href: "/" },
  { name: "Contact", href: "/#contact" },
];

/**
 * Navbar component that displays the navigation bar at the top of the page.
 */
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 py-2 shadow-md backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/#home" className="text-2xl font-bold text-slate-100">
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <Link
                href={item.href}
                className="group relative text-sm text-slate-300 transition-colors hover:text-white lg:text-base"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-1 text-sm text-slate-300 transition-colors hover:text-white lg:text-base"
            >
              <IconRss size={16} className="" />
              <span className="text-sm text-slate-300 transition-colors hover:text-white lg:text-base">
                RSS Feed
              </span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 transition-all group-hover:w-full" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-white hover:from-cyan-600 hover:to-blue-600">
              Resume
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 text-slate-200"
          >
            {mobileMenuOpen ? (
              <IconBrandX size={24} />
            ) : (
              <IconMenu2 size={24} />
            )}
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
            transition={{ duration: 0.3 }}
            className="border-t border-slate-800 bg-slate-900 md:hidden"
          >
            <div className="container mx-auto flex flex-col space-y-4 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 text-slate-300 transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-slate-300 transition-colors hover:text-white"
              >
                <IconRss size={16} />
                RSS Feed
              </a>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600">
                Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
