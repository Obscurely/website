"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "@ui/button";
import { socials } from "@data/common/socials";
import { useFooter } from "@hooks/common/useFooter";
import { NavLink } from "./NavLink";
import { contactInfo } from "@data/common/footer";

interface FooterProps {
  isBlog?: boolean;
  isMain?: boolean;
}

/**
 * Footer
 */
export const Footer = ({ isBlog = false, isMain = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { useAnchorLinks, handleNavClick, scrollToTop, footerSections } =
    useFooter(isBlog, isMain);

  return (
    <footer className="relative z-10 border-t border-slate-900 bg-[#080e22]">
      <div className="relative container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-14 lg:gap-8">
          {/* Brand section */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isBlog || useAnchorLinks ? (
                <Link
                  href="/"
                  className="group mb-6 block text-2xl font-bold text-slate-100"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:to-blue-400">
                    Adrian Crîșmaruc
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => handleNavClick("#home")}
                  className="group mb-6 block cursor-pointer text-2xl font-bold text-slate-100 transition-all duration-300"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent">
                    Adrian Crîșmaruc
                  </span>
                </button>
              )}

              <p className="mb-8 max-w-md leading-relaxed text-slate-400">
                Full-Stack Developer specializing in Rust, Python, React,
                TypeScript, Next.js, Flask and cloud-native technologies.
              </p>

              {/* Social links */}
              <div className="mb-8 flex gap-4">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-slate-820 -mt-0.5 flex h-10 w-10 items-center justify-center rounded-full text-cyan-500 transition-colors duration-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none">
                      <social.icon size={20} strokeWidth={2.5} />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="relative mb-6 text-lg font-semibold text-slate-200">
                    {section.title}
                    <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {NavLink({
                          link,
                          isBlog,
                          useAnchorLinks,
                          handleNavClick,
                        })}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="relative mb-6 text-lg font-semibold text-slate-200">
                Get in Touch
                <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-slate-820 rounded-full p-2 text-cyan-400">
                      <contact.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs font-medium text-slate-300">
                        {contact.label}
                      </span>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-sm break-words text-slate-400 transition-colors duration-300 hover:text-cyan-400"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">
                          {contact.value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-slate-820 mt-16 flex flex-col items-center justify-between border-t pt-8 md:flex-row"
        >
          <div className="mb-4 md:mb-0">
            <p className="text-center text-sm text-slate-400 md:text-left">
              © {currentYear} Adrian Crîșmaruc. All rights reserved.
            </p>
            <p className="mt-1.5 text-center text-xs text-slate-500 md:text-left">
              Built with{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic transition-colors hover:text-cyan-400"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic transition-colors hover:text-cyan-400"
              >
                TypeScript
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic transition-colors hover:text-cyan-400"
              >
                Tailwind CSS
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-slate-500 sm:block">
              Back to top
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="group border-slate-740 bg-slate-820 hover:border-cyan-590 hover:bg-slate-740 relative cursor-pointer rounded-full border text-slate-400 transition-all duration-300 hover:text-cyan-400"
            >
              <IconArrowUp
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
