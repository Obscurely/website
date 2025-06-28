"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconArrowUp,
  IconMail,
  IconPhone,
  IconMapPin,
  IconDownload,
  IconRss,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import { socials } from "@data/common/socials";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  isBlog?: boolean;
}

const getFooterSections = (isBlog: boolean): FooterSection[] => [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: isBlog ? "/" : "#home" },
      { name: "About", href: isBlog ? "/#about" : "#about" },
      { name: "Projects", href: isBlog ? "/#projects" : "#projects" },
      { name: "Blog", href: isBlog ? "/blog" : "#blog", external: isBlog },
      { name: "Contact", href: isBlog ? "/#contact" : "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resume", href: "/resume.pdf", external: true },
      { name: "RSS Feed", href: "/rss.xml", external: true },
      { name: "Portfolio", href: isBlog ? "/#projects" : "#projects" },
      { name: "Tech Stack", href: isBlog ? "/#about" : "#about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy", external: true },
      { name: "Terms of Service", href: "/terms", external: true },
      { name: "Cookie Policy", href: "/cookies", external: true },
      { name: "Sitemap", href: "/sitemap.xml", external: true },
    ],
  },
];

const contactInfo = [
  {
    icon: IconMail,
    label: "Email",
    value: "adrian@crismaruc.dev",
    href: "mailto:adrian@crismaruc.dev",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "+40 123 456 789",
    href: "tel:+40123456789",
  },
  {
    icon: IconMapPin,
    label: "Location",
    value: "Bucharest, Romania",
    href: null,
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleNavClick = (href: string, isBlog: boolean) => {
  if (href.startsWith("#")) {
    // On home page, scroll to section
    if (!isBlog) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On blog page, navigate to home page with hash
      window.location.href = `/${href}`;
    }
  } else if (href.startsWith("/#")) {
    // Always navigate to home page with hash for cross-page navigation
    window.location.href = href;
  }
};

/**
 * Modern, feature-complete Footer component with improved design and functionality.
 */
export const Footer = ({ isBlog = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const footerSections = getFooterSections(isBlog);

  return (
    <footer className="relative border-t border-slate-800/50 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />

      <div className="relative container mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isBlog ? (
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
                  onClick={() => handleNavClick("#home", isBlog)}
                  className="group mb-6 block cursor-pointer text-2xl font-bold text-slate-100"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:to-blue-400">
                    Adrian Crîșmaruc
                  </span>
                </button>
              )}

              <p className="mb-8 max-w-md leading-relaxed text-slate-400">
                Full-Stack Developer passionate about creating innovative
                solutions and building exceptional digital experiences with
                modern technologies.
              </p>

              {/* Social links */}
              <div className="mb-8 flex gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-lg bg-slate-800/50 p-2 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-slate-700/50 hover:text-cyan-400"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>

              {/* Newsletter signup */}
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
                <h4 className="mb-2 text-sm font-semibold text-slate-200">
                  Stay Updated
                </h4>
                <p className="mb-3 text-xs text-slate-400">
                  Get notified about new projects and blog posts.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                  />
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 text-white hover:from-cyan-600 hover:to-blue-600"
                  >
                    Subscribe
                  </Button>
                </div>
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
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                          >
                            <span className="text-sm">{link.name}</span>
                            {link.name === "Resume" && (
                              <IconDownload className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                            {link.name === "RSS Feed" && (
                              <IconRss className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                          </a>
                        ) : isBlog &&
                          (link.href.startsWith("#") ||
                            link.href.startsWith("/#")) ? (
                          <a
                            href={
                              link.href.startsWith("#")
                                ? `/${link.href}`
                                : link.href
                            }
                            className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <button
                            onClick={() => handleNavClick(link.href, isBlog)}
                            className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                          >
                            {link.name}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact section */}
          <div className="lg:col-span-2">
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
                    <div className="rounded-lg bg-slate-800/50 p-2 text-cyan-400">
                      <contact.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs font-medium text-slate-300">
                        {contact.label}
                      </span>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-sm break-all text-slate-400 transition-colors duration-300 hover:text-cyan-400"
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
          className="mt-16 flex flex-col items-center justify-between border-t border-slate-800/50 pt-8 md:flex-row"
        >
          <div className="mb-4 md:mb-0">
            <p className="text-center text-sm text-slate-400 md:text-left">
              © {currentYear} Adrian Crîșmaruc. All rights reserved.
            </p>
            <p className="mt-1 text-center text-xs text-slate-500 md:text-left">
              Built with Next.js, TypeScript, and Tailwind CSS
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
              className="group relative rounded-full border border-slate-700/50 bg-slate-800/30 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-cyan-500/50 hover:bg-slate-700/50 hover:text-cyan-400"
            >
              <IconArrowUp
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
