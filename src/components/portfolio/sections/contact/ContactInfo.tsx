"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@ui/card";
import { socials } from "@data/common/socials";
import {
  containerAnimation,
  itemVariants,
  socialSectionAnimation,
} from "./animations";
import { contactInfo } from "@data/portfolio/contact";

interface ContactInfoProps {
  isInView: boolean;
}

/**
 * ContactInfo component displays contact information and social links.
 */
export const ContactInfo = memo<ContactInfoProps>(({ isInView }) => {
  // Memoize animation states to prevent object recreation
  const containerAnimateState = useMemo(
    () => (isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }),
    [isInView]
  );

  const socialAnimateState = useMemo(
    () => (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }),
    [isInView]
  );

  const itemAnimateState = useMemo(
    () => (isInView ? "visible" : "hidden"),
    [isInView]
  );

  return (
    <motion.div
      initial={containerAnimation.initial}
      animate={containerAnimateState}
      transition={containerAnimation.transition}
      className="flex-1 lg:max-w-md"
    >
      <div className="h-full rounded-xl border border-slate-700/30 bg-slate-800/20 p-6">
        <h3 className="mb-6 text-2xl font-bold text-white">
          Contact Information
        </h3>

        <div className="mb-6 space-y-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={`contact-${info.title}-${index}`}
              variants={itemVariants}
              initial="hidden"
              animate={itemAnimateState}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              <Card className="h-full transform-gpu overflow-hidden border-slate-700/50 bg-slate-800/30 p-0 transition-all duration-300 ease-out will-change-transform hover:translate-y-[-2px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
                <CardContent className="p-0">
                  <a
                    href={info.link}
                    target={info.sameTab ? "_self" : "_blank"}
                    rel={info.sameTab ? undefined : "noopener noreferrer"}
                    className="flex items-start gap-4 rounded-lg bg-none px-4 py-6 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
                    aria-label={`${info.title}: ${info.value}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-cyan-500">
                        {info.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                        {info.title}
                      </h4>
                      <div className="text-base font-medium text-slate-300 transition-colors duration-300 group-hover:text-cyan-400">
                        {info.value}
                      </div>
                      <p className="mt-1 text-sm text-slate-400">
                        {info.description}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={socialSectionAnimation.initial}
          animate={socialAnimateState}
          transition={socialSectionAnimation.transition}
        >
          <h4 className="mb-4 text-xl font-semibold text-white">
            Connect With Me
          </h4>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 sm:justify-start"
          >
            {socials.map((social, index) => (
              <a
                key={`social-${social.href}-${index}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/90 text-cyan-500 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-none"
              >
                <social.icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ContactInfo.displayName = "ContactInfo";
