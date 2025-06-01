"use client";

import Link from "next/link";
import {
  IconArrowUp,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { Button } from "@ui/button";

/**
 * Footer component that displays links, social media icons, and contact information.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="#home"
              className="mb-4 block text-2xl font-bold text-slate-100"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
                Website
              </span>
            </Link>
            <p className="mb-6 text-slate-400">
              Building exceptional digital experiences with modern technologies
              and creative solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-cyan-400"
              >
                <IconBrandGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-cyan-400"
              >
                <IconBrandLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-cyan-400"
              >
                <IconBrandX className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#home"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-200">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Consultation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Performance Optimization
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-200">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-slate-400">
                <span className="block">Email:</span>
                <a
                  href="mailto:contact@johndoe.com"
                  className="transition-colors hover:text-cyan-400"
                >
                  contact@johndoe.com
                </a>
              </li>
              <li className="text-slate-400">
                <span className="block">Phone:</span>
                <a
                  href="tel:+11234567890"
                  className="transition-colors hover:text-cyan-400"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="text-slate-400">
                <span className="block">Location:</span>
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-slate-400 md:mb-0">
            © {currentYear} John Doe. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <IconArrowUp size={20} />
          </Button>
        </div>
      </div>
    </footer>
  );
};
